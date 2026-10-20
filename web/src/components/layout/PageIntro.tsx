import { Reveal, SplitText } from "@/components/motion/Reveal";

export function PageIntro({ label, title, intro, italic = [] }: { label: string; title: string; intro?: string; italic?: number[] }) {
  return (
    <section className="relative overflow-hidden bg-night pb-20 pt-40 md:pb-28 md:pt-48">
      <div className="absolute inset-0 bg-[radial-gradient(45%_60%_at_80%_0%,rgba(199,122,26,0.22),transparent_70%)]" />
      <div className="wrap relative">
        <Reveal on="load">
          <p className="label text-gold">{label}</p>
        </Reveal>
        <SplitText as="h1" on="load" delay={0.15} text={title} italic={italic} className="display mt-5 max-w-[16ch] text-[clamp(52px,8vw,128px)] text-sand" />
        {intro ? (
          <Reveal on="load" delay={0.6}>
            <p className="mt-8 max-w-[52ch] text-[19px] text-dune">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
