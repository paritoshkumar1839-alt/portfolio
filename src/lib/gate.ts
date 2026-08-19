import type { CaseStudy } from "@/lib/case-studies";

// SHA-256 hash of the shared password. The plaintext is never stored in the
// repo — only this hash ships, and input is hashed the same way to compare.
// (Soft gate: content still reaches the browser; this deters casual visitors.)
const PASSWORD_HASH =
  "f85114723f0304516457cb58ca09384ac21de7429fc553f46bd6d59b2692be3d";

/** localStorage flag set once the visitor has entered the correct password. */
export const CS_UNLOCK_KEY = "portfolio_cs_unlocked";

/** Hash the input with SHA-256 and compare to the stored hash (browser only). */
export async function verifyPassword(input: string): Promise<boolean> {
  if (typeof crypto === "undefined" || !crypto.subtle) return false;
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(input),
  );
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex === PASSWORD_HASH;
}

/** A study is locked when it's a real study (not a placeholder) and not
 *  explicitly marked public. New studies are therefore locked by default. */
export function isLocked(
  study: Pick<CaseStudy, "comingSoon" | "isPublic">,
): boolean {
  return !study.comingSoon && !study.isPublic;
}
