// Single source of truth for brand identity and contact details.
// The working name is a placeholder: swap `name` once the final name is chosen
// (see docs/brand-naming.md) before sharing the site with buyers.
export const brand = {
  name: "Dubai Scents",
  isWorkingName: true,
  tagline: "Alcohol-free perfume oils",
  city: "Chennai, India",
  email: "hello@example.com", // TODO: replace with the real inbox once the domain exists
  // WhatsApp click-to-chat number in international format without "+" (e.g. "919876543210").
  whatsapp: "",
  instagram: "",
  originLine: "Fragrance oils from UAE manufacturers, bottled in India",
} as const;

export const nav = [
  { href: "/collection", label: "Collection" },
  { href: "/collection#library", label: "Oil Library" },
  { href: "/business", label: "For Business" },
  { href: "/contact", label: "Contact" },
] as const;
