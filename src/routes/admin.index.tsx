import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { defaultConfig, mergeConfig, SITE_CONTENT_ID, type SiteConfig } from "@/site/SiteConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Dashboard | NGS Infra Developers Admin" },
      { name: "description", content: "Edit website content and manage enquiries." },
      { property: "og:title", content: "Dashboard | NGS Infra Developers Admin" },
      { property: "og:description", content: "Edit website content and manage enquiries." },
    ],
  }),
  component: AdminDashboard,
});

type Enquiry = {
  id: string;
  name: string;
  mobile: string;
  email: string | null;
  plot_size: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

async function uploadMedia(file: File): Promise<string> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${Date.now()}-${safe}`;
  const { error } = await supabase.storage.from("site-media").upload(path, file, { contentType: file.type });
  if (error) throw error;
  return `/api/public/media/${path}`;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [state, setState] = useState<"loading" | "denied" | "ready">("loading");
  const [cfg, setCfg] = useState<SiteConfig>(defaultConfig);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return navigate({ to: "/admin/login" });
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user.id)
        .eq("role", "admin");
      if (!roles?.length) return setState("denied");
      const { data: row } = await supabase.from("site_content").select("data").eq("id", SITE_CONTENT_ID).maybeSingle();
      setCfg(mergeConfig(row?.data));
      setState("ready");
    })();
  }, [navigate]);

  const set = <K extends keyof SiteConfig>(k: K, v: SiteConfig[K]) => setCfg((c) => ({ ...c, [k]: v }));

  const save = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("site_content")
      .upsert({ id: SITE_CONTENT_ID, data: cfg as never, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) { toast.error("Could not save: " + error.message); return; }
    qc.invalidateQueries({ queryKey: ["site-content"] });
    toast.success("Website updated");
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin/login" });
  };

  if (state === "loading") return <p className="p-10 text-muted-foreground">Loading…</p>;
  if (state === "denied")
    return (
      <div className="p-10 space-y-4">
        <p>This account does not have admin access.</p>
        <Button onClick={signOut}>Sign out</Button>
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <img src={cfg.logo} alt="" className="h-11 w-11 rounded-full" />
          <div>
            <h1 className="text-2xl">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">{cfg.businessName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <a href="/" target="_blank" rel="noreferrer">View website</a>
          </Button>
          <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
          <Button variant="ghost" onClick={signOut}>Sign out</Button>
        </div>
      </header>

      <Tabs defaultValue="general">
        <TabsList className="mb-6 flex h-auto flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact & Location</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="founder">Founder</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="facilities">Facilities</TabsTrigger>
          <TabsTrigger value="enquiries">Enquiries</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Field label="Business name" value={cfg.businessName} onChange={(v) => set("businessName", v)} />
          <Field label="Tagline" value={cfg.tagline} onChange={(v) => set("tagline", v)} />
          <Field label="Project name" value={cfg.projectName} onChange={(v) => set("projectName", v)} />
          <Field label="Top banner description" multiline value={cfg.heroSubtitle} onChange={(v) => set("heroSubtitle", v)} />
          <Field label="Survey number" value={cfg.surveyNumber} onChange={(v) => set("surveyNumber", v)} />
          <Field label="Documentation note" value={cfg.documentationClaim} onChange={(v) => set("documentationClaim", v)} />
          <h3 className="pt-4 text-lg">Registration badge</h3>
          <Field label="Label" value={cfg.registration.label} onChange={(v) => set("registration", { ...cfg.registration, label: v })} />
          <Field label="Authority" value={cfg.registration.authority} onChange={(v) => set("registration", { ...cfg.registration, authority: v })} />
          <Field label="Number" value={cfg.registration.number} onChange={(v) => set("registration", { ...cfg.registration, number: v })} />
          <Field label="Designer credit link" value={cfg.bToPNexusURL} onChange={(v) => set("bToPNexusURL", v)} />
          <ExtraLinesEditor
            lines={cfg.extraLines["general"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, general: lines })}
          />
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Field label="Primary phone" value={cfg.phoneNumberPrimary} onChange={(v) => set("phoneNumberPrimary", v)} />
          <Field label="Secondary phone" value={cfg.phoneNumberSecondary} onChange={(v) => set("phoneNumberSecondary", v)} />
          <Field label="WhatsApp number" value={cfg.whatsappNumber} onChange={(v) => set("whatsappNumber", v)} />
          <Field label="Email" value={cfg.email} onChange={(v) => set("email", v)} />
          <Field label="Location name" value={cfg.locationName} onChange={(v) => set("locationName", v)} />
          <Field label="Full address" multiline value={cfg.exactAddress} onChange={(v) => set("exactAddress", v)} />
          <Field label="Google Maps embed link" value={cfg.googleMapsEmbedURL} onChange={(v) => set("googleMapsEmbedURL", v)} />
          <Field label="Google Maps directions link" value={cfg.googleMapsDirectionsURL} onChange={(v) => set("googleMapsDirectionsURL", v)} />
          <h3 className="pt-4 text-lg">Social media</h3>
          {(["instagram", "youtube", "facebook"] as const).map((k) => (
            <Field
              key={k}
              label={k[0]!.toUpperCase() + k.slice(1)}
              value={cfg.socialMediaLinks[k]}
              onChange={(v) => set("socialMediaLinks", { ...cfg.socialMediaLinks, [k]: v })}
            />
          ))}
          <ExtraLinesEditor
            lines={cfg.extraLines["contact"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, contact: lines })}
          />
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <MediaField label="Logo" value={cfg.logo} onChange={(v) => set("logo", v)} />
          <MediaField label="Top banner video (leave empty to show image)" kind="video" value={cfg.projectVideoURL} onChange={(v) => set("projectVideoURL", v)} />
          <MediaField label="Top banner image" value={cfg.heroImage} onChange={(v) => set("heroImage", v)} />
          <MediaField label="Layout plan" value={cfg.layoutPlanImage} onChange={(v) => set("layoutPlanImage", v)} />
          <ExtraLinesEditor
            lines={cfg.extraLines["media"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, media: lines })}
          />
        </TabsContent>

        <TabsContent value="founder" className="space-y-4">
          <Field label="Name" value={cfg.founder.name} onChange={(v) => set("founder", { ...cfg.founder, name: v })} />
          <Field label="Role" value={cfg.founder.role} onChange={(v) => set("founder", { ...cfg.founder, role: v })} />
          <Field label="Biography" multiline value={cfg.founder.bio} onChange={(v) => set("founder", { ...cfg.founder, bio: v })} />
          <MediaField label="Photo" value={cfg.founder.photo} onChange={(v) => set("founder", { ...cfg.founder, photo: v })} />
          <ExtraLinesEditor
            lines={cfg.extraLines["founder"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, founder: lines })}
          />
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          {cfg.sitePhotos.map((p, i) => (
            <div key={p.id} className="space-y-3 rounded-lg border p-4">
              <Field
                label={`Photo ${i + 1} caption`}
                value={p.label}
                onChange={(v) => set("sitePhotos", cfg.sitePhotos.map((x) => (x.id === p.id ? { ...x, label: v } : x)))}
              />
              <MediaField
                label="Image"
                value={p.src}
                onChange={(v) => set("sitePhotos", cfg.sitePhotos.map((x) => (x.id === p.id ? { ...x, src: v } : x)))}
              />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={i === 0} onClick={() => set("sitePhotos", move(cfg.sitePhotos, i, -1))}>Move up</Button>
                <Button variant="outline" size="sm" disabled={i === cfg.sitePhotos.length - 1} onClick={() => set("sitePhotos", move(cfg.sitePhotos, i, 1))}>Move down</Button>
                <Button variant="destructive" size="sm" onClick={() => set("sitePhotos", cfg.sitePhotos.filter((x) => x.id !== p.id))}>Remove</Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() =>
              set("sitePhotos", [
                ...cfg.sitePhotos,
                { id: Date.now(), label: `Site photograph ${cfg.sitePhotos.length + 1}`, src: "" },
              ])
            }
          >
            Add photo
          </Button>
          <ExtraLinesEditor
            lines={cfg.extraLines["gallery"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, gallery: lines })}
          />
        </TabsContent>

        <TabsContent value="facilities" className="space-y-4">
          {cfg.facilities.map((f, i) => (
            <div key={i} className="space-y-3 rounded-lg border p-4">
              <Field label="Title" value={f.title} onChange={(v) => set("facilities", cfg.facilities.map((x, j) => (j === i ? { ...x, title: v } : x)))} />
              <Field label="Description" multiline value={f.description} onChange={(v) => set("facilities", cfg.facilities.map((x, j) => (j === i ? { ...x, description: v } : x)))} />
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={i === 0} onClick={() => set("facilities", move(cfg.facilities, i, -1))}>Move up</Button>
                <Button variant="outline" size="sm" disabled={i === cfg.facilities.length - 1} onClick={() => set("facilities", move(cfg.facilities, i, 1))}>Move down</Button>
                <Button variant="destructive" size="sm" onClick={() => set("facilities", cfg.facilities.filter((_, j) => j !== i))}>Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => set("facilities", [...cfg.facilities, { title: "New facility", description: "" }])}>
            Add facility
          </Button>
          <ExtraLinesEditor
            lines={cfg.extraLines["facilities"] ?? []}
            onChange={(lines) => set("extraLines", { ...cfg.extraLines, facilities: lines })}
          />
        </TabsContent>

        <TabsContent value="enquiries">
          <Enquiries />
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            if (confirm("Reset all website content to the original version? You still need to press Save.")) setCfg(defaultConfig);
          }}
        >
          Reset to original
        </Button>
        <Button onClick={save} disabled={saving}>{saving ? "Saving…" : "Save changes"}</Button>
      </div>
    </div>
  );
}

function move<T>(arr: T[], i: number, d: number): T[] {
  const next = [...arr];
  const [item] = next.splice(i, 1);
  next.splice(i + d, 0, item as T);
  return next;
}

function Field({ label, value, onChange, multiline }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {multiline ? (
        <Textarea value={value ?? ""} onChange={(e) => onChange(e.target.value)} rows={4} />
      ) : (
        <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ExtraLinesEditor({ lines, onChange }: { lines: string[]; onChange: (lines: string[]) => void }) {
  return (
    <div className="space-y-3 border-t pt-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg">Extra lines</h3>
        <Button type="button" variant="outline" onClick={() => onChange([...lines, ""])}>
          Add line
        </Button>
      </div>
      {lines.map((line, index) => (
        <div className="flex items-center gap-2" key={index}>
          <Input
            aria-label={`Extra line ${index + 1}`}
            value={line}
            onChange={(event) =>
              onChange(lines.map((current, lineIndex) => (lineIndex === index ? event.target.value : current)))
            }
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(lines.filter((_, lineIndex) => lineIndex !== index))}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}

function MediaField({ label, value, onChange, kind = "image" }: { label: string; value: string; onChange: (v: string) => void; kind?: "image" | "video" }) {
  const [busy, setBusy] = useState(false);
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value &&
        (kind === "video" ? (
          <video src={value} className="max-h-48 rounded border" controls muted />
        ) : (
          <img src={value} alt="" className="max-h-48 rounded border object-contain" />
        ))}
      <div className="flex flex-wrap items-center gap-2">
        <Input value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder="Link or upload a file" className="flex-1" />
        <Button variant="outline" asChild disabled={busy}>
          <label className="cursor-pointer">
            {busy ? "Uploading…" : "Upload"}
            <input
              type="file"
              hidden
              accept={kind === "video" ? "video/*" : "image/*"}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setBusy(true);
                try {
                  onChange(await uploadMedia(file));
                  toast.success("Uploaded — remember to save");
                } catch (err) {
                  toast.error("Upload failed: " + (err as Error).message);
                } finally {
                  setBusy(false);
                }
              }}
            />
          </label>
        </Button>
        {value && <Button variant="ghost" onClick={() => onChange("")}>Clear</Button>}
      </div>
    </div>
  );
}

function Enquiries() {
  const [rows, setRows] = useState<Enquiry[] | null>(null);
  const load = async () => {
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Enquiry[]) ?? []);
  };
  useEffect(() => {
    load();
  }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) { toast.error(error.message); return; }
    load();
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    load();
  };

  if (!rows) return <p className="text-muted-foreground">Loading…</p>;
  if (!rows.length) return <p className="text-muted-foreground">No enquiries yet.</p>;
  return (
    <div className="space-y-3">
      {rows.map((r) => (
        <div key={r.id} className="rounded-lg border p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{r.name}</p>
              <p className="text-sm">
                <a href={`tel:+91${r.mobile}`} className="underline">{r.mobile}</a>
                {r.email && <> · <a href={`mailto:${r.email}`} className="underline">{r.email}</a></>}
              </p>
              <p className="text-sm text-muted-foreground">
                {r.plot_size || "Any size"} · {new Date(r.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded border bg-background px-2 py-1 text-sm"
                value={r.status}
                onChange={(e) => setStatus(r.id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <Button size="sm" variant="destructive" onClick={() => remove(r.id)}>Delete</Button>
            </div>
          </div>
          {r.message && <p className="mt-2 text-sm whitespace-pre-wrap">{r.message}</p>}
        </div>
      ))}
    </div>
  );
}
