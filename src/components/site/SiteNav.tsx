import { Link } from "@tanstack/react-router";

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold italic tracking-tight text-primary">Mitti</span>
          <span className="text-[10px] font-mono uppercase tracking-widest bg-accent/20 text-foreground px-1.5 py-0.5 rounded">Travels</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <Link to="/destinations" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Destinations</Link>
          <Link to="/packages" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Journeys</Link>
          <Link to="/about" className="hover:text-primary transition-colors" activeProps={{ className: "text-primary" }}>Our Story</Link>
          <Link to="/contact" className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full hover:bg-primary/90 transition-transform active:scale-95">Inquire</Link>
        </div>
        <Link to="/contact" className="md:hidden bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-medium uppercase tracking-widest">Inquire</Link>
      </div>
    </nav>
  );
}