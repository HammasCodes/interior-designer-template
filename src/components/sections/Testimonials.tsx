"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const quotes = [
  {
    text: "They didn't decorate our apartment. They edited it — until every room felt inevitable.",
    author: "Hélène M.",
    project: "Maison Rivière, Paris",
  },
  {
    text: "Three years on, the house still surprises us — a shadow at four o'clock, a chair that catches the morning. Nothing was accidental.",
    author: "D. Whitmore",
    project: "Tribeca Penthouse, New York",
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".quote-block").forEach((el) => {
          gsap.from(el, {
            y: 48,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true,
            },
          });
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="testimonials-anchor" className="bg-noir px-6 py-28 md:py-36 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
          In Their Words
        </p>

        <blockquote className="quote-block mt-14 max-w-3xl">
          <span className="font-display text-7xl leading-none text-bronze/40">“</span>
          <p className="-mt-6 font-display text-3xl font-medium italic leading-snug text-bone sm:text-4xl md:text-5xl">
            {quotes[0].text}
          </p>
          <footer className="mt-8 font-body text-xs font-medium uppercase tracking-[0.25em] text-bone-dim">
            {quotes[0].author} <span className="text-bronze">·</span> {quotes[0].project}
          </footer>
        </blockquote>

        <blockquote className="quote-block ml-auto mt-24 max-w-3xl md:mt-32">
          <span className="font-display text-7xl leading-none text-bronze/40">“</span>
          <p className="-mt-6 font-display text-3xl font-medium italic leading-snug text-bone sm:text-4xl md:text-5xl">
            {quotes[1].text}
          </p>
          <footer className="mt-8 font-body text-xs font-medium uppercase tracking-[0.25em] text-bone-dim">
            {quotes[1].author} <span className="text-bronze">·</span> {quotes[1].project}
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
