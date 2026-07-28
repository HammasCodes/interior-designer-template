"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const details = [
  { term: "Studio", detail: "14 Crosby Street, New York, NY 10013" },
  { term: "Email", detail: "hello@ateliernord.studio" },
  { term: "Telephone", detail: "+1 (212) 555-0184" },
  { term: "Hours", detail: "By appointment, Monday – Friday" },
];

export default function Contact() {
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
          .from(".contact-left", {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
          })
          .from(
            ".contact-row",
            {
              y: 18,
              opacity: 0,
              duration: 0.7,
              ease: "power4.out",
              stagger: 0.09,
            },
            "-=0.5"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="border-t border-line-dark bg-noir-soft px-6 py-28 md:py-36 lg:px-10"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-2 md:gap-20">
        <div className="contact-left">
          <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
            Commissions
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium leading-tight text-bone sm:text-5xl md:text-6xl">
            Begin the <span className="italic text-bronze-bright">conversation.</span>
          </h2>
          <p className="mt-7 max-w-md font-body text-base font-light leading-relaxed text-bone-dim">
            We accept a limited number of commissions each year — each one led
            personally by the founding partners, from first visit to final
            installation.
          </p>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <a
              href="mailto:hello@ateliernord.studio"
              className="rounded-full bg-bronze px-9 py-3.5 text-center font-body text-sm font-medium tracking-wide text-noir transition-[scale,background-color] duration-200 hover:scale-[1.03] hover:bg-bronze-bright active:scale-[0.97]"
            >
              Request a Consultation
            </a>
            <span className="font-body text-xs font-light uppercase tracking-[0.25em] text-bone-dim">
              Replies within two working days
            </span>
          </div>
        </div>

        <dl className="self-end border-t border-line-dark">
          {details.map((row) => (
            <div
              key={row.term}
              className="contact-row grid grid-cols-[110px_1fr] items-baseline gap-6 border-b border-line-dark py-6 md:grid-cols-[140px_1fr]"
            >
              <dt className="font-body text-xs font-medium uppercase tracking-[0.25em] text-bone-dim">
                {row.term}
              </dt>
              <dd className="font-display text-xl text-bone sm:text-2xl">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
