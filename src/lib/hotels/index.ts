import { hotelRegions, hotels } from "./data";
import type { Hotel, Lang } from "./types";

export { hotelRegions, hotels };
export type { Hotel, HotelRegion, Lang } from "./types";

const strip = (value: string): string =>
  value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/** Every property, or just those in one region. "all" means no filter. */
export function hotelsInRegion(regionId: string): Hotel[] {
  return regionId && regionId !== "all"
    ? hotels.filter((hotel) => hotel.region === regionId)
    : [...hotels];
}

/** Name search inside a region. Accent-insensitive, so "Holguin" finds "Holguín". */
export function searchHotels(term: string, regionId: string): Hotel[] {
  const pool = hotelsInRegion(regionId);
  const query = (term ?? "").trim();
  if (!query) return pool;
  return pool.filter((hotel) => strip(hotel.name).includes(strip(query)));
}

export function regionLabel(regionId: string, lang: Lang): string {
  return hotelRegions.find((region) => region.id === regionId)?.label[lang] ?? regionId;
}

export function isRegionId(value: string | undefined): boolean {
  return !!value && hotelRegions.some((region) => region.id === value);
}

/** Directory integrity. Called by the test suite, not at runtime. */
export function hotelDirectoryIsValid(): boolean {
  const seen = new Set<string>();
  const regions = new Set(hotelRegions.map((region) => region.id));
  const langs: Lang[] = ["fr", "en", "es"];
  if (hotelRegions.some((region) => !region.id || !langs.every((lang) => region.label[lang]))) return false;
  if (hotelRegions.some((region) => region.count !== hotelsInRegion(region.id).length)) return false;
  return hotels.every((hotel) => {
    if (!hotel.id || !hotel.name || seen.has(hotel.id)) return false;
    seen.add(hotel.id);
    return regions.has(hotel.region) && typeof hotel.confirmed === "boolean" && !!hotel.airport;
  });
}
