import { caseStudies } from "@/lib/case-studies";
import { profile } from "@/lib/profile";
import Hero from "@/components/Hero";
import StatBand from "@/components/StatBand";
import Marquee from "@/components/Marquee";
import SectionHeader from "@/components/SectionHeader";
import FeaturedWork from "@/components/FeaturedWork";
import WorkCard from "@/components/WorkCard";
import CareerTimeline from "@/components/CareerTimeline";
import WhoIAm from "@/components/WhoIAm";
import Reveal from "@/components/Reveal";

export default function Home() {
  const featured = caseStudies.find((c) => c.featured);
  const secondary = caseStudies.filter((c) => !c.featured);

  return (
    <>
      <Hero />
      <StatBand />

      {/* Credential ticker */}
      <div className="border-b border-line py-5">
        <Marquee items={profile.credentials} variant="mono" />
      </div>

      {/* Selected work */}
      <section id="work" className="section-anchor container-page py-24 md:py-32">
        <SectionHeader
          label="Selected work"
          title={
            <>
              Designing for real impact,
              <br className="hidden sm:block" /> at every scale.
            </>
          }
          href="/work"
          hrefLabel="All work"
        />

        <div className="mt-14">{featured && <FeaturedWork study={featured} />}</div>

        <div className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {secondary.map((study, i) => (
            <Reveal key={study.slug} delay={(i % 2) * 80}>
              <WorkCard study={study} index={i + 1} />
            </Reveal>
          ))}
        </div>
      </section>

      <CareerTimeline />
      <WhoIAm />
    </>
  );
}
