import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Plan Your Trip — Mitti Travels" },
      { name: "description", content: "Tell us about the India trip you've been dreaming of. Our travel curators reply within 24 hours." },
    ],
  }),
});

const schema = z.object({
  name: z.string().trim().min(1, "Please share your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  destination: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "A few more details would help").max(2000),
});

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: form.get("name"),
      email: form.get("email"),
      destination: form.get("destination") ?? "",
      message: form.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Thanks! We'll write back within 24 hours.");
    }, 700);
  };

  return (
    <SiteLayout>
      <section className="px-6 md:px-8 pt-16 pb-24 max-w-4xl mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Plan Your Trip</p>
        <h1 className="font-display text-5xl md:text-7xl text-balance leading-[0.95]">
          Tell us about the trip you've been <span className="italic text-primary">dreaming of.</span>
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-xl">A few sentences is all we need to start. We reply within 24 hours.</p>

        <form onSubmit={onSubmit} className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 bg-card p-8 md:p-10 rounded-3xl shadow-sm ring-1 ring-border">
          <Field label="Your name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <Field label="Destination of interest" name="destination" placeholder="e.g. Kerala, Rajasthan…" className="md:col-span-2" />
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Tell us more</label>
            <textarea name="message" required rows={5} maxLength={2000} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="When are you thinking of traveling, who's coming, what kind of experiences excite you…" />
          </div>
          <button disabled={submitting} className="md:col-span-2 justify-self-start bg-primary text-primary-foreground px-10 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform disabled:opacity-60">
            {submitting ? "Sending…" : "Send Inquiry"}
          </button>
        </form>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required, placeholder, className }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} maxLength={255} className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}