// Shapes for the CUBARESORT property directory.
// Deliberately minimal: see the header of data.ts for what must never be added.

export type Lang = "fr" | "en" | "es";

/** A Cuban region we list properties in. */
export interface HotelRegion {
  id: string;
  /** Number of properties in this region. Asserted against the data in tests. */
  count: number;
  label: Record<Lang, string>;
}

/** One property. Names and location only — no commercial fields. */
export interface Hotel {
  id: string;
  name: string;
  region: string;
  /** IATA code of the arrival airport. */
  airport: string;
  /** true = on the operator's current supplier list. false = archive, awaiting re-confirmation. */
  confirmed: boolean;
}
