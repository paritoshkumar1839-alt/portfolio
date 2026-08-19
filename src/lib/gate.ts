import type { CaseStudy } from "@/lib/case-studies";

// SHA-256 hash of the shared password. The plaintext is never stored in the
// repo — only this hash ships, and input is hashed the same way to compare.
// (Soft gate: content still reaches the browser; this deters casual visitors.)
const PASSWORD_HASH =
  "f85114723f0304516457cb58ca09384ac21de7429fc553f46bd6d59b2692be3d";

/** sessionStorage key holding the unlock timestamp. Using sessionStorage means
 *  the unlock clears when the tab/browser is closed; the timestamp adds a
 *  1-hour expiry so it also re-locks after an hour within the same session. */
export const CS_UNLOCK_KEY = "portfolio_cs_unlocked";
export const UNLOCK_TTL_MS = 60 * 60 * 1000; // 1 hour

/** True only if unlocked this session and within the last hour. */
export function readUnlocked(): boolean {
  try {
    const ts = Number(sessionStorage.getItem(CS_UNLOCK_KEY));
    if (!ts || Date.now() - ts > UNLOCK_TTL_MS) {
      sessionStorage.removeItem(CS_UNLOCK_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

/** Record the unlock time (starts the 1-hour window). */
export function writeUnlocked(): void {
  try {
    sessionStorage.setItem(CS_UNLOCK_KEY, String(Date.now()));
  } catch {
    /* ignore */
  }
}

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
