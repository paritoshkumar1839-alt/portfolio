"use client";

import { useState } from "react";
import Link from "next/link";
import { verifyPassword } from "@/lib/gate";

function LockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="4.5"
        y="10.5"
        width="15"
        height="10"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M8 10.5V8a4 4 0 1 1 8 0v2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="15.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

type PasswordGateProps = {
  title: string;
  teaser?: string;
  onSuccess: () => void;
  variant?: "modal" | "page";
};

/** The lock card: shows a teaser + password field, verifies against the stored
 *  hash, and calls onSuccess when correct. Reused as a modal body and as a
 *  full-page guard on a locked case-study route. */
export default function PasswordGate({
  title,
  teaser,
  onSuccess,
  variant = "modal",
}: PasswordGateProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!value || checking) return;
    setChecking(true);
    const ok = await verifyPassword(value);
    setChecking(false);
    if (ok) {
      onSuccess();
    } else {
      setError(true);
      setValue("");
    }
  };

  const card = (
    <div className="w-full max-w-md rounded-2xl border border-line bg-surface p-8 text-center sm:p-10">
      <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-line-strong bg-surface-2 text-text-muted">
        <LockIcon />
      </span>
      <p className="eyebrow mt-6">Protected case study</p>
      <h2 className="mx-auto mt-4 max-w-sm font-serif text-[clamp(1.35rem,3vw,1.8rem)] leading-tight text-balance">
        {teaser ?? title}
      </h2>
      <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
        Enter the password you received to view the full write-up.
      </p>

      <form onSubmit={submit} className="mt-7 text-left">
        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          autoFocus
          aria-label="Password"
          className="w-full rounded-xl border border-line-strong bg-bg px-4 py-3.5 text-text outline-none transition-colors placeholder:text-text-faint focus:border-text-muted"
        />
        {error && (
          <p className="mt-2 text-sm text-[#e07a5f]">
            That password didn&rsquo;t match — try again.
          </p>
        )}
        <button
          type="submit"
          disabled={!value || checking}
          className="mt-3 w-full rounded-xl bg-cta px-6 py-3.5 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {checking ? "Checking…" : "Unlock case study"}
        </button>
      </form>

      <p className="mt-5 text-xs leading-relaxed text-text-faint">
        Need access? Reach out through the contact links on the site.
      </p>
    </div>
  );

  if (variant === "page") {
    return (
      <div className="container-page pt-14 pb-24 md:pt-20">
        <Link
          href="/work"
          className="text-sm text-text-muted underline-hover hover:text-text"
        >
          ← Back to work
        </Link>
        <div className="mt-12 flex justify-center md:mt-16">{card}</div>
      </div>
    );
  }

  return card;
}
