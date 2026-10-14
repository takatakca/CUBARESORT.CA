import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cubaresort.ca"),
  title: {
    default: "CUBARESORT.CA — Cuba, à votre façon",
    template: "%s | CUBARESORT.CA",
  },
  description:
    "Répertoire des établissements cubains et idées de séjour. Site d'information : aucun tarif, aucune disponibilité en temps réel et aucune réservation en ligne.",
  // No booking, price or availability claim anywhere in metadata: the site does
  // not have an authorized supplier feed yet. See docs/PRODUCTION_CHECKLIST.md.
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fr_CA",
    alternateLocale: ["en_CA", "es_ES"],
    url: "https://cubaresort.ca",
    siteName: "CUBARESORT.CA",
    title: "CUBARESORT.CA — Cuba, à votre façon",
    description:
      "Répertoire des établissements cubains et idées de séjour. Aucun tarif ni disponibilité en temps réel.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // lang is set to fr here and updated on the client when the visitor switches
  // language, matching the behaviour of the previous static build.
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>{children}</body>
    </html>
  );
}
