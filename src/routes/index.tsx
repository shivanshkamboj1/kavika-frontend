import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/site/SiteLayout";
import { fetchPackages, formatINR } from "@/lib/packages";
import { imageFor } from "@/lib/package-images";
import heroImg from "@/assets/hero-himalayas.jpg";
import rajasthanImg from "@/assets/dest-rajasthan.jpg";
import keralaImg from "@/assets/dest-kerala.jpg";
import goaImg from "@/assets/dest-goa.jpg";
import varanasiImg from "@/assets/dest-varanasi.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Mitti Travels — Handcrafted Journeys Across India" },
      { name: "description", content: "Slow, soulful tours through the Himalayas, Kerala, Rajasthan, Goa & beyond. Crafted by locals, for travelers seeking the real India." },
      { property: "og:title", content: "Mitti Travels — Handcrafted Journeys Across India" },
      { property: "og:description", content: "Slow, soulful tours through the Himalayas, Kerala, Rajasthan, Goa & beyond." },
      { property: "og:image", content: heroImg },
    ],
  }),
});

function Index() {
  const { data: packages = [] } = useQuery({ queryKey: ["packages"], queryFn: fetchPackages });
  const featured = packages.filter((p) => p.featured).slice(0, 3);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative px-6 md:px-8 pt-12 pb-24 max-w-7xl mx-auto grid grid-cols-12 gap-8 items-center">
        <div className="col-span-12 lg:col-span-5 animate-soft-up">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-balance leading-[0.9] mb-8">
            Slow days in the <span className="italic text-primary">Himalayas.</span>
          </h1>
          <p className="max-w-[40ch] text-lg text-muted-foreground mb-10 leading-relaxed">
            Handcrafted journeys through India's most soul-stirring landscapes. No rush — just the rhythm of the road.
          </p>
          <div className="relative">
            <span className="absolute -top-10 left-2 font-hand text-2xl text-secondary -rotate-6">the quiet valley calls...</span>
            <Link to="/packages" className="inline-block px-10 py-4 border-2 border-foreground rounded-full font-semibold uppercase tracking-widest text-xs hover:bg-foreground hover:text-background transition-all">
              Explore Journeys
            </Link>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 animate-soft-up [animation-delay:200ms]">
          <div className="relative">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden ring-1 ring-black/5 shadow-2xl">
              <img src={heroImg} alt="Misty peaks of the Indian Himalayas at golden hour" width={1200} height={1504} className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-4 md:-left-8 bg-card p-6 rounded-2xl shadow-xl max-w-[280px] ring-1 ring-black/5">
              <p className="font-display italic text-xl mb-2">The Monastic Path</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest">12 Days · Private Guide · Heritage Stays</p>
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Mosaic */}
      <section className="px-6 md:px-8 py-24 bg-muted/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl mb-3 italic">Featured Terrains</h2>
              <p className="text-muted-foreground">The diverse soul of the subcontinent.</p>
            </div>
            <Link to="/destinations" className="font-mono text-xs uppercase tracking-widest border-b border-primary text-primary pb-1 shrink-0">View All</Link>
          </div>

          <div className="grid grid-cols-4 gap-4 md:gap-6 auto-rows-[140px] md:auto-rows-[280px]">
            <DestCard className="col-span-4 md:col-span-2 row-span-2" img={rajasthanImg} name="Rajasthan" caption="The Golden Sands" />
            <DestCard className="col-span-2" img={keralaImg} name="Kerala" caption="Silent Waters" />
            <DestCard className="col-span-1 md:col-span-1" img={goaImg} name="Goa" caption="Heritage Coast" />
            <DestCard className="col-span-1 md:col-span-1" img={varanasiImg} name="Varanasi" caption="Ancient Echoes" />
          </div>
        </div>
      </section>

      {/* Popular Packages */}
      <section className="px-6 md:px-8 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Curated Experiences</p>
          <h2 className="font-display text-4xl md:text-5xl">Popular Itineraries</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {featured.length === 0 && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-muted rounded-lg animate-pulse" />
          ))}
          {featured.map((p, i) => (
            <article key={p.id} className="flex flex-col animate-soft-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-6 shadow-sm">
                <img src={imageFor(p.slug, p.image_url)} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="flex justify-between items-start mb-3 gap-4">
                <h3 className="font-display text-2xl">{p.title}</h3>
                <span className="font-mono text-sm font-bold text-primary whitespace-nowrap">{formatINR(p.price_inr)}</span>
              </div>
              <div className="flex gap-3 text-[10px] uppercase tracking-widest font-medium text-muted-foreground mb-4">
                <span>{p.duration}</span>
                <span className="w-1 h-1 rounded-full bg-border my-auto" />
                <span>{p.destination}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.summary}</p>
              <Link to="/packages" className="mt-auto text-left font-bold text-xs uppercase tracking-widest border-b-2 border-primary w-fit pb-1 hover:text-primary transition-colors">
                View Details
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-ink text-cream py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { t: "Local Wisdom", d: "Guided by those who call these roads home." },
            { t: "Private Stays", d: "Handpicked heritage homes & boutiques." },
            { t: "Slow Travel", d: "Crafted itineraries that breathe." },
            { t: "Impact First", d: "Supporting rural crafts and communities." },
          ].map((f) => (
            <div key={f.t} className="text-center">
              <div className="size-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="size-2 bg-primary rounded-full" />
              </div>
              <h4 className="font-display italic text-xl mb-3">{f.t}</h4>
              <p className="text-xs text-cream/60 leading-relaxed uppercase tracking-widest">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-28 px-6 md:px-8 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="font-display text-4xl md:text-6xl mb-8 leading-tight">Ready to write your next <span className="italic">Indian chapter?</span></h2>
          <p className="text-lg text-muted-foreground mb-10">Start a conversation with our travel curators. We build every trip from scratch.</p>
          <Link to="/contact" className="inline-block bg-primary text-primary-foreground px-12 py-5 rounded-full text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform">
            Request Custom Quote
          </Link>
        </div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full translate-x-1/3 translate-y-1/3 blur-2xl" />
      </section>
    </SiteLayout>
  );
}

function DestCard({ className, img, name, caption }: { className?: string; img: string; name: string; caption: string }) {
  return (
    <Link to="/destinations" className={`group relative overflow-hidden rounded-2xl ${className ?? ""}`}>
      <img src={img} alt={`${name} — ${caption}`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
        <p className="font-display text-2xl">{caption}</p>
        <p className="text-[10px] font-mono uppercase tracking-widest opacity-80 mt-1">{name}</p>
      </div>
    </Link>
  );
}
