import { ProductStage } from "@/components/home/ProductStage";
import { NotesJourney } from "@/components/home/NotesJourney";
import { LibraryTeaser } from "@/components/home/LibraryTeaser";
import { WearReveal } from "@/components/home/WearReveal";
import { BusinessBand } from "@/components/home/BusinessBand";
import { WaitlistCTA } from "@/components/home/WaitlistCTA";

export default function Home() {
  return (
    <>
      <ProductStage />
      <NotesJourney />
      <LibraryTeaser />
      <WearReveal />
      <BusinessBand />
      <WaitlistCTA />
    </>
  );
}
