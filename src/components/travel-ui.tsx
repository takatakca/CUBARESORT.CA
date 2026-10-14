"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { destinations } from "@/lib/hotels/catalog";

type LegalPage = "privacy" | "terms";
type Request = { destination: string } | null;
type TravelUi = {
  openInquiry: (destination?: string) => void;
  openLegal: (page: LegalPage) => void;
};

const TravelContext = createContext<TravelUi | null>(null);
const validDestinations = new Set(destinations.map((destination) => destination.id));

export function TravelUiProvider({ children }: { children: React.ReactNode }) {
  const [request, setRequest] = useState<Request>(null);
  const [legal, setLegal] = useState<LegalPage | null>(null);
  const openInquiry = useCallback((destination = "all") => {
    setLegal(null);
    setRequest({ destination: validDestinations.has(destination) ? destination : "all" });
  }, []);
  const openLegal = useCallback((page: LegalPage) => {
    setRequest(null);
    setLegal(page);
  }, []);
  return (
    <TravelContext.Provider value={{ openInquiry, openLegal }}>
      {children}
      <TravelDialogs
        request={request}
        closeRequest={() => setRequest(null)}
        legal={legal}
        closeLegal={() => setLegal(null)}
      />
    </TravelContext.Provider>
  );
}

export function useTravelUi(): TravelUi {
  const value = useContext(TravelContext);
  if (!value) throw new Error("Travel UI must be inside TravelUiProvider");
  return value;
}

function TravelDialogs({
  request, closeRequest, legal, closeLegal,
}: {
  request: Request;
  closeRequest: () => void;
  legal: LegalPage | null;
  closeLegal: () => void;
}) {
  const { lang, t } = useLanguage();
  const requestRef = useRef<HTMLDialogElement>(null);
  const legalRef = useRef<HTMLDialogElement>(null);
  const [destination, setDestination] = useState("all");
  const [month, setMonth] = useState("");
  const [minMonth, setMinMonth] = useState("");
  const [travellers, setTravellers] = useState("2");
  const [duration, setDuration] = useState("flexible");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [manualCopy, setManualCopy] = useState("");

  useEffect(() => {
    const today = new Date();
    setMinMonth(today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0"));
  }, []);
  useEffect(() => {
    const dialog = requestRef.current;
    if (!dialog) return;
    if (request && !dialog.open) dialog.showModal();
    else if (!request && dialog.open) dialog.close();
  }, [request]);
  useEffect(() => {
    const dialog = legalRef.current;
    if (!dialog) return;
    if (legal && !dialog.open) dialog.showModal();
    else if (!legal && dialog.open) dialog.close();
  }, [legal]);
  useEffect(() => {
    if (!request) return;
    setDestination(request.destination);
    setStatus("");
    setManualCopy("");
  }, [request]);

  const makeDraft = () => {
    const count = Number(travellers);
    if (!Number.isInteger(count) || count < 1 || count > 30 || !["all", ...validDestinations].includes(destination)) return null;
    const place = destinations.find((item) => item.id === destination)?.name ?? t("allInquiryDestinations");
    const nights = lang === "fr" ? "nuits" : lang === "es" ? "noches" : "nights";
    return [
      "CUBARESORT.CA — " + t("dialogTitle"),
      t("formDestination") + ": " + place,
      t("formMonth") + ": " + (month || "-"),
      t("formTravelers") + ": " + count,
      t("formDuration") + ": " + (duration === "flexible" ? t("durationFlexible") : duration + " " + nights),
      t("formNotes") + ": " + (notes.trim().slice(0, 1000) || "-"),
      "",
      t("dialogIntro"),
    ].join("\n");
  };

  async function copyDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = makeDraft();
    if (!draft) {
      setStatus(t("invalidForm"));
      return;
    }
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard not available");
      await navigator.clipboard.writeText(draft);
      setManualCopy("");
      setStatus(t("copySuccess"));
    } catch {
      setManualCopy(draft);
      setStatus(t("copyError"));
    }
  }

  return (
    <>
      <dialog ref={requestRef} className="modal" aria-labelledby="inquiry-heading" onClose={closeRequest}>
        <div className="dialog-shell">
          <div className="dialog-head">
            <div>
              <p className="eyebrow">{t("dialogEyebrow")}</p>
              <h2 id="inquiry-heading">{t("dialogTitle")}</h2>
            </div>
            <button className="icon-close" type="button" onClick={() => requestRef.current?.close()} aria-label={lang === "fr" ? "Fermer" : lang === "es" ? "Cerrar" : "Close"}>×</button>
          </div>
          <p className="dialog-copy">{t("dialogIntro")}</p>
          <form onSubmit={copyDraft}>
            <div className="dialog-grid">
              <label>
                {t("formDestination")}
                <select value={destination} onChange={(event) => setDestination(event.target.value)}>
                  <option value="all">{t("allInquiryDestinations")}</option>
                  {destinations.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                </select>
              </label>
              <label>
                {t("formMonth")}
                <input type="month" value={month} min={minMonth} onChange={(event) => setMonth(event.target.value)} />
              </label>
              <label>
                {t("formTravelers")}
                <input type="number" min={1} max={30} step={1} required value={travellers} onChange={(event) => setTravellers(event.target.value)} />
              </label>
              <label>
                {t("formDuration")}
                <select value={duration} onChange={(event) => setDuration(event.target.value)}>
                  <option value="flexible">{t("durationFlexible")}</option>
                  {[7, 10, 14].map((n) => <option key={n} value={String(n)}>{n} {lang === "fr" ? "nuits" : lang === "es" ? "noches" : "nights"}</option>)}
                </select>
              </label>
              <label className="dialog-full">
                {t("formNotes")}
                <textarea rows={3} maxLength={1000} value={notes} placeholder={t("formNotesPlaceholder")} onChange={(event) => setNotes(event.target.value)} />
              </label>
            </div>
            <div className="dialog-actions">
              <button type="submit" className="button button-coral">{t("copyRequest")}</button>
            </div>
            <p className="dialog-status" role="status" aria-live="polite">{status}</p>
            {manualCopy ? <textarea className="manual-copy" readOnly value={manualCopy} aria-label={t("copyError")} onFocus={(event) => event.target.select()} /> : null}
          </form>
        </div>
      </dialog>
      <dialog ref={legalRef} className="modal" aria-labelledby="legal-heading" onClose={closeLegal}>
        <div className="dialog-shell">
          <div className="dialog-head">
            <h2 id="legal-heading">{legal === "privacy" ? t("privacyTitle") : t("termsTitle")}</h2>
            <button type="button" className="icon-close" onClick={() => legalRef.current?.close()} aria-label={lang === "fr" ? "Fermer" : lang === "es" ? "Cerrar" : "Close"}>×</button>
          </div>
          <div className="legal-copy" dangerouslySetInnerHTML={{ __html: legal === "privacy" ? t("privacyHtml") : t("termsHtml") }} />
        </div>
      </dialog>
    </>
  );
}
