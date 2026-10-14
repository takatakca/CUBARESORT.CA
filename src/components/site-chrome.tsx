"use client";

import { useLanguage } from "@/components/language-provider";
import { useTravelUi } from "@/components/travel-ui";
import { useState } from "react";
import { langNames } from "@/lib/i18n";
import type { Lang } from "@/lib/hotels/types";

const LANGS: Lang[] = ["fr", "en", "es"];

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
  const { openInquiry } = useTravelUi();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <a className="skip-link" href="#main">
        {t("skip")}
      </a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>{t("utility")}</span>
          <span className="utility-note">{t("utilityDisclaimer")}</span>
        </div>
      </div>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#top">
            <span className="brand-word">
              CUBA<span>RESORT</span>
              <small>.CA</small>
            </span>
          </a>
          <nav className="desktop-nav" aria-label={t("navDestinations")}>
            <a href="#destinations">{t("navDestinations")}</a>
            <a href="#experiences">{t("navExperiences")}</a>
            <a href="#hotels">{t("navHotels")}</a>
            <a href="#questions">{t("navFaq")}</a>
          </nav>
          <div className="header-actions">
            <div className="language-picker">
              {LANGS.map((code) => (
                <button
                  key={code}
                  type="button"
                  aria-pressed={lang === code}
                  aria-label={langNames[code]}
                  onClick={() => setLang(code)}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>
            <button type="button" className="button button-coral header-cta" onClick={() => openInquiry()}>{t("ctaPlan")}</button>
            <button type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={lang === "fr" ? "Ouvrir le menu" : lang === "es" ? "Abrir menú" : "Open menu"} onClick={() => setMenuOpen((value) => !value)}><span /><span /><span /></button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-menu" hidden={!menuOpen} aria-label={t("navDestinations")}>
          <a href="#destinations" onClick={() => setMenuOpen(false)}>{t("navDestinations")}</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>{t("navExperiences")}</a>
          <a href="#hotels" onClick={() => setMenuOpen(false)}>{t("navHotels")}</a>
          <a href="#questions" onClick={() => setMenuOpen(false)}>{t("navFaq")}</a>
          <button className="button button-coral" type="button" onClick={() => {setMenuOpen(false);openInquiry();}}>{t("ctaPlan")}</button>
        </nav>
      </header>
    </>
  );
}

export function SiteHero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="top">
      <div className="hero-image" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow eyebrow-light">{t("heroEyebrow")}</p>
          <h1 dangerouslySetInnerHTML={{ __html: t("heroTitle") }} />
          <p className="hero-lead">{t("heroDescription")}</p>
          <div className="hero-cta-row">
            <a className="button button-cream" href="#experiences">{t("ctaExplore")}</a>
            <a className="hero-link" href="#hotels">{t("navHotels")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFaq() {
  const { t } = useLanguage();
  const faq = t("faq") as unknown as ReadonlyArray<readonly [string, string]>;
  return (
    <section id="questions" className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow">{t("faqEyebrow")}</p>
          <h2 id="faq-title" dangerouslySetInnerHTML={{ __html: t("faqTitle") }} />
          <p className="faq-side-note">{t("faqIntro")}</p>
        </div>
        <div className="faq-list">
          {faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  const { openInquiry, openLegal } = useTravelUi();
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a className="brand brand-footer" href="#top"><span className="brand-word">CUBA<span>RESORT</span><small>.CA</small></span></a>
            <p>{t("footerBlurb")}</p>
          </div>
          <div>
            <h3>{t("footerDiscover")}</h3>
            <a href="#destinations">{t("navDestinations")}</a>
            <a href="#experiences">{t("navExperiences")}</a>
            <a href="#hotels">{t("navHotels")}</a>
          </div>
          <div>
            <h3>{t("footerHelp")}</h3>
            <a href="#questions">{t("navFaq")}</a>
            <button type="button" onClick={() => openLegal("privacy")}>{t("privacyLink")}</button>
            <button type="button" onClick={() => openLegal("terms")}>{t("termsLink")}</button>
          </div>
          <div>
            <h3>{t("footerContactTitle")}</h3>
            <p>{t("footerContactText")}</p>
            <button type="button" className="footer-contact" onClick={() => openInquiry()}>{t("ctaPlan")}</button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CUBARESORT.CA</span>
          <span>{t("footerLegal")}</span>
          <a href="#top">{t("backTop")}</a>
        </div>
      </div>
    </footer>
  );
}
