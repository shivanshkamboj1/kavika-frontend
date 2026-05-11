import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/lib/use-auth";
import { fetchPackages, formatINR, type Package } from "@/lib/packages";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Admin — Mitti Travels" }] }),
});

function AdminPage() {
  const { session, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data: packages = [] } = useQuery({ queryKey: ["packages"], queryFn: fetchPackages });
  const [editing, setEditing] = useState<Package | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);

  if (loading || !session) return <SiteLayout><div className="p-12 text-center text-muted-foreground">Loading…</div></SiteLayout>;

  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="max-w-md mx-auto p-12 text-center">
          <h1 className="font-display text-3xl mb-4">Not an admin</h1>
          <p className="text-muted-foreground mb-6">Your account doesn't have admin access.</p>
          <button onClick={() => supabase.auth.signOut()} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-xs uppercase tracking-widest">Sign out</button>
        </div>
      </SiteLayout>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this package?")) return;
    const { error } = await supabase.from("packages").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    qc.invalidateQueries({ queryKey: ["packages"] });
  };

  return (
    <SiteLayout>
      <section className="px-6 md:px-8 py-12 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-secondary mb-2">Admin</p>
            <h1 className="font-display text-4xl">Manage Packages</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest">+ New Package</button>
            <button onClick={() => supabase.auth.signOut()} className="border border-border px-5 py-2.5 rounded-full text-xs uppercase tracking-widest">Sign out</button>
          </div>
        </div>

        {showForm && (
          <PackageForm initial={editing} onClose={() => { setShowForm(false); setEditing(null); }} onSaved={() => { setShowForm(false); setEditing(null); qc.invalidateQueries({ queryKey: ["packages"] }); }} />
        )}

        <div className="bg-card rounded-2xl ring-1 ring-border overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Destination</th>
                <th className="px-6 py-4 font-semibold">Duration</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Featured</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {packages.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 font-medium">{p.title}</td>
                  <td className="px-6 py-4">{p.destination}</td>
                  <td className="px-6 py-4">{p.duration}</td>
                  <td className="px-6 py-4 text-primary font-bold">{formatINR(p.price_inr)}</td>
                  <td className="px-6 py-4">{p.featured ? "★" : "—"}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button onClick={() => { setEditing(p); setShowForm(true); }} className="text-primary font-medium">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-destructive font-medium">Delete</button>
                  </td>
                </tr>
              ))}
              {packages.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">No packages yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-xs text-muted-foreground"><Link to="/" className="hover:text-primary">← Back to site</Link></p>
      </section>
    </SiteLayout>
  );
}

function PackageForm({ initial, onClose, onSaved }: { initial: Package | null; onClose: () => void; onSaved: () => void }) {
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      title: String(fd.get("title") ?? "").trim(),
      slug: String(fd.get("slug") ?? "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
      destination: String(fd.get("destination") ?? "").trim(),
      duration: String(fd.get("duration") ?? "").trim(),
      price_inr: Number(fd.get("price_inr") ?? 0),
      summary: String(fd.get("summary") ?? "").trim(),
      description: String(fd.get("description") ?? "").trim(),
      image_url: String(fd.get("image_url") ?? "").trim(),
      featured: fd.get("featured") === "on",
    };
    if (!payload.title || !payload.slug || !payload.destination || !payload.duration) {
      toast.error("Title, slug, destination & duration are required"); return;
    }
    setBusy(true);
    const { error } = initial
      ? await supabase.from("packages").update(payload).eq("id", initial.id)
      : await supabase.from("packages").insert(payload);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(initial ? "Updated" : "Created");
    onSaved();
  };

  return (
    <form onSubmit={submit} className="bg-card p-6 md:p-8 rounded-2xl ring-1 ring-border mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <h2 className="md:col-span-2 font-display text-2xl mb-2">{initial ? "Edit package" : "New package"}</h2>
      <Inp name="title" label="Title" defaultValue={initial?.title} required />
      <Inp name="slug" label="Slug (url-id)" defaultValue={initial?.slug} required />
      <Inp name="destination" label="Destination" defaultValue={initial?.destination} required />
      <Inp name="duration" label="Duration (e.g. 6 Days / 5 Nights)" defaultValue={initial?.duration} required />
      <Inp name="price_inr" label="Price (INR)" type="number" defaultValue={initial?.price_inr?.toString()} required />
      <Inp name="image_url" label="Image URL (optional)" defaultValue={initial?.image_url} />
      <Inp name="summary" label="Summary" defaultValue={initial?.summary} className="md:col-span-2" />
      <div className="md:col-span-2 flex flex-col gap-2">
        <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Description</label>
        <textarea name="description" rows={4} defaultValue={initial?.description ?? ""} className="rounded-lg border border-input bg-background px-4 py-3 text-sm" />
      </div>
      <label className="flex items-center gap-2 text-sm md:col-span-2">
        <input type="checkbox" name="featured" defaultChecked={initial?.featured} /> Featured on homepage
      </label>
      <div className="md:col-span-2 flex gap-3">
        <button disabled={busy} className="bg-primary text-primary-foreground px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest disabled:opacity-60">{busy ? "Saving…" : "Save"}</button>
        <button type="button" onClick={onClose} className="border border-border px-6 py-3 rounded-full text-xs uppercase tracking-widest">Cancel</button>
      </div>
    </form>
  );
}

function Inp({ label, name, defaultValue, type = "text", required, className }: { label: string; name: string; defaultValue?: string; type?: string; required?: boolean; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className ?? ""}`}>
      <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} required={required} maxLength={500} className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}