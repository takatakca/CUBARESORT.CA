import "./parity.css";
import { HotelDirectory } from "@/components/hotel-directory";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFaq, SiteFooter, SiteHeader, SiteHero } from "@/components/site-chrome";
import { TravelExperiences } from "@/components/travel-experiences";
import { TravelUiProvider } from "@/components/travel-ui";

export default function HomePage() {
  return (
    <LanguageProvider>
      <TravelUiProvider>
        <SiteHeader />
        <main id="main">
          <SiteHero />
          <TravelExperiences />
          <HotelDirectory />
          <SiteFaq />
        </main>
        <SiteFooter />
      </TravelUiProvider>
    </LanguageProvider>
  );
}
