"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Full-Service Interiors",
    body: "From first sketch to final stem in the vase — concept, drawings, procurement and installation, managed end to end.",
  },
  {
    number: "02",
    title: "Architectural Collaboration",
    body: "We work beside your architect on millwork, lighting and joinery details that make a plan feel inevitable.",
  },
  {
    number: "03",
    title: "Bespoke Furnishing",
    body: "Commissioned pieces from a network of European workshops — furniture, rugs and lighting made for one address only.",
  },
  {
    number: "04",
    title: "Art & Object Curation",
    body: "Collections assembled with galleries and auction houses, placed so each work earns its wall.",
  },
];

export default function Services() {
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
          .from(".services-header", {
            y: 28,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
          })
          .from(
            ".service-row",
            {
              y: 40,
              opacity: 0,
              duration: 0.8,
              ease: "power4.out",
              stagger: 0.12,
            },
            "-=0.4"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} className="bg-parchment px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="services-header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
              What We Do
            </p>
            <h2 className="mt-5 font-display text-4xl font-medium text-ink sm:text-5xl md:text-6xl">
              Four disciplines, <span className="italic">one hand.</span>
            </h2>
          </div>
          <p className="max-w-xs font-body text-sm font-light leading-relaxed text-ink-soft">
            Every commission is led personally by the founding partners — no
            hand-offs, no dilution.
          </p>
        </div>

        <div className="mt-16 border-t border-line-light md:mt-24">
          {services.map((service) => (
            <div
              key={service.number}
              className="service-row group grid grid-cols-1 gap-3 border-b border-line-light py-9 transition-colors duration-300 hover:bg-ink/[0.035] md:grid-cols-[90px_1.1fr_1fr_60px] md:items-baseline md:gap-8 md:px-4 md:py-11"
            >
              <span className="font-display text-3xl text-ink-soft/40 transition-colors duration-300 group-hover:text-bronze md:text-4xl">
                {service.number}
              </span>
              <h3 className="font-display text-2xl font-medium text-ink transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl md:text-4xl">
                {service.title}
              </h3>
              <p className="font-body text-sm font-light leading-relaxed text-ink-soft sm:text-base">
                {service.body}
              </p>
              <span className="hidden font-display text-2xl text-bronze opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 md:block">
                →
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
