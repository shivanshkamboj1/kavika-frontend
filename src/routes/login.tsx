import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Admin Login — Mitti Travels" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || password.length < 6) { toast.error("Enter email and a 6+ char password"); return; }
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
        if (error) throw error;
        toast.success("Account created — check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <SiteLayout>
      <section className="px-6 md:px-8 py-24 max-w-md mx-auto">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-4">Admin</p>
        <h1 className="font-display text-4xl mb-2">{mode === "signin" ? "Welcome back." : "Create your admin account."}</h1>
        <p className="text-muted-foreground mb-8 text-sm">The first account to sign up becomes the admin.</p>
        <form onSubmit={onSubmit} className="space-y-4 bg-card p-8 rounded-2xl ring-1 ring-border">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Email</label>
            <input name="email" type="email" required className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Password</label>
            <input name="password" type="password" required minLength={6} className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <button disabled={busy} className="w-full bg-primary text-primary-foreground py-3.5 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60">
            {busy ? "…" : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
          <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-xs text-muted-foreground hover:text-primary">
            {mode === "signin" ? "Need an account? Sign up" : "Already have one? Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">← Back to site</Link></p>
      </section>
    </SiteLayout>
  );
}