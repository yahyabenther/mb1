import { ArrowUpRight, Globe, Smartphone, Monitor } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const serviceMeta = [
  { number: "01", slug: "web-development", icon: Globe, accent: "text-[#38BDF8]", ring: "ring-[#38BDF8]/30" },
  { number: "02", slug: "mobile-apps", icon: Smartphone, accent: "text-[#35D6B0]", ring: "ring-[#35D6B0]/30" },
  { number: "03", slug: "desktop-software", icon: Monitor, accent: "text-[#8B7CFF]", ring: "ring-[#8B7CFF]/30" },
] as const;

function Services() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">
            {t.services.label}
          </p>
          <h2 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {t.services.headingA}
            <span className="text-[#A8B0D0]"> {t.services.headingB}</span>
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-y border-white/10">
          {serviceMeta.map((meta) => {
            const Icon = meta.icon;
            const item = t.services.items[meta.slug];
            return (
              <div
                key={meta.number}
                className="group grid gap-6 py-10 transition hover:bg-white/[0.02] sm:grid-cols-[80px_60px_1fr_auto] sm:items-center sm:gap-8 sm:px-4"
              >
                <span className="font-display text-sm text-white/30">
                  {meta.number}
                </span>

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 ring-1 ${meta.ring}`}>
                  <Icon size={22} className={meta.accent} />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xl leading-7 text-[#A8B0D0]">
                    {item.description}
                  </p>
                </div>

                <Link
                  to={`/pricing/${meta.slug}`}
                  className="group/btn inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white hover:bg-white hover:text-[#080B2A]"
                >
                  {t.services.viewPricing}
                  <ArrowUpRight
                    size={16}
                    className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 rtl:-scale-x-100"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;