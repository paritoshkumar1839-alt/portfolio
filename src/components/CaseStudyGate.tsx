"use client";

import { track } from "@vercel/analytics";
import { useGate } from "@/components/GateProvider";
import PasswordGate from "@/components/PasswordGate";
import CaseStudyAnalytics from "@/components/CaseStudyAnalytics";

/** Wraps a case-study page. When the study is locked and the visitor hasn't
 *  unlocked, it renders the full-page gate instead of the content — so direct
 *  links / refreshes stay protected too. */
export default function CaseStudyGate({
  slug,
  locked,
  title,
  teaser,
  children,
}: {
  slug: string;
  locked: boolean;
  title: string;
  teaser?: string;
  children: React.ReactNode;
}) {
  const { unlocked, unlock } = useGate();
  // `unlocked` is false until GateProvider reads it on the client, so content
  // never flashes on load — and on in-app navigation it renders in the first
  // commit, which lets the card cover morph into the page.
  if (locked && !unlocked) {
    return (
      <PasswordGate
        variant="page"
        title={title}
        teaser={teaser}
        onSuccess={() => {
          track("case_study_unlock", { slug, title, source: "direct_link" });
          unlock();
        }}
      />
    );
  }

  return (
    <>
      <CaseStudyAnalytics slug={slug} title={title} />
      {children}
    </>
  );
}
