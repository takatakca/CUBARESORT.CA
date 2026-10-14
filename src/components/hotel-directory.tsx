"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { hotelRegions, isRegionId, regionLabel, searchHotels } from "@/lib/hotels";

const ALL = "all";

/**
 * The property directory: region chips, a region select and name search.
 *
 * Renders names, region and arrival airport only. It must never show a rate,
 * availability, star rating or room count — none of those exist in the data,
 * and a test fails the build if such a field is added.
 */
export function HotelDirectory() {
  const { lang, t } = useLanguage();
  const [region, setRegion] = useState<string>(ALL);
  const [query, setQuery] = useState<string>("");

  // Restore a shared link (?region=&hq=) after hydration, so the server and the
  // first client render stay identical.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlRegion = params.get("region");
    if (urlRegion && isRegionId(urlRegion)) setRegion(urlRegion);
    const urlQuery = params.get("hq");
    if (urlQuery) setQuery(urlQuery.slice(0, 100));
  }, []);

  const syncUrl = useCallback((nextRegion: string, nextQuery: string) => {
    const url = new URL(window.location.href);
    if (nextRegion === ALL) url.searchParams.delete("region");
    else url.searchParams.set("region", nextRegion);
    const trimmed = nextQuery.trim();
    if (trimmed) url.searchParams.set("hq", trimmed);
    else url.searchParams.delete("hq");
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  const applyRegion = useCallback(
    (next: string) => {
      setRegion(next);
      syncUrl(next, query);
    },
    [query, syncUrl],
  );

  const applyQuery = useCallback(
    (next: string) => {
      const capped = next.slice(0, 100);
      setQuery(capped);
      syncUrl(region, capped);
    },
    [region, syncUrl],
  );

  const reset = useCallback(() => {
    setRegion(ALL);
    setQuery("");
    syncUrl(ALL, "");
  }, [syncUrl]);

  const results = useMemo(() => searchHotels(query, region), [query, region]);
  const total = useMemo(() => hotelRegions.reduce((sum, r) => sum + r.count, 0), []);

  return (
    <section id="hotels" className="section hotels-section" aria-labelledby="hotels-title">
      <div className="container">
        <div className="section-head experiences-head">
          <div>
            <p className="eyebrow">{t("hotelsEyebrow")}</p>
            <h2 id="hotels-title" dangerouslySetInnerHTML={{ __html: t("hotelsTitle") }} />
          </div>
          <p className="section-head-description">{t("hotelsIntro")}</p>
        </div>

        <div className="results-tools">
          <div className="results-count" role="status" aria-live="polite">
            {results.length} {t(results.length === 1 ? "hotelsCountOne" : "hotelsCount")}
          </div>
          <label className="sort-wrap">
            <span className="visually-hidden">{t("hotelsRegionLabel")}</span>
            <select
              aria-label={t("hotelsRegionLabel")}
              value={region}
              onChange={(event) => applyRegion(event.target.value)}
            >
              <option value={ALL}>{`${t("hotelsAllRegions")} (${total})`}</option>
              {hotelRegions.map((item) => (
                <option key={item.id} value={item.id}>
                  {`${item.label[lang]} (${item.count})`}
                </option>
              ))}
            </select>
          </label>
          <label className="text-search">
            <span aria-hidden="true">⌕</span>
            <span className="visually-hidden">{t("hotelsSearchLabel")}</span>
            <input
              type="search"
              autoComplete="off"
              placeholder={t("hotelsSearchPlaceholder")}
              value={query}
              onChange={(event) => applyQuery(event.target.value)}
            />
          </label>
          <button className="filter-reset" type="button" onClick={reset}>
            {t("hotelsReset")}
          </button>
        </div>

        <div className="region-chips">
          <button
            type="button"
            className="region-chip"
            aria-pressed={region === ALL}
            onClick={() => applyRegion(ALL)}
          >
            {`${t("hotelsAllRegions")} (${total})`}
          </button>
          {hotelRegions.map((item) => (
            <button
              key={item.id}
              type="button"
              className="region-chip"
              aria-pressed={region === item.id}
              onClick={() => applyRegion(item.id)}
            >
              {`${item.label[lang]} (${item.count})`}
            </button>
          ))}
        </div>

        <ul className="hotel-grid">
          {results.map((hotel) => (
            <li
              key={hotel.id}
              className={hotel.confirmed ? "hotel-card" : "hotel-card hotel-card-pending"}
            >
              <div className="hotel-main">
                <h3>{hotel.name}</h3>
                <p className="hotel-meta">
                  <span className="hotel-region">{regionLabel(hotel.region, lang)}</span>
                  <span className="hotel-airport">{`${t("hotelsAirport")} ${hotel.airport}`}</span>
                </p>
              </div>
              <div className="hotel-foot">
                <span
                  className={hotel.confirmed ? "hotel-badge" : "hotel-badge hotel-badge-pending"}
                >
                  {t(hotel.confirmed ? "hotelsConfirmed" : "hotelsPending")}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {results.length === 0 ? (
          <div className="empty-state">
            <span aria-hidden="true">☀</span>
            <h3>{t("hotelsEmpty")}</h3>
            <button className="button button-dark" type="button" onClick={reset}>
              {t("hotelsReset")}
            </button>
          </div>
        ) : null}

        <p className="inventory-note">{t("hotelsNotice")}</p>
      </div>
    </section>
  );
}
