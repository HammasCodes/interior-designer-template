"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const materials = [
  {
    term: "Stone",
    detail: "Travertine, Bardiglio and Calacatta — honed, never polished.",
  },
  {
    term: "Timber",
    detail: "Fumed oak and American walnut, quarter-sawn and finished in wax.",
  },
  {
    term: "Textile",
    detail: "Bouclé, mohair and undyed linen from Flemish and Italian mills.",
  },
  {
    term: "Metal",
    detail: "Brushed brass and patinated bronze, unlacquered so they age.",
  },
  {
    term: "Plaster",
    detail: "Roman clay and Marmorino, troweled by hand in thin layers.",
  },
  {
    term: "Light",
    detail: "Layered warmth at 2700K — a lamp on every axis, never a downlight grid.",
  },
];

export default function Materials() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 75%",
              once: true,
            },
          })
          .from(".materials-header", {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          })
          .from(
            ".material-row",
            {
              y: 20,
              opacity: 0,
              duration: 0.7,
              ease: "power4.out",
              stagger: 0.08,
            },
            "-=0.4"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="materials" ref={root} className="bg-parchment px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="materials-header">
          <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
            The Material Library
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium text-ink sm:text-5xl">
            Honest materials, <span className="italic">honestly used.</span>
          </h2>
        </div>

        <dl className="mt-14 border-t border-line-light md:mt-20">
          {materials.map((material) => (
            <div
              key={material.term}
              className="material-row grid grid-cols-1 gap-2 border-b border-line-light py-6 transition-colors duration-300 hover:bg-ink/[0.035] md:grid-cols-[220px_1fr] md:gap-8 md:px-4 md:py-7"
            >
              <dt className="font-display text-2xl font-medium text-ink">{material.term}</dt>
              <dd className="font-body text-sm font-light leading-relaxed text-ink-soft sm:text-base">
                {material.detail}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
