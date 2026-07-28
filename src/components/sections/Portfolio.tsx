"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Tribeca Penthouse",
    location: "New York",
    year: "2024",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    alt: "Sunlit penthouse living room with sculptural sofa and plaster walls",
  },
  {
    name: "Maison Rivière",
    location: "Paris",
    year: "2023",
    src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop",
    alt: "Parisian salon with herringbone floor, marble fireplace and curated art",
  },
  {
    name: "Villa Serena",
    location: "Lake Como",
    year: "2024",
    src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    alt: "Italian lakeside villa interior with travertine floors and linen drapery",
  },
  {
    name: "The Oak Residence",
    location: "London",
    year: "2022",
    src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    alt: "London residence with fumed oak paneling and bespoke joinery",
  },
  {
    name: "Atelier Loft",
    location: "Copenhagen",
    year: "2023",
    src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1600&auto=format&fit=crop",
    alt: "Nordic loft with pale wood floors, bouclé seating and gallery wall",
  },
  {
    name: "Casa Lumen",
    location: "Madrid",
    year: "2025",
    src: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=1600&auto=format&fit=crop",
    alt: "Madrid apartment bedroom in Roman clay with brass reading lights",
  },
];

export default function Portfolio() {
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
          .from(".portfolio-header", {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          })
          .from(
            ".portfolio-card",
            {
              y: 56,
              opacity: 0,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.4"
          )
          .from(
            ".portfolio-footer",
            { y: 20, opacity: 0, duration: 0.7, ease: "power4.out" },
            "-=0.4"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="portfolio" ref={root} className="bg-noir px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="portfolio-header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
              Selected Work
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium text-bone sm:text-5xl md:text-6xl">
              Rooms with a <span className="italic text-bronze-bright">point of view.</span>
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm font-light leading-relaxed text-bone-dim">
            A selection from fourteen years of private commissions — each one
            photographed as it was left, on handover day.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-24">
          {projects.map((project, i) => (
            <a
              key={project.name}
              href="#contact"
              className="portfolio-card group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 translate-y-2 rounded-full bg-bone/95 px-5 py-2 font-body text-[10px] font-medium uppercase tracking-[0.3em] text-noir opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Project →
                </span>
              </div>

              <div className="mt-6 flex items-baseline justify-between gap-4 border-t border-line-dark pt-5">
                <div>
                  <h3 className="font-display text-2xl font-medium text-bone transition-colors duration-300 group-hover:text-bronze-bright sm:text-3xl">
                    {project.name}
                  </h3>
                  <p className="mt-1.5 font-body text-xs font-light uppercase tracking-[0.25em] text-bone-dim">
                    {project.location} · {project.year}
                  </p>
                </div>
                <span className="font-display text-lg italic text-bone-dim/50">
                  № 0{i + 1}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="portfolio-footer mt-20 flex justify-center border-t border-line-dark pt-10 md:mt-24">
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 font-body text-sm tracking-wide text-bone"
          >
            <span className="block h-px w-8 bg-bone/50 transition-all duration-300 group-hover:w-12 group-hover:bg-bronze" />
            Full portfolio available on request
            <span className="text-bronze transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
