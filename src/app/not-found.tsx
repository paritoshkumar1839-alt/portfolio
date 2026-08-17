import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow">404</span>
      <h1 className="mt-6 font-serif text-[clamp(2.5rem,8vw,5rem)] leading-[0.98]">
        This page doesn&rsquo;t exist.
      </h1>
      <p className="mt-4 max-w-sm text-pretty text-text-muted">
        The link may be broken, or the page may have moved.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
      >
        ← Back home
      </Link>
    </div>
  );
}
