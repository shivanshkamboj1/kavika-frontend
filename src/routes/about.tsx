import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import img from "@/assets/dest-varanasi.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "Our Story — Mitti Travels" },
      { name: "description", content: "We're a small India-based travel studio crafting slow, considered journeys for curious travelers." },
    ],
  }),
});

function AboutPage() {
  return (
    <SiteLayout>
      <section className="px-6 md:px-8 pt-16 pb-20 max-w-5xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Our Story</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          A small studio with a <span className="italic text-primary">long memory.</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-12 mt-16 items-start">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden">
            <img src={img} alt="Varanasi at dawn" className="w-full h-full object-cover" />
          </div>
          <div className="prose prose-stone max-w-none text-foreground space-y-6 text-lg leading-relaxed">
            <p>Mitti — meaning <em>earth</em> — is a tiny travel studio based out of India. We design unhurried journeys for travelers who'd rather know one village deeply than tick off ten cities.</p>
            <p>Every itinerary is hand-built by people who've actually walked the trails, slept in the homestays, and shared the meals. No call centers, no cookie-cutter packages.</p>
            <p>If that sounds like your kind of trip, we'd love to plan one with you.</p>
            <Link to="/contact" className="inline-block mt-4 bg-primary text-primary-foreground px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest">Start a Conversation</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}