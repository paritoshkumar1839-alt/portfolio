import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";

// About subsection: a masonry photo collage from the previous company.
export default function GalleryCollage() {
  const { gallery } = profile;
  const imgs = Array.from(
    { length: gallery.count },
    (_, i) => `/about/gallery/g-${String(i + 1).padStart(2, "0")}.jpg`,
  );

  return (
    <div className="mt-16 border-t border-line pt-12">
      <div className="text-center">
        <span className="eyebrow">Off the desk</span>
        <h3 className="mx-auto mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
          {gallery.heading}
        </h3>
        <p className="mx-auto mt-4 max-w-3xl text-pretty leading-relaxed text-text-muted">
          {gallery.intro}
        </p>
      </div>

      <Reveal className="mt-8 grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-5">
        {imgs.map((src, i) => (
          <div
            key={src}
            className="aspect-square overflow-hidden rounded-lg border border-line bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${gallery.heading} — photo ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.05]"
            />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
