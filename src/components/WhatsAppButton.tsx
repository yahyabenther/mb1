import type { Language } from "../i18n/translations";
import { useLanguage } from "../i18n/LanguageContext";

export const WHATSAPP_NUMBER = "21623049860"; // TODO: replace with your real WhatsApp number (country code + number, digits only)

const DEFAULT_MESSAGES: Record<Language, string> = {
  en: "Hi YB Dev! I'd like to talk about a project.",
  ar: "مرحبًا YB Dev! أرغب في التحدث عن مشروع.",
};

export function getWhatsAppUrl(language: Language, customMessage?: string) {
  const message = customMessage ?? DEFAULT_MESSAGES[language];
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppIcon({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.38c-.29-.15-1.72-.85-1.99-.95-.27-.1-.46-.15-.66.15-.2.29-.76.95-.93 1.14-.17.2-.34.22-.63.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.44-1.71-1.61-2-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.29-.49.1-.2.05-.37-.02-.51-.07-.15-.66-1.59-.91-2.18-.24-.57-.48-.5-.66-.51h-.56c-.2 0-.51.07-.78.37-.27.29-1.02 1-1.02 2.43s1.05 2.82 1.19 3.01c.15.2 2.06 3.14 4.99 4.41.7.3 1.24.48 1.67.61.7.22 1.34.19 1.84.12.56-.08 1.72-.7 1.97-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.2-.55-.34ZM12.02 22h-.01c-1.85 0-3.66-.5-5.24-1.44l-.38-.22-3.9 1.02 1.04-3.8-.24-.39A9.86 9.86 0 0 1 2.06 12 9.94 9.94 0 0 1 12.02 2.02c2.66 0 5.16 1.04 7.04 2.92A9.87 9.87 0 0 1 22 12.03 9.94 9.94 0 0 1 12.02 22Zm8.47-18.5A11.94 11.94 0 0 0 12.02 0 11.98 11.98 0 0 0 .06 12c0 2.11.55 4.17 1.6 5.98L0 24l6.19-1.62A11.97 11.97 0 0 0 12.02 24 11.98 11.98 0 0 0 24 12.03c0-3.2-1.25-6.21-3.51-8.53Z" />
    </svg>
  );
}

function WhatsAppButton() {
  const { language } = useLanguage();

  return (
    <a
      href={getWhatsAppUrl(language)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a]"
    >
      <WhatsAppIcon />
    </a>
  );
}

export default WhatsAppButton;