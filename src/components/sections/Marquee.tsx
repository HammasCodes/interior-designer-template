const items = [
  "Residences",
  "Penthouses",
  "Townhouses",
  "Hospitality",
  "Yachts",
  "Pied-à-terre",
  "Country Estates",
  "Galleries",
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center font-body text-sm font-light uppercase tracking-[0.35em] text-bone-dim"
        >
          <span className="px-8">{item}</span>
          <span className="text-bronze">✦</span>
        </span>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="overflow-hidden border-y border-line-dark bg-noir py-7">
      <div className="animate-marquee flex w-max">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
