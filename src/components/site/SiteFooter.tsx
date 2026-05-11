import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 px-6 md:px-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-16">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <span className="font-display text-2xl font-bold italic text-primary">Mitti Travels</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Capturing the quiet, authentic, and handcrafted side of India for the modern traveler.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div>
            <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">Explore</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/destinations" className="hover:text-primary">Destinations</Link></li>
              <li><Link to="/packages" className="hover:text-primary">All Journeys</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Bespoke Travel</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">About</h5>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-primary">Our Ethos</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link to="/admin" className="hover:text-primary">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-mono uppercase tracking-[0.2em] mb-5 text-accent-foreground/70">Connect</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-primary">Instagram</a></li>
              <li><a href="#" className="hover:text-primary">Pinterest</a></li>
              <li><a href="#" className="hover:text-primary">WhatsApp</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">© {new Date().getFullYear()} Mitti Travels — Designed for soul seekers.</p>
        <div className="flex gap-8 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
}