import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { uploadToCloudinary } from "../../firebase/cloudinary";
import type { FirestoreProject } from "../../types/firestore";
import IconPicker from "./IconPicker";
const emptyProject: Omit<FirestoreProject, "id"> = {
  slug: "",
  number: "",
  title: { en: "", ar: "" },
  description: { en: "", ar: "" },
  category: { en: "", ar: "" },
  technologies: [],
  gradient: "from-[#1824A8] via-[#243BFF] to-[#635BFF]",
  iconKey: "car",
  images: [],
  liveUrl: "",
  statLabel: { en: "", ar: "" },
  statValue: "",
  brief: { en: "", ar: "" },
  approach: { en: "", ar: "" },
  results: [],
};

type Bilingual = { en: string; ar: string };
type BilingualField = "title" | "description" | "category" | "statLabel" | "brief" | "approach";

function ProjectForm({
  project,
  onDone,
}: {
  project: FirestoreProject | null;
  onDone: () => void;
}) {
  const [form, setForm] = useState<Omit<FirestoreProject, "id">>(
    project ? { ...project } : emptyProject
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const setBilingual = (field: BilingualField, lang: keyof Bilingual, value: string) => {
    setForm((f) => ({ ...f, [field]: { ...f[field], [lang]: value } }));
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, images: [...f.images, url] }));
    } catch {
      alert("Image upload failed. Check your Cloudinary config.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (project) await updateDoc(doc(db, "projects", project.id), form);
      else await addDoc(collection(db, "projects"), form);
      onDone();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!project) return;
    if (!confirm("Delete this project?")) return;
    await deleteDoc(doc(db, "projects", project.id));
    onDone();
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug (e.g. car-marketplace)" className="input" />
        <input value={form.number} onChange={(e) => setForm({ ...form, number: e.target.value })} placeholder="Number (e.g. 01)" className="input" />

        <input value={form.title.en} onChange={(e) => setBilingual("title", "en", e.target.value)} placeholder="Title (EN)" className="input" />
        <input value={form.title.ar} onChange={(e) => setBilingual("title", "ar", e.target.value)} placeholder="Title (AR)" dir="rtl" className="input" />

        <input value={form.category.en} onChange={(e) => setBilingual("category", "en", e.target.value)} placeholder="Category (EN)" className="input" />
        <input value={form.category.ar} onChange={(e) => setBilingual("category", "ar", e.target.value)} placeholder="Category (AR)" dir="rtl" className="input" />

        <textarea value={form.description.en} onChange={(e) => setBilingual("description", "en", e.target.value)} placeholder="Description (EN)" className="input sm:col-span-2" rows={2} />
        <textarea value={form.description.ar} onChange={(e) => setBilingual("description", "ar", e.target.value)} placeholder="Description (AR)" dir="rtl" className="input sm:col-span-2" rows={2} />

        <textarea value={form.brief.en} onChange={(e) => setBilingual("brief", "en", e.target.value)} placeholder="Brief (EN)" className="input sm:col-span-2" rows={2} />
        <textarea value={form.brief.ar} onChange={(e) => setBilingual("brief", "ar", e.target.value)} placeholder="Brief (AR)" dir="rtl" className="input sm:col-span-2" rows={2} />

        <textarea value={form.approach.en} onChange={(e) => setBilingual("approach", "en", e.target.value)} placeholder="Approach (EN)" className="input sm:col-span-2" rows={2} />
        <textarea value={form.approach.ar} onChange={(e) => setBilingual("approach", "ar", e.target.value)} placeholder="Approach (AR)" dir="rtl" className="input sm:col-span-2" rows={2} />

        <input
          value={form.technologies.join(", ")}
          onChange={(e) => setForm({ ...form, technologies: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
          placeholder="Technologies (comma separated)"
          className="input sm:col-span-2"
        />

 <IconPicker
  value={form.iconKey}
  onChange={(iconKey) => setForm({ ...form, iconKey })}
/>

        <input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="Live URL" className="input" />

        <input value={form.statLabel.en} onChange={(e) => setBilingual("statLabel", "en", e.target.value)} placeholder="Stat label (EN)" className="input" />
        <input value={form.statValue} onChange={(e) => setForm({ ...form, statValue: e.target.value })} placeholder="Stat value (e.g. 1,204)" className="input" />
      </div>

      <div className="mt-6">
        <p className="text-sm font-semibold text-white/70">Images (first = main thumbnail)</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {form.images.map((url, i) => (
            <div key={url} className="relative h-20 w-20 overflow-hidden rounded-lg border border-white/10">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button onClick={() => removeImage(i)} className="absolute right-1 top-1 rounded-full bg-black/60 px-1.5 text-xs text-white">
                ×
              </button>
            </div>
          ))}
          <label className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/20 text-xs text-white/50 hover:border-white/40">
            {uploading ? "…" : "+ Add"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={uploading}
              onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="rounded-xl bg-[#35D6B0] px-6 py-3 text-sm font-semibold text-[#080B2A] hover:bg-[#4DE4C0] disabled:opacity-50">
          {saving ? "Saving…" : project ? "Save changes" : "Create project"}
        </button>
        {project && (
          <button onClick={handleDelete} className="rounded-xl border border-red-400/40 px-6 py-3 text-sm font-semibold text-red-400 hover:bg-red-400/10">
            Delete
          </button>
        )}
        <button onClick={onDone} className="text-sm text-white/50 hover:text-white">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ProjectForm;