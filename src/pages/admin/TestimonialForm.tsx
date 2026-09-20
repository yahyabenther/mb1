import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Star } from "lucide-react";
import { db } from "../../firebase/config";
import { uploadToCloudinary } from "../../firebase/cloudinary";
import type { FirestoreTestimonial } from "../../types/firestore";

const empty: Omit<FirestoreTestimonial, "id"> = {
  quote: { en: "", ar: "" },
  author: "",
  role: { en: "", ar: "" },
  featured: false,
  websiteUrl: "",
  photoUrl: "",
  rating: 5,
};

function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={22}
            className={n <= value ? "fill-[#35D6B0] text-[#35D6B0]" : "text-white/20"}
          />
        </button>
      ))}
    </div>
  );
}

function TestimonialForm({
  testimonial,
  onDone,
}: {
  testimonial: FirestoreTestimonial | null;
  onDone: () => void;
}) {
  const [form, setForm] = useState<Omit<FirestoreTestimonial, "id">>(
    testimonial ? { ...testimonial, rating: testimonial.rating ?? 5 } : empty
  );
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePhotoUpload = async (file: File) => {
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setForm((f) => ({ ...f, photoUrl: url }));
    } catch {
      alert("Photo upload failed. Check your Cloudinary config.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (testimonial) await updateDoc(doc(db, "testimonials", testimonial.id), form);
      else await addDoc(collection(db, "testimonials"), form);
      onDone();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!testimonial) return;
    if (!confirm("Delete this testimonial?")) return;
    await deleteDoc(doc(db, "testimonials", testimonial.id));
    onDone();
  };

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center gap-4">
        {form.photoUrl ? (
          <img src={form.photoUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-dashed border-white/20 text-xs text-white/40">
            No photo
          </div>
        )}
        <label className="cursor-pointer rounded-xl border border-white/20 px-4 py-2 text-sm text-white hover:border-white">
          {uploading ? "Uploading…" : "Upload photo"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={(e) => e.target.files?.[0] && handlePhotoUpload(e.target.files[0])}
          />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} placeholder="Author name" className="input sm:col-span-2" />
        <input value={form.role.en} onChange={(e) => setForm({ ...form, role: { ...form.role, en: e.target.value } })} placeholder="Role (EN)" className="input" />
        <input value={form.role.ar} onChange={(e) => setForm({ ...form, role: { ...form.role, ar: e.target.value } })} placeholder="Role (AR)" dir="rtl" className="input" />
        <textarea value={form.quote.en} onChange={(e) => setForm({ ...form, quote: { ...form.quote, en: e.target.value } })} placeholder="Quote (EN)" className="input sm:col-span-2" rows={3} />
        <textarea value={form.quote.ar} onChange={(e) => setForm({ ...form, quote: { ...form.quote, ar: e.target.value } })} placeholder="Quote (AR)" dir="rtl" className="input sm:col-span-2" rows={3} />
        <input
          value={form.websiteUrl ?? ""}
          onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
          placeholder="Client website URL (optional)"
          className="input sm:col-span-2"
        />

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm text-white/50">Rating</p>
          <StarRatingInput value={form.rating ?? 5} onChange={(rating) => setForm({ ...form, rating })} />
        </div>

        <label className="flex items-center gap-2 text-sm text-white/70 sm:col-span-2">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured (shown large)
        </label>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={handleSave} disabled={saving} className="rounded-xl bg-[#35D6B0] px-6 py-3 text-sm font-semibold text-[#080B2A] hover:bg-[#4DE4C0] disabled:opacity-50">
          {saving ? "Saving…" : testimonial ? "Save changes" : "Create testimonial"}
        </button>
        {testimonial && (
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

export default TestimonialForm;