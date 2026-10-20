import { SplitText } from "@/components/motion/Reveal";
import { WaitlistForm } from "@/components/forms/WaitlistForm";

export function WaitlistCTA() {
  return (
    <section id="waitlist" aria-labelledby="waitlist-heading" className="relative overflow-hidden bg-umber py-32 md:py-44">
      <div className="absolute inset-0 bg-[radial-gradient(50%_70%_at_50%_100%,rgba(199,122,26,0.22),transparent_70%)]" />
      <div className="wrap relative flex flex-col items-center text-center">
        <p className="label text-gold">Waitlist</p>
        <SplitText as="h2" id="waitlist-heading" text="Be first to smell it." italic={[3]} className="display mt-5 text-[clamp(52px,8vw,128px)] text-sand" />
        <p className="mb-10 mt-6 max-w-[40ch] text-dune">One email when we launch, and early access to the Oil Library.</p>
        <WaitlistForm source="home" />
      </div>
    </section>
  );
}
