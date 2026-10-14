"use client";

import { useLanguage } from "@/components/language-provider";
import { langNames } from "@/lib/i18n";
import type { Lang } from "@/lib/hotels/types";

const LANGS: Lang[] = ["fr", "en", "es"];

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage();
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
          </div>
        </div>
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
            <a className="button button-cream" href="#hotels">
              {t("navHotels")}
            </a>
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
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a className="brand brand-footer" href="#top">
              <span className="brand-word">
                CUBA<span>RESORT</span>
                <small>.CA</small>
              </span>
            </a>
            <p>{t("footerBlurb")}</p>
          </div>
          <div>
            <h3>{t("footerDiscover")}</h3>
            <a href="#hotels">{t("navHotels")}</a>
            <a href="#questions">{t("navFaq")}</a>
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
