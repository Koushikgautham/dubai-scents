import { brand } from "@/config/brand";

/** Floating click-to-chat. Hidden until a WhatsApp number is set in brand config. */
export function WhatsAppButton() {
  if (!brand.whatsapp) return null;
  const href = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`Hi ${brand.name}, I'd like to know more.`)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 flex h-12 items-center gap-2 rounded-full bg-sand px-4 text-[14px] font-medium text-ink shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] transition-transform hover:-translate-y-0.5"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.66 15l-1.3 4.74 4.86-1.27A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-2.88.75.77-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.86 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.2 3.7c1.56.68 2.18.73 2.96.62a2.53 2.53 0 0 0 1.66-1.17 2.06 2.06 0 0 0 .14-1.17c-.06-.1-.22-.16-.46-.28Z"/></svg>
      Chat
    </a>
  );
}
