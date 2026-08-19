"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { readUnlocked, writeUnlocked } from "@/lib/gate";
import PasswordGate from "@/components/PasswordGate";

type StudyMeta = { slug: string; title: string; teaser?: string };

type GateContextValue = {
  unlocked: boolean;
  unlock: () => void;
  openModal: (meta: StudyMeta) => void;
};

const GateContext = createContext<GateContextValue | null>(null);

export function useGate() {
  const ctx = useContext(GateContext);
  if (!ctx) throw new Error("useGate must be used within <GateProvider>");
  return ctx;
}

export default function GateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(false);
  const [modal, setModal] = useState<StudyMeta | null>(null);

  // Restore unlock on mount, and keep re-validating so it re-locks once the
  // 1-hour window expires (checked every minute + when the tab regains focus).
  useEffect(() => {
    const revalidate = () => setUnlocked(readUnlocked());
    revalidate();
    const onFocus = () => revalidate();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    const id = window.setInterval(revalidate, 60_000);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      window.clearInterval(id);
    };
  }, []);

  const unlock = useCallback(() => {
    writeUnlocked();
    setUnlocked(true);
  }, []);

  const openModal = useCallback((meta: StudyMeta) => setModal(meta), []);
  const closeModal = useCallback(() => setModal(null), []);

  // Esc closes the modal, and lock body scroll while it's open.
  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modal, closeModal]);

  return (
    <GateContext.Provider value={{ unlocked, unlock, openModal }}>
      {children}

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute -right-3 -top-3 z-10 flex size-8 items-center justify-center rounded-full border border-line-strong bg-surface text-text-muted transition-colors hover:text-text"
            >
              ✕
            </button>
            <PasswordGate
              title={modal.title}
              teaser={modal.teaser}
              variant="modal"
              onSuccess={() => {
                const { slug } = modal;
                unlock();
                closeModal();
                router.push(`/work/${slug}`);
              }}
            />
          </div>
        </div>
      )}
    </GateContext.Provider>
  );
}
