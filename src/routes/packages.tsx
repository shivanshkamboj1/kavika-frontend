import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fetchPackages, formatINR } from "@/lib/packages";
import { imageFor } from "@/lib/package-images";

export const Route = createFileRoute("/packages")({
  component: PackagesPage,
  head: () => ({
    meta: [
      { title: "Tour Packages — Mitti Travels" },
      { name: "description", content: "Browse our handcrafted India tour packages — Rajasthan, Kerala, Himalayas, Goa & more, with private guides and heritage stays." },
    ],
  }),
});

function PackagesPage() {
  const { data: packages = [], isLoading } = useQuery({ queryKey: ["packages"], queryFn: fetchPackages });

  return (
    <SiteLayout>
      <header className="px-6 md:px-8 pt-16 pb-12 max-w-7xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">All Journeys</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95] max-w-3xl">
          Every itinerary, <span className="italic text-primary">handwritten.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-2xl">A growing collection of trips we know by heart — built for slow travelers who want India on their own terms.</p>
      </header>

      <section className="px-6 md:px-8 pb-24 max-w-7xl mx-auto">
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/3] bg-muted rounded-lg animate-pulse" />)}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.map((p) => (
            <article key={p.id} className="flex flex-col group">
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-5 shadow-sm">
                <img src={imageFor(p.slug, p.image_url)} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex justify-between items-start mb-3 gap-4">
                <h2 className="font-display text-2xl">{p.title}</h2>
                <span className="font-mono text-sm font-bold text-primary whitespace-nowrap">{formatINR(p.price_inr)}</span>
              </div>
              <div className="flex gap-3 text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-3">
                <span>{p.duration}</span>
                <span className="w-1 h-1 rounded-full bg-border my-auto" />
                <span>{p.destination}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.summary}</p>
              <Link to="/contact" className="text-left font-bold text-xs uppercase tracking-widest border-b-2 border-primary w-fit pb-1 hover:text-primary">Inquire</Link>
            </article>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}