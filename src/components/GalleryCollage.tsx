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
      <span className="eyebrow">Off the desk</span>
      <h3 className="mt-4 font-serif text-[clamp(1.9rem,4.5vw,3rem)] leading-[1.04] text-balance">
        {gallery.heading}
      </h3>
      <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-text-muted">
        {gallery.intro}
      </p>

      <Reveal className="mt-8 columns-2 [column-gap:1rem] md:columns-3">
        {imgs.map((src, i) => (
          <div
            key={src}
            className="mb-4 break-inside-avoid overflow-hidden rounded-xl border border-line bg-surface"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`${gallery.heading} — photo ${i + 1}`}
              loading="lazy"
              className="block h-auto w-full transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        ))}
      </Reveal>
    </div>
  );
}
