import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, MapPin, ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { sendContactEmail } from "../../lib/email";
import { useLanguage } from "../../i18n/LanguageContext";

type Status = "idle" | "sending" | "success" | "error";

function Contact() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Fire both in parallel — a Firestore hiccup shouldn't block the email, and vice versa.
      await Promise.all([
        sendContactEmail({ name, email, message }),
        addDoc(collection(db, "messages"), {
          name,
          email,
          message,
          createdAt: serverTimestamp(),
        }),
      ]);

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">
              {t.contact.label}
            </p>
            <h2 className="max-w-md text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              {t.contact.headingA}
              <span className="text-[#A8B0D0]"> {t.contact.headingB}</span>
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-[#A8B0D0]">
              {t.contact.paragraph}
            </p>

            <div className="mt-10 space-y-4">
           
              <div className="flex items-center gap-3 text-sm text-white/70">
                <MapPin size={18} className="text-[#35D6B0]" />
                {t.contact.location}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.contact.formName}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#35D6B0]/50"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.contact.formEmail}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#35D6B0]/50"
              />
            </div>

            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.contact.formMessage}
              rows={5}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#35D6B0]/50"
            />

            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#35D6B0] px-7 py-4 font-semibold text-[#080B2A] transition hover:bg-[#4DE4C0] disabled:opacity-60 sm:w-auto"
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {t.contact.sending}
                </>
              ) : (
                <>
                  {t.contact.send}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-[#35D6B0]">
                <CheckCircle2 size={16} />
                {t.contact.success}
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {t.contact.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;