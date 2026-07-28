"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Materials", href: "#materials" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const manifesto = document.getElementById("manifesto");
      const threshold = manifesto
        ? manifesto.offsetTop - window.innerHeight * 1.1
        : 40;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-line-dark bg-noir/90 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <a
          href="#"
          className="font-display text-2xl font-medium tracking-wide text-bone"
        >
          Atelier <span className="italic text-bronze-bright">Nord</span>
        </a>

        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-body text-xs font-medium uppercase tracking-[0.2em] text-bone/80 transition-colors hover:text-bone"
            >
              {link.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-bronze transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full border border-bronze/60 px-6 py-2.5 font-body text-xs font-medium uppercase tracking-[0.2em] text-bronze-bright transition-colors duration-300 hover:bg-bronze hover:text-noir"
          >
            Book a Consultation
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              menuOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-bone transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="animate-menu-in border-t border-line-dark bg-noir md:hidden">
          <div className="flex flex-col gap-6 px-6 pb-8 pt-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-body text-sm font-medium uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="rounded-full bg-bronze px-6 py-3 text-center font-body text-xs font-medium uppercase tracking-[0.2em] text-noir transition-colors hover:bg-bronze-bright"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
