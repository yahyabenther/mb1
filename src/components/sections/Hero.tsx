import { ArrowRight } from "lucide-react";
import hero from "../../assets/hero.png";
import { WhatsAppIcon, getWhatsAppUrl } from "../WhatsAppButton";
import { useLanguage } from "../../i18n/LanguageContext";

function Hero() {
const { t, language } = useLanguage();
  return (
    <section className="relative min-h-screen overflow-hidden pb-20 pt-40 lg:pt-48">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative z-10">
            <p className="text-sm text-white/40">{t.hero.est}</p>

            <h1 className="font-display -mt-1 text-[13vw] font-bold leading-[0.85] tracking-tight sm:text-7xl lg:text-8xl">
              {t.hero.titleLine1}
            </h1>
            <h1 className="font-display text-[13vw] font-bold leading-[0.85] tracking-tight text-[#35D6B0] sm:text-7xl lg:text-8xl">
              {t.hero.titleLine2}
            </h1>

            <p className="mt-4 text-sm text-white/40">{t.hero.remoteStudio}</p>

            <div className="mt-8 max-w-md">
              <p className="text-base font-semibold uppercase tracking-tight sm:text-lg">
                {t.hero.tagline}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#A8B0D0]">
                {t.hero.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-[#35D6B0] px-7 py-3.5 text-sm font-semibold text-[#080B2A] transition hover:bg-[#4DE4C0]"
              >
                {t.hero.startProject}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
                />
              </a>

              <a
  href={getWhatsAppUrl(language)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-[#25D366] hover:text-[#25D366]"
              >
                <WhatsAppIcon size={18} />
                {t.hero.whatsapp}
              </a>
            </div>
          </div>

          <div className="relative z-0 h-[260px] sm:h-[360px] lg:h-[480px]">
            <img
              src={hero}
              alt="YB Dev product mockup across laptop, tablet and phone"
              className="pointer-events-none h-full w-full select-none object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;