import { HotelDirectory } from "@/components/hotel-directory";
import { LanguageProvider } from "@/components/language-provider";
import { SiteFaq, SiteFooter, SiteHeader, SiteHero } from "@/components/site-chrome";

export default function HomePage() {
  return (
    <LanguageProvider>
      <SiteHeader />
      <main id="main">
        <SiteHero />
        <HotelDirectory />
        <SiteFaq />
      </main>
      <SiteFooter />
    </LanguageProvider>
  );
}
