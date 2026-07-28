"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 14, decimals: 0, suffix: "", label: "Years of practice" },
  { value: 120, decimals: 0, suffix: "+", label: "Residences delivered" },
  { value: 9, decimals: 0, suffix: "", label: "International design awards" },
  { value: 96, decimals: 0, suffix: "%", label: "Clients who return" },
];

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 78%",
            once: true,
          },
        });

        tl.from(".stat-block", {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          stagger: 0.12,
        });

        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el, i) => {
          const target = parseFloat(el.dataset.value ?? "0");
          const decimals = Number(el.dataset.decimals ?? "0");
          const proxy = { v: 0 };
          el.textContent = format(0, decimals);
          tl.to(
            proxy,
            {
              v: target,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = format(proxy.v, decimals);
              },
            },
            0.1 + i * 0.12
          );
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="border-y border-line-dark bg-noir-soft py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-14 px-6 md:grid-cols-4 lg:px-10">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-block flex flex-col items-center text-center">
            <p className="font-display text-5xl font-medium text-bone md:text-6xl">
              <span className="stat-num" data-value={stat.value} data-decimals={stat.decimals}>
                {format(stat.value, stat.decimals)}
              </span>
              <span className="text-bronze">{stat.suffix}</span>
            </p>
            <p className="mt-4 font-body text-xs font-light uppercase tracking-[0.25em] text-bone-dim">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
