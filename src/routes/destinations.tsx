import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import rajasthan from "@/assets/dest-rajasthan.jpg";
import kerala from "@/assets/dest-kerala.jpg";
import goa from "@/assets/dest-goa.jpg";
import varanasi from "@/assets/dest-varanasi.jpg";
import himalayas from "@/assets/hero-himalayas.jpg";

const destinations = [
  { name: "Himalayas", img: himalayas, blurb: "Spiti, Ladakh, Kashmir — the high, quiet north." },
  { name: "Rajasthan", img: rajasthan, blurb: "Forts, dunes, and palace breakfasts in the land of kings." },
  { name: "Kerala", img: kerala, blurb: "Backwaters, spice hills, and slow ayurveda days." },
  { name: "Goa", img: goa, blurb: "Latin quarters, sleepy beaches, long lunches." },
  { name: "Varanasi", img: varanasi, blurb: "Where the Ganges meets dawn, and time pauses." },
];

export const Route = createFileRoute("/destinations")({
  component: DestinationsPage,
  head: () => ({
    meta: [
      { title: "Destinations Across India — Mitti Travels" },
      { name: "description", content: "Discover the regions we know by heart — Himalayas, Rajasthan, Kerala, Goa, Varanasi and more." },
    ],
  }),
});

function DestinationsPage() {
  return (
    <SiteLayout>
      <header className="px-6 md:px-8 pt-16 pb-12 max-w-7xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Destinations</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-3xl">
          The places we <span className="italic text-primary">return to.</span>
        </h1>
      </header>
      <section className="px-6 md:px-8 pb-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {destinations.map((d) => (
          <article key={d.name} className="group">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5">
              <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <h2 className="font-display text-3xl mb-2">{d.name}</h2>
            <p className="text-muted-foreground mb-4 max-w-md">{d.blurb}</p>
            <Link to="/packages" className="font-mono text-xs uppercase tracking-widest text-primary border-b border-primary pb-1">See Journeys</Link>
          </article>
        ))}
      </section>
    </SiteLayout>
  );
}