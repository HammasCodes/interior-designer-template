"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINE_ONE = "Luxury is not what a room contains.";
const LINE_TWO = "It is what it withholds.";

function Words({ text }: { text: string }) {
  return (
    <span aria-hidden="true">
      {text.split(" ").map((word, i, words) => (
        <span key={i} className="inline-block whitespace-nowrap">
          <span
            className={`manifesto-word inline-block will-change-transform ${
              word === "withholds." ? "italic text-bronze-bright" : ""
            }`}
          >
            {word}
          </span>
          {i < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top 72%",
              once: true,
            },
          })
          .from(".manifesto-kicker", {
            y: 16,
            opacity: 0,
            duration: 0.7,
            ease: "power4.out",
          })
          .from(
            ".manifesto-word",
            {
              y: "0.6em",
              opacity: 0,
              duration: 1,
              ease: "power4.out",
              stagger: 0.045,
            },
            "-=0.35"
          )
          .from(
            ".manifesto-note",
            { y: 14, opacity: 0, duration: 0.7, ease: "power4.out" },
            "-=0.4"
          );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="manifesto"
      className="relative overflow-hidden bg-noir px-6 py-32 md:py-44 lg:px-10"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-[60%] w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(176,141,87,0.08),transparent_65%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <p className="manifesto-kicker font-body text-xs font-medium uppercase tracking-[0.35em] text-bronze">
          The Atelier&apos;s Principle
        </p>
        <h2 className="mt-10 font-display text-4xl font-medium leading-[1.15] text-bone sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="sr-only">
            {LINE_ONE} {LINE_TWO}
          </span>
          <Words text={LINE_ONE} /> <Words text={LINE_TWO} />
        </h2>
        <p className="manifesto-note mx-auto mt-12 max-w-md font-body text-sm font-light leading-relaxed text-bone-dim">
          — The founding principle of Atelier Nord, written above the studio
          door on Crosby Street.
        </p>
      </div>
    </section>
  );
}
