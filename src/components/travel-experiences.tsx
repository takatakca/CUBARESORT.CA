"use client";

/* Restores the nine editorial ideas, destination/style discovery, URL filters,
   and on-device favourites from the static site during the Next.js migration.
   No booking, price, availability, analytics or server-side personal data. */
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { useTravelUi } from "@/components/travel-ui";
import { destinations, experiences, imageUrl, styles, type StyleId } from "@/lib/hotels/catalog";
import type { CopyKey } from "@/lib/i18n";

const STORAGE_KEY = "cubaresort.preferences.v1";
const knownIds = new Set(experiences.map((item) => item.id));
const destinationIds = new Set(destinations.map((item) => item.id));
const styleLabels: Record<StyleId, CopyKey> = {
  beach: "styleBeach",
  family: "styleFamily",
  romance: "styleRomance",
  culture: "styleCulture",
  nature: "styleNature",
};
type Filters = { destination: string; style: string; query: string; sort: "featured" | "az" };
const emptyFilters: Filters = { destination: "all", style: "all", query: "", sort: "featured" };
const fold = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();

function saveFavorites(favorites: Set<string>) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    const base = parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...base, favorites: [...favorites] }));
  } catch {
    // Private browsing and disabled storage are supported.
  }
}

export function TravelExperiences() {
  const { lang, t } = useLanguage();
  const { openInquiry } = useTravelUi();
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const destination = params.get("destination") ?? "all";
    const style = params.get("style") ?? "all";
    setFilters({
      destination: destinationIds.has(destination) ? destination : "all",
      style: styles.some((item) => item === style) ? style : "all",
      query: (params.get("q") ?? "").slice(0, 100),
      sort: "featured",
    });
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const stored: unknown = raw ? JSON.parse(raw) : {};
      if (stored && typeof stored === "object" && "favorites" in stored) {
        const list = (stored as { favorites?: unknown }).favorites;
        if (Array.isArray(list)) {
          setFavorites(new Set(list.filter((id): id is string => typeof id === "string" && knownIds.has(id))));
        }
      }
    } catch {
      // Storage is optional.
    }
  }, []);

  function apply(next: Filters) {
    setFilters(next);
    const url = new URL(window.location.href);
    for (const key of ["destination", "style", "q"]) url.searchParams.delete(key);
    if (next.destination !== "all") url.searchParams.set("destination", next.destination);
    if (next.style !== "all") url.searchParams.set("style", next.style);
    if (next.query.trim()) url.searchParams.set("q", next.query.trim());
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }

  function toggleFavorite(id: string) {
    if (!knownIds.has(id)) return;
    const next = new Set(favorites);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setFavorites(next);
    saveFavorites(next);
  }

  const visible = useMemo(() => {
    const query = fold(filters.query.trim());
    const results = experiences.filter((item) => {
      if (filters.destination !== "all" && filters.destination !== item.destination) return false;
      if (filters.style !== "all" && filters.style !== item.style) return false;
      if (!query) return true;
      const destination = destinations.find((d) => d.id === item.destination)?.name ?? "";
      return fold([item.name[lang], item.summary[lang], destination, t(styleLabels[item.style])].join(" ")).includes(query);
    });
    if (filters.sort === "az") results.sort((a, b) => a.name[lang].localeCompare(b.name[lang], lang));
    return results;
  }, [filters, lang, t]);

  return (
    <>
      <div className="search-panel-wrap">
        <div className="container">
          <form className="search-panel" onSubmit={(event) => {
            event.preventDefault();
            document.getElementById("experiences")?.scrollIntoView({
              // Honour the OS reduced-motion setting, as the static build did.
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
              block: "start",
            });
          }}>
            <div className="search-intro">
              <span className="search-symbol" aria-hidden="true">☀</span>
              <div><strong>{t("searchTitle")}</strong><small>{t("searchSubtitle")}</small></div>
            </div>
            <label className="field">
              <span>{t("labelDestination")}</span>
              <select value={filters.destination} onChange={(event) => apply({ ...filters, destination: event.target.value })}>
                <option value="all">{t("allDestinations")}</option>
                {destinations.map((d) => <option value={d.id} key={d.id}>{d.name}</option>)}
              </select>
            </label>
            <label className="field">
              <span>{t("labelStyle")}</span>
              <select value={filters.style} onChange={(event) => apply({ ...filters, style: event.target.value })}>
                <option value="all">{t("allStyles")}</option>
                {styles.map((style) => <option key={style} value={style}>{t(styleLabels[style])}</option>)}
              </select>
            </label>
            <button className="button button-coral search-button" type="submit">{t("searchButton")}</button>
          </form>
        </div>
      </div>

      <section className="section" id="destinations" aria-labelledby="destinations-title">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">{t("destEyebrow")}</p>
              <h2 id="destinations-title" dangerouslySetInnerHTML={{ __html: t("destTitle") }} />
            </div>
            <p className="section-head-description">{t("destIntro")}</p>
          </div>
          <div className="destination-grid">
            {destinations.slice(0, 3).map((d) => (
              <a
                key={d.id}
                href="#experiences"
                className="destination-card"
                aria-label={d.name + " — " + t("ctaExplore")}
                onClick={() => apply({ ...emptyFilters, destination: d.id })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="destination-photo" src={imageUrl(d.image, 1000)} alt={t("destinationPhotoAlt")} loading="lazy" decoding="async" />
                <div className="destination-content">
                  <div><p>{d.text[lang]}</p><h3>{d.name}</h3></div>
                  <span className="destination-arrow" aria-hidden="true">↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section experiences-section" id="experiences" aria-labelledby="experiences-title">
        <div className="container">
          <div className="section-head experiences-head">
            <div>
              <p className="eyebrow">{t("staysEyebrow")}</p>
              <h2 id="experiences-title" dangerouslySetInnerHTML={{ __html: t("staysTitle") }} />
            </div>
            <p className="section-head-description">{t("staysIntro")}</p>
          </div>
          <div className="results-tools">
            <span className="results-count" role="status" aria-live="polite">
              {visible.length} {t(visible.length === 1 ? "result" : "results")}
            </span>
            <label className="text-search">
              <span aria-hidden="true">⌕</span>
              <span className="visually-hidden">{t("textSearchLabel")}</span>
              <input
                type="search"
                value={filters.query}
                maxLength={100}
                placeholder={t("textSearchPlaceholder")}
                onChange={(event) => apply({ ...filters, query: event.target.value.slice(0, 100) })}
              />
            </label>
            <label className="sort-wrap">
              <span className="visually-hidden">{t("sortLabel")}</span>
              <select value={filters.sort} onChange={(event) => apply({ ...filters, sort: event.target.value === "az" ? "az" : "featured" })}>
                <option value="featured">{t("sortFeatured")}</option>
                <option value="az">{t("sortAz")}</option>
              </select>
            </label>
            <button type="button" className="filter-reset" onClick={() => apply(emptyFilters)}>{t("resetFilters")}</button>
          </div>
          <div className="experience-grid">
            {visible.map((item) => {
              const selected = favorites.has(item.id);
              const destination = destinations.find((d) => d.id === item.destination)?.name ?? "";
              return (
                <article className="experience-card" key={item.id}>
                  <div className="experience-photo-wrap">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="experience-photo" src={imageUrl(item.image, 900)} alt={t("photoAlt")} loading="lazy" decoding="async" />
                    <span className="card-tag">{t(styleLabels[item.style])}</span>
                    <button
                      type="button"
                      className="favorite-button"
                      aria-label={t(selected ? "unfavorite" : "favorite")}
                      aria-pressed={selected}
                      onClick={() => toggleFavorite(item.id)}
                    >{selected ? "♥" : "♡"}</button>
                  </div>
                  <div className="experience-body">
                    <p className="experience-location">{destination}</p>
                    <h3>{item.name[lang]}</h3>
                    <p>{item.summary[lang]}</p>
                  </div>
                  <div className="card-footer">
                    <span>{t("inspiration")}</span>
                    <button type="button" onClick={() => openInquiry(item.destination)}>{t("inquiry")}</button>
                  </div>
                </article>
              );
            })}
          </div>
          {visible.length === 0 && (
            <div className="empty-state">
              <h3>{t("emptyTitle")}</h3>
              <p>{t("emptyDescription")}</p>
              <button type="button" className="button button-dark" onClick={() => apply(emptyFilters)}>{t("resetFilters")}</button>
            </div>
          )}
          <p className="inventory-note">{t("inventoryNotice")}</p>
        </div>
      </section>
    </>
  );
}
