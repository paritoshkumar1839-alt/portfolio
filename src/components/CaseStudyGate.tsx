"use client";

import { useEffect, useState } from "react";
import { useGate } from "@/components/GateProvider";
import PasswordGate from "@/components/PasswordGate";

/** Wraps a case-study page. When the study is locked and the visitor hasn't
 *  unlocked, it renders the full-page gate instead of the content — so direct
 *  links / refreshes stay protected too. */
export default function CaseStudyGate({
  locked,
  title,
  teaser,
  children,
}: {
  locked: boolean;
  title: string;
  teaser?: string;
  children: React.ReactNode;
}) {
  const { unlocked, unlock } = useGate();
  const [ready, setReady] = useState(false);

  // Avoid flashing content before we've read the unlock state.
  useEffect(() => setReady(true), []);

  if (locked && (!ready || !unlocked)) {
    return (
      <PasswordGate
        variant="page"
        title={title}
        teaser={teaser}
        onSuccess={unlock}
      />
    );
  }

  return <>{children}</>;
}
