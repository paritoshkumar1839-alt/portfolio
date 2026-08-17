import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import Media from "@/components/Media";
import Reveal from "@/components/Reveal";
import CaseStudySections from "@/components/CaseStudySections";
import CaseStudyFeatures from "@/components/CaseStudyFeatures";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: study.title,
    description: study.tagline,
    openGraph: { title: study.title, description: study.tagline },
  };
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line pt-4">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-sm text-text">{value}</dd>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const next = study.nextSlug ? getCaseStudy(study.nextSlug) : undefined;
  const hasProcess = study.process.length > 0;
  const hasGallery = study.gallery.length > 0;
  const hasOutcome = Boolean(study.outcome) || Boolean(study.metrics?.length);

  return (
    <article>
      {/* Header */}
      <header className="container-page pt-14 pb-12 md:pt-20">
        <Link
          href="/work"
          className="text-sm text-text-muted underline-hover hover:text-text"
        >
          ← All work
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {study.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 text-xs text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        <h1 className="mt-6 max-w-4xl font-serif text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] text-balance">
          {study.title}
        </h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-text-muted">
          {study.tagline}
        </p>

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
          <MetaItem label="Role" value={study.role} />
          <MetaItem label="Year" value={study.year} />
          {study.timeline && <MetaItem label="Timeline" value={study.timeline} />}
          {study.tools?.length ? (
            <MetaItem label="Tools" value={study.tools.join(", ")} />
          ) : null}
          {study.team && (
            <div className="col-span-2 border-t border-line pt-4 sm:col-span-4">
              <dt className="eyebrow">Team</dt>
              <dd className="mt-2 text-sm text-text-muted">{study.team}</dd>
            </div>
          )}
        </dl>
      </header>

      {/* Cover */}
      <div className="container-page">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-bg">
          <Media src={study.cover} alt={study.coverAlt} className="!object-contain" />
        </div>
      </div>

      {study.comingSoon ? (
        <div className="container-page py-24 text-center md:py-32">
          <p className="eyebrow">In progress</p>
          <p className="mx-auto mt-6 max-w-md text-pretty text-lg text-text-muted">
            This case study is being written up. Check back soon — or reach out
            and I&rsquo;ll happily walk you through it.
          </p>
        </div>
      ) : (
        <div className="container-page py-16 md:py-20">
          {/* Overview + problem (only when there are no structured sections) */}
          {!study.sections?.length && (
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <Reveal>
                <span className="eyebrow">Overview</span>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-text-muted">
                  {study.overview}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <span className="eyebrow">The problem</span>
                <p className="mt-4 text-pretty text-lg leading-relaxed text-text-muted">
                  {study.problem}
                </p>
              </Reveal>
            </div>
          )}

          {/* Structured sections */}
          {study.sections?.length ? (
            <CaseStudySections sections={study.sections} />
          ) : null}

          {/* User flow — full width */}
          {study.userFlow && (
            <Reveal as="section" className="mt-20 border-t border-line pt-14">
              <span className="eyebrow">User flow</span>
              <figure className="mt-8">
                <div className="overflow-x-auto rounded-xl border border-line bg-surface p-4 md:p-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.userFlow.src}
                    alt={study.userFlow.alt}
                    className="mx-auto block h-auto w-full min-w-[720px]"
                  />
                </div>
                {study.userFlow.caption && (
                  <figcaption className="mt-3 text-xs text-text-faint">
                    {study.userFlow.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          )}

          {/* The old flow — annotated with what was broken */}
          {study.problemFlow?.length ? (
            <CaseStudyFeatures
              features={study.problemFlow}
              label="The old flow — where it broke"
            />
          ) : null}

          {/* What we built — screen-by-screen */}
          {study.features?.length ? (
            <CaseStudyFeatures features={study.features} label="What we built" />
          ) : null}

          {/* Deep dives — hard edges, each its own titled walkthrough */}
          {study.deepDives?.map((dive) => (
            <CaseStudyFeatures
              key={dive.label}
              features={dive.features}
              label={dive.label}
              intro={dive.intro}
            />
          ))}

          {/* Process */}
          {hasProcess && (
            <Reveal as="section" className="mt-20 border-t border-line pt-14">
              <span className="eyebrow">Process</span>
              <ol className="mt-8 grid gap-8 md:grid-cols-2">
                {study.process.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-serif text-2xl text-text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-pretty text-text-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          )}

          {/* Gallery */}
          {hasGallery && (
            <section className="mt-20 border-t border-line pt-14">
              <span className="eyebrow">Selected screens</span>
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {study.gallery.map((img, i) => (
                  <Reveal
                    key={i}
                    delay={(i % 2) * 80}
                    className={img.wide ? "sm:col-span-2" : ""}
                  >
                    <figure>
                      <div
                        className={`relative overflow-hidden rounded-xl border border-line bg-surface ${
                          img.wide ? "aspect-[16/9]" : "aspect-[4/3]"
                        }`}
                      >
                        <Media src={img.src} alt={img.alt} />
                      </div>
                      {img.caption && (
                        <figcaption className="mt-3 text-xs text-text-faint">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {/* Outcome */}
          {hasOutcome && (
            <Reveal as="section" className="mt-20 border-t border-line pt-14">
              <span className="eyebrow">Outcome</span>
              {study.outcome && (
                <p className="mt-6 max-w-2xl text-pretty text-xl leading-relaxed text-text">
                  {study.outcome}
                </p>
              )}
              {study.metrics?.length ? (
                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                  {study.metrics.map((m) => (
                    <div key={m.label} className="border-t border-line pt-4">
                      <div className="font-serif text-4xl text-accent">
                        {m.value}
                      </div>
                      <div className="mt-2 text-xs text-text-faint">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </Reveal>
          )}
        </div>
      )}

      {/* Next project */}
      {next && (
        <div className="border-t border-line">
          <Link
            href={`/work/${next.slug}`}
            className="group container-page flex flex-wrap items-center justify-between gap-4 py-16 md:py-20"
          >
            <div>
              <span className="eyebrow">Next project</span>
              <p className="mt-3 font-serif text-[clamp(1.75rem,4vw,3rem)] leading-tight text-text">
                {next.title}
              </p>
            </div>
            <span
              aria-hidden
              className="text-2xl text-text-faint transition-all duration-500 group-hover:translate-x-2 group-hover:text-accent"
            >
              →
            </span>
          </Link>
        </div>
      )}
    </article>
  );
}
