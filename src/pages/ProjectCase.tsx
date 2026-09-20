import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/sections/Footer";
import { useProject } from "../hooks/useProject";
import { iconMap } from "../lib/iconMap";
import { useLanguage } from "../i18n/LanguageContext";

function ProjectCase() {
  const { slug } = useParams();
  const { t, language } = useLanguage();
  const { project, loading } = useProject(slug);
  const [activeImage, setActiveImage] = useState(0);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-white/40">Loading…</div>;
  }
  if (!project) return <Navigate to="/" replace />;

  const Icon = iconMap[project.iconKey];
  const images = project.images;

  const goPrev = () => setActiveImage((i) => (i === 0 ? images.length - 1 : i - 1));
  const goNext = () => setActiveImage((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="relative pt-40 pb-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Link to="/work" className="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white">
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t.projectCase.backToWork}
          </Link>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-[#35D6B0]">{project.category[language]}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{project.title[language]}</h1>
        </div>
      </section>

      <section className="relative px-6 lg:px-8">
        <div className="relative mx-auto max-w-4xl">
          <div className={`relative flex h-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br sm:h-[420px] ${project.gradient}`}>
            {images.map((img, index) => (
              <img
                key={img}
                src={img}
                alt={`${project.title[language]} ${index + 1}`}
                className={`absolute inset-0 h-full w-full object-contain p-8 transition-opacity duration-500 ${index === activeImage ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="pointer-events-none absolute left-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
              <Icon size={26} className="text-white" />
            </div>
            <span className="pointer-events-none absolute bottom-4 right-6 font-display text-8xl font-semibold text-white/10">{project.number}</span>

            {images.length > 1 && (
              <>
                <button onClick={goPrev} aria-label="Previous" className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goNext} aria-label="Next" className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition hover:bg-black/50">
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="mt-5 flex justify-center gap-2">
              {images.map((img, index) => (
                <button key={img} onClick={() => setActiveImage(index)} aria-label={`Show ${index + 1}`} className={`h-2 rounded-full transition-all ${index === activeImage ? "w-6 bg-[#35D6B0]" : "w-2 bg-white/20 hover:bg-white/40"}`} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/50">{t.projectCase.brief}</h2>
            <p className="mt-4 leading-7 text-[#A8B0D0]">{project.brief[language]}</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-white/50">{t.projectCase.approach}</h2>
            <p className="mt-4 leading-7 text-[#A8B0D0]">{project.approach[language]}</p>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          {project.results.map((result) => (
            <div key={result.label.en}>
              <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{result.value}</p>
              <p className="mt-2 text-sm leading-6 text-[#A8B0D0]">{result.label[language]}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span key={technology} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60">{technology}</span>
          ))}
        </div>

        <div className="mt-20 text-center">
          <a href="/#contact" className="group inline-flex items-center gap-3 rounded-xl bg-[#35D6B0] px-7 py-4 font-semibold text-[#080B2A] transition hover:bg-[#4DE4C0]">
            {t.projectCase.startSimilar}
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1 rtl:rotate-180" />
          </a>
        </div>
      </section>
      <Footer />
    </main>
  );
}

export default ProjectCase;