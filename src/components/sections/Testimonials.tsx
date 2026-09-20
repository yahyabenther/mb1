import { ExternalLink, Star } from "lucide-react";
import { useTestimonials } from "../../hooks/useTestimonials";
import { useLanguage } from "../../i18n/LanguageContext";

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#35D6B0]/15 text-sm font-semibold text-[#35D6B0]">
      {initials}
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={14}
          className={n <= rating ? "fill-[#35D6B0] text-[#35D6B0]" : "text-white/15"}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  rating,
  photoUrl,
  websiteUrl,
  offset,
}: {
  quote: string;
  author: string;
  role: string;
  rating: number;
  photoUrl?: string;
  websiteUrl?: string;
  offset: boolean;
}) {
  return (
    <div
      className={`relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7 ${
        offset ? "sm:mt-8" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {photoUrl ? (
            <img src={photoUrl} alt="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
          ) : (
            <Initials name={author} />
          )}
          <div>
            <p className="font-semibold text-white">{author}</p>
            <div className="mt-1">
              <StarRow rating={rating} />
            </div>
          </div>
        </div>

        {websiteUrl && (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit client website"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-[#35D6B0]/50 hover:text-[#35D6B0]"
          >
            <ExternalLink size={15} />
          </a>
        )}
      </div>

      <p className="mt-5 leading-7 text-[#A8B0D0]">{quote}</p>
      <p className="mt-3 text-xs text-white/40">{role}</p>
    </div>
  );
}

function Testimonials() {
  const { t, language } = useLanguage();
  const { testimonials, loading } = useTestimonials();

  if (loading || testimonials.length === 0) return null;

  return (
    <section className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <p className="mb-10 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">
          {t.testimonials.label}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote[language]}
              author={item.author}
              role={item.role[language]}
              rating={item.rating ?? 5}
              photoUrl={item.photoUrl}
              websiteUrl={item.websiteUrl}
              offset={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;