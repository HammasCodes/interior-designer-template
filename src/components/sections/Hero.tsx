"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useFrameSequence } from "@/hooks/useFrameSequence";

gsap.registerPlugin(ScrollTrigger);

const TITLE = "Interiors composed like music.";

const TITLE_SEGMENTS = [
  { text: "Interiors", italic: false },
  { text: "composed", italic: true },
  { text: "like music.", italic: false },
];

function TitleChars() {
  return (
    <span aria-hidden="true">
      {TITLE_SEGMENTS.map((seg, si) => (
        <span key={si}>
          {seg.text.split(" ").map((word, wi, words) => (
            <span
              key={wi}
              className={`inline-block whitespace-nowrap ${
                seg.italic ? "italic text-bronze-bright" : ""
              }`}
            >
              {word.split("").map((ch, ci) => (
                <span key={ci} className="hero-char inline-block will-change-transform">
                  {ch}
                </span>
              ))}
              {wi < words.length - 1 && <span className="inline-block">&nbsp;</span>}
            </span>
          ))}
          {si < TITLE_SEGMENTS.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cap1 = useRef<HTMLDivElement>(null);
  const cap2 = useRef<HTMLDivElement>(null);
  const cap3 = useRef<HTMLDivElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const fadeOut = useRef<HTMLDivElement>(null);

  const { ready, draw, lastProgress } = useFrameSequence("hero");
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    if (!ready) return;
    drawRef.current(canvasRef.current, lastProgress.current, "cover");
  }, [ready, lastProgress]);

  useEffect(() => {
    const onResize = () =>
      drawRef.current(canvasRef.current, lastProgress.current, "cover");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lastProgress]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap
          .timeline({ defaults: { ease: "power4.out" }, delay: 0.3 })
          .from(".hero-kicker", { y: 16, opacity: 0, duration: 0.7 })
          .from(".hero-char", { y: "0.7em", opacity: 0, duration: 1.1, stagger: 0.022 }, "-=0.45")
          .from(".hero-sub", { y: 20, opacity: 0, duration: 0.8 }, "-=0.65")
          .from(".hero-cta", { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.55")
          .from(".hero-rail", { opacity: 0, duration: 1 }, "-=0.6")
          .from(cue.current, { opacity: 0, duration: 0.8 }, "-=0.5");

        const proxy = { t: 0 };

        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.5,
            },
          })
          .to(
            proxy,
            {
              t: 1,
              duration: 3,
              ease: "none",
              onUpdate: () => drawRef.current(canvasRef.current, proxy.t, "cover"),
            },
            0
          )
          .to(railFill.current, { scaleY: 1, duration: 3, ease: "none" }, 0)
          .to(cue.current, { opacity: 0, duration: 0.2, ease: "none" }, 0)
          .to(cap1.current, { yPercent: -18, opacity: 0, duration: 0.5, ease: "none" }, 0.35)
          .fromTo(
            cap2.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "none" },
            0.9
          )
          .to(cap2.current, { y: -60, opacity: 0, duration: 0.5, ease: "none" }, 1.7)
          .fromTo(
            cap3.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "none" },
            2.2
          )
          .to(fadeOut.current, { opacity: 1, duration: 0.22, ease: "none" }, 2.78);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative h-[300vh] bg-noir md:h-[400vh]">
      <div className="sticky top-0 h-svh min-h-[560px] overflow-hidden">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-poster.jpg"
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              ready ? "opacity-0" : "opacity-100"
            }`}
          />
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/20 to-noir/45" />
          <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        </div>

        <div className="hero-rail absolute left-8 top-1/2 z-20 hidden -translate-y-1/2 items-center gap-4 lg:flex">
          <span className="block h-16 w-px bg-bone/30" />
          <p
            className="font-body text-[10px] font-medium uppercase tracking-[0.35em] text-bone/60"
            style={{ writingMode: "vertical-rl" }}
          >
            Atelier Nord — Est. 2011 — New York
          </p>
        </div>

        <div
          ref={cap1}
          className="absolute inset-0 z-10 flex items-end px-6 pb-24 will-change-transform md:items-center md:px-16 lg:px-28"
        >
          <div className="max-w-4xl md:pl-16">
            <p className="hero-kicker font-body text-xs font-medium uppercase tracking-[0.35em] text-bone/70">
              <span className="text-bronze">01</span> — The Atelier · New York
            </p>
            <h1 className="mt-7 font-display text-5xl font-medium leading-[1.04] text-bone sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              <span className="sr-only">{TITLE}</span>
              <TitleChars />
            </h1>
            <p className="hero-sub mt-7 max-w-lg font-body text-base font-light leading-relaxed text-bone/80 sm:text-lg">
              A New York atelier crafting residences of quiet precision —
              where light, material and proportion resolve into calm.
            </p>
            <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <a
                href="#contact"
                className="hero-cta rounded-full bg-bronze px-9 py-3.5 text-center font-body text-sm font-medium tracking-wide text-noir transition-[scale,background-color] duration-200 hover:scale-[1.03] hover:bg-bronze-bright active:scale-[0.97]"
              >
                Begin a Project
              </a>
              <a
                href="#portfolio"
                className="hero-cta group inline-flex items-center gap-3 font-body text-sm tracking-wide text-bone"
              >
                <span className="block h-px w-8 bg-bone/50 transition-all duration-300 group-hover:w-12 group-hover:bg-bronze" />
                View the Portfolio
              </a>
            </div>
          </div>
        </div>

        <div
          ref={cap2}
          className="absolute inset-0 z-10 flex items-end px-6 pb-24 opacity-0 will-change-transform md:items-center md:px-16 lg:px-28"
        >
          <div className="max-w-xl md:pl-16">
            <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bone/70">
              <span className="text-bronze">02</span> — The Method
            </p>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-bone sm:text-5xl md:text-6xl">
              Every room begins <span className="italic text-bronze-bright">with light.</span>
            </h2>
            <p className="mt-6 max-w-md font-body text-base font-light leading-relaxed text-bone/80 sm:text-lg">
              We study how the sun moves through your rooms before a single
              material is chosen — then build the entire palette around it.
            </p>
          </div>
        </div>

        <div
          ref={cap3}
          className="absolute inset-0 z-10 flex items-end justify-end px-6 pb-24 opacity-0 will-change-transform md:items-center md:px-16 lg:px-28"
        >
          <div className="max-w-xl md:text-right">
            <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-bone/70">
              <span className="text-bronze">03</span> — The Result
            </p>
            <h2 className="mt-6 font-display text-4xl font-medium leading-tight text-bone sm:text-5xl md:text-6xl">
              Quiet rooms. <span className="italic text-bronze-bright">Lasting value.</span>
            </h2>
            <p className="mt-6 font-body text-base font-light leading-relaxed text-bone/80 sm:text-lg md:ml-auto md:max-w-md">
              Full-service design from concept to installation — residences,
              penthouses and pied-à-terres across three continents.
            </p>
            <div className="mt-9 md:flex md:justify-end">
              <a
                href="#contact"
                className="inline-block rounded-full bg-bronze px-9 py-3.5 text-center font-body text-sm font-medium tracking-wide text-noir transition-[scale,background-color] duration-200 hover:scale-[1.03] hover:bg-bronze-bright active:scale-[0.97]"
              >
                Begin a Project
              </a>
            </div>
          </div>
        </div>

        <div className="hero-rail absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 md:block">
          <div className="relative h-44 w-px bg-bone/25">
            <div ref={railFill} className="absolute inset-0 origin-top scale-y-0 bg-bronze" />
            <span className="absolute -left-[3px] -top-[3px] h-[7px] w-[7px] rounded-full bg-bone/60" />
            <span className="absolute -left-[3px] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-bone/60" />
            <span className="absolute -bottom-[3px] -left-[3px] h-[7px] w-[7px] rounded-full bg-bone/60" />
          </div>
        </div>

        <div
          ref={cue}
          className="absolute bottom-8 right-8 z-20 hidden flex-col items-center gap-3 md:flex"
        >
          <span className="font-body text-[10px] font-medium uppercase tracking-[0.35em] text-bone/60">
            Scroll
          </span>
          <span className="animate-cue-bob block h-8 w-px bg-bone/60" />
        </div>

        <div
          ref={fadeOut}
          className="pointer-events-none absolute inset-0 z-30 bg-noir opacity-0"
        />
      </div>
    </section>
  );
}
