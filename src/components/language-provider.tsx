"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { copy, isLang, translation, type CopyKey } from "@/lib/i18n";
import type { Lang } from "@/lib/hotels/types";

const STORAGE_KEY = "cubaresort.preferences.v1";

interface LanguageValue {
  lang: Lang;
  setLang: (next: Lang) => void;
  t: <K extends CopyKey>(key: K) => (typeof copy)["fr"][K];
}

const LanguageContext = createContext<LanguageValue | null>(null);

function readStoredLang(): Lang | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    const value = (parsed as { lang?: unknown } | null)?.lang;
    return typeof value === "string" && isLang(value) ? value : null;
  } catch {
    // Private browsing or blocked storage: fall back to the default language.
    return null;
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Always start at "fr" so the server and the first client render agree.
  // The stored or URL language is applied in an effect, after hydration.
  const [lang, setLangState] = useState<Lang>("fr");

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("lang");
    const next = (isLang(fromUrl) ? fromUrl : null) ?? readStoredLang();
    if (next && next !== "fr") setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : {};
      const base = typeof parsed === "object" && parsed !== null ? parsed : {};
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...base, lang: next }));
    } catch {
      // Storage is a convenience here; the language still applies for this visit.
    }
    const url = new URL(window.location.href);
    if (next === "fr") url.searchParams.delete("lang");
    else url.searchParams.set("lang", next);
    window.history.replaceState(null, "", url.pathname + url.search + url.hash);
  }, []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, setLang, t: (key) => translation(lang, key) }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
