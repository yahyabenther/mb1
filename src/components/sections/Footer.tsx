import { Mail } from "lucide-react";
import { useLanguage } from "../../i18n/LanguageContext";

function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.7-1.28-1.7-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.7 5.4-5.27 5.69.41.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.66.79.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21h-4V9Z" />
    </svg>
  );
}

function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative border-t border-white/10 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="text-lg font-semibold tracking-tight">YB Dev</span>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#A8B0D0]">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/80">{t.footer.explore}</h4>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[#A8B0D0]">
              <a href="/#services" className="transition hover:text-white">{t.nav.services}</a>
              <a href="/#process" className="transition hover:text-white">{t.footer.process}</a>
              <a href="/#projects" className="transition hover:text-white">{t.nav.projects}</a>
              <a href="/#about" className="transition hover:text-white">{t.nav.about}</a>
            </div>
          </div>

       

          <div>
            <h4 className="text-sm font-semibold text-white/80">{t.footer.follow}</h4>
            <div className="mt-4 flex gap-4">
    <a  
  href="https://github.com/yahyabenther"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="GitHub"
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:text-white"
>
  <GithubIcon />
</a>
<a
  href="https://www.linkedin.com/in/yahya-bentaher-829a24281/"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="LinkedIn"
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:text-white"
>
  <LinkedinIcon />
</a>
<a
  href="mailto:yahyabotta@gmail.com"
  aria-label="Email"
  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition hover:text-white"
>
  <Mail size={18} />
</a>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-white/40">
          © {new Date().getFullYear()} YB Dev. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

export default Footer;