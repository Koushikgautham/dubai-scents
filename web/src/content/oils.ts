// Placeholder range until the founders choose the real oils (after the December sourcing trip).
// Describe scents by profile only: never designer names or "type" references.

export type Oil = {
  code: string;
  name: string;
  words: [string, string, string];
  top: string;
  heart: string;
  base: string;
  mood: string;
};

export const library: Oil[] = [
  { code: "OL-01", name: "Ember", words: ["saffron", "amber", "smoke"], top: "Saffron, pink pepper", heart: "Rose, cinnamon bark", base: "Amber, soft smoke", mood: "Evening warmth" },
  { code: "OL-02", name: "Petal", words: ["rose", "pink pepper", "musk"], top: "Pink pepper, lychee", heart: "Damask-style rose", base: "Clean white musk", mood: "Bright and close" },
  { code: "OL-03", name: "Dune", words: ["sandalwood", "cream", "warm skin"], top: "Cardamom", heart: "Creamy sandalwood", base: "Musk, tonka", mood: "Quiet comfort" },
  { code: "OL-04", name: "Tide", words: ["bergamot", "sea salt", "woods"], top: "Bergamot, mandarin", heart: "Sea salt, sage", base: "Driftwood, vetiver", mood: "Fresh daytime" },
  { code: "OL-05", name: "Resin", words: ["labdanum", "vanilla", "benzoin"], top: "Bitter orange", heart: "Labdanum", base: "Vanilla, benzoin", mood: "Golden and soft" },
  { code: "OL-06", name: "Night", words: ["oud accord", "leather", "incense"], top: "Black pepper", heart: "Incense, leather", base: "Oud accord, patchouli", mood: "Deep and dark" },
];

export const heroProfiles = [
  { code: "RO-I", name: "Ember", line: "Saffron and rose over warm amber.", oil: library[0] },
  { code: "RO-II", name: "Dune", line: "Creamy sandalwood that settles like warm skin.", oil: library[2] },
  { code: "RO-III", name: "Night", line: "Incense and leather on a dark oud accord.", oil: library[5] },
] as const;

export const notesJourney = [
  { step: "01", label: "Top", title: "Saffron", text: "Bright, warm and a little leathery: the first impression, in the opening minutes.", tone: "from-[#5c1e0a] via-[#b45f16] to-[#e3a046]" },
  { step: "02", label: "Heart", title: "Rose", text: "A deep, spiced rose that opens as the oil warms on your skin.", tone: "from-[#3e1119] via-[#8f3a44] to-[#cf8d74]" },
  { step: "03", label: "Base", title: "Oud accord & amber", text: "Dry woods and resin that stay close to the skin, long after the first drop.", tone: "from-[#1b120b] via-[#4a2f18] to-[#8c6233]" },
] as const;
