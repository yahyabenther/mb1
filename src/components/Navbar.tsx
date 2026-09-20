import { ArrowUpRight, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import logo from "../assets/logo.png";
import { useLanguage } from "../i18n/LanguageContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();

  return (
    <header className="absolute top-0 left-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="YB Dev" className="h-16 w-16 object-contain" />
          <span className="text-lg font-semibold tracking-tight">
            YB Dev
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <a href="/#services" className="text-sm text-white/70 transition hover:text-white">
            {t.nav.services}
          </a>
          <a href="/#projects" className="text-sm text-white/70 transition hover:text-white">
            {t.nav.projects}
          </a>
          <a href="/#about" className="text-sm text-white/70 transition hover:text-white">
            {t.nav.about}
          </a>
          <a href="/#contact" className="text-sm text-white/70 transition hover:text-white">
            {t.nav.contact}
          </a>

          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-medium text-white/70 transition hover:border-white hover:text-white"
          >
            <Globe size={14} />
            {language === "en" ? "العربية" : "English"}
          </button>

          <a
            href="/#contact"
            className="group flex items-center gap-2 rounded-xl border border-white/30 px-5 py-2.5 text-sm font-medium transition hover:border-white hover:bg-white hover:text-[#080B2A]"
          >
            {t.nav.startProject}
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Mobile: language toggle + menu button, side by side */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <Globe size={20} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="mx-4 rounded-2xl border border-white/10 bg-[#10164A]/95 p-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-5">
            <a href="/#services" onClick={() => setIsOpen(false)}>
              {t.nav.services}
            </a>
            <a href="/#projects" onClick={() => setIsOpen(false)}>
              {t.nav.projects}
            </a>
            <a href="/#about" onClick={() => setIsOpen(false)}>
              {t.nav.about}
            </a>
            <a href="/#contact" onClick={() => setIsOpen(false)}>
              {t.nav.contact}
            </a>

            <a
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="rounded-xl bg-[#35D6B0] px-5 py-3 text-center font-semibold text-[#080B2A]"
            >
              {t.nav.startProject}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;