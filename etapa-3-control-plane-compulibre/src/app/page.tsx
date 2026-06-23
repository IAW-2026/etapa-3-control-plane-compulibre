import { LandingHeader } from "@/app/ui/landing/landing-header";
import { LandingHero } from "@/app/ui/landing/landing-hero";

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-white">
      <LandingHeader />
      <LandingHero />
    </main>
  );
}
