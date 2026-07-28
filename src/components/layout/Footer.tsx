const exploreLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Materials", href: "#materials" },
];

const studioLinks = [
  { label: "The Principle", href: "#manifesto" },
  { label: "Testimonials", href: "#testimonials-anchor" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-noir-deep px-6 pb-10 pt-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl font-medium text-bone">Atelier Nord</p>
            <p className="mt-4 max-w-xs font-body text-sm font-light leading-relaxed text-bone-dim">
              An interior design studio for residences that are meant to be
              lived in slowly — and kept for a lifetime.
            </p>
          </div>

          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.25em] text-bronze">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-light text-bone-dim transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.25em] text-bronze">
              Studio
            </p>
            <ul className="mt-5 space-y-3">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-light text-bone-dim transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-body text-xs font-medium uppercase tracking-[0.25em] text-bronze">
              Elsewhere
            </p>
            <ul className="mt-5 space-y-3">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm font-light text-bone-dim transition-colors duration-200 hover:text-bone"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-dark pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs font-light tracking-wide text-bone-dim/70">
            © 2026 Atelier Nord LLC. All rights reserved.
          </p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.25em] text-bone-dim transition-colors duration-200 hover:text-bronze"
          >
            Back to top
            <span className="transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
