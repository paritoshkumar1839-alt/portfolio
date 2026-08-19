import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="section-anchor relative border-t border-line"
    >
      <div className="container-page py-24 md:py-32">
        <Reveal className="text-center">
          <span className="eyebrow mb-6 block">Contact · {profile.availability}</span>
          <h2 className="font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-balance">
            Let&rsquo;s build something
            <br />
            <span className="text-cta">worth shipping</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-pretty text-text-muted">
            {profile.openTo}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-cta px-6 py-3.5 text-sm font-semibold text-cta-ink transition-colors hover:bg-cta-hover"
              >
                {profile.email}
                <span aria-hidden>→</span>
              </a>
            </Magnetic>
            <a
              href={profile.resumeHref}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-muted transition-colors hover:text-text"
            >
              Download résumé
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-4 py-6 text-sm text-text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {profile.name}
          </span>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href={`mailto:${profile.email}`}
              className="underline-hover hover:text-text"
            >
              Email
            </a>
            <a
              href={profile.resumeHref}
              className="underline-hover hover:text-text"
            >
              Résumé
            </a>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline-hover hover:text-text"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
