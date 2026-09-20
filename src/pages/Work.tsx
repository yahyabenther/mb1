import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { WhatsAppIcon, getWhatsAppUrl } from "../components/WhatsAppButton";
import { useProjects } from "../hooks/useProjects";
import { iconMap } from "../lib/iconMap";
import { useLanguage } from "../i18n/LanguageContext";

function Work() {
  const { t, language } = useLanguage();
  const { projects, loading } = useProjects();

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative pb-20 pt-40 lg:pt-48">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">{t.work.label}</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            {t.work.headingA}
            <span className="text-[#A8B0D0]"> {t.work.headingB}</span>
          </h1>

          {loading && <p className="mt-16 text-white/40">Loading…</p>}

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {projects.map((project) => {
              const Icon = iconMap[project.iconKey];
              const openLiveSite = () => window.open(project.liveUrl, "_blank", "noopener,noreferrer");

              return (
                <article
                  key={project.id}
                  role="link"
                  tabIndex={0}
                  aria-label={project.title[language]}
                  onClick={openLiveSite}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openLiveSite(); }}
                  className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05] focus-visible:outline-2 focus-visible:outline-[#35D6B0]"
                >
                  <div className={`relative h-56 overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                    {project.images[0] && (
                      <img src={project.images[0]} alt={project.title[language]} className="absolute inset-0 h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]" />
                    )}
                    <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
                      <Icon size={20} className="text-white" />
                    </div>
                    <span className="absolute bottom-4 right-5 font-display text-6xl font-semibold text-white/10">{project.number}</span>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-8">
                    <div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60">{project.category[language]}</span>
                      <h3 className="mt-4 text-2xl font-semibold tracking-tight">{project.title[language]}</h3>
                      <p className="mt-3 leading-6 text-[#A8B0D0]">{project.description[language]}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((technology) => (
                          <span key={technology} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white/60">{technology}</span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      <Link to={`/work/${project.slug}`} onClick={(e) => e.stopPropagation()} className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#35D6B0] px-5 py-3 text-sm font-semibold text-[#080B2A] transition hover:bg-[#4DE4C0]">
                        {t.work.caseStudy}
                        <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1 rtl:rotate-180" />
                      </Link>
                      <a
                        href={getWhatsAppUrl(
                          language,
                          language === "ar"
                            ? `مرحبًا YB Dev! أرغب في التحدث عن مشروع مثل "${project.title.ar}".`
                            : `Hi YB Dev! I'd like to talk about a project like "${project.title.en}".`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        aria-label="WhatsApp"
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-[#25D366] hover:text-[#25D366]"
                      >
                        <WhatsAppIcon size={18} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default Work;