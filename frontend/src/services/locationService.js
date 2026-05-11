/**
 * Location search service using OpenStreetMap Nominatim API.
 * Provides forward geocoding (text → location) and reverse geocoding (lat/lng → location).
 * 
 * Nominatim Usage Policy: max 1 request/second, include a meaningful User-Agent.
 * https://operations.osmfoundation.org/policies/nominatim/
 */

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';
const USER_AGENT = 'NeokrishiTech-App/1.0';

/**
 * Search for locations by query string (forward geocoding).
 * @param {string} query - e.g. "Guna MP", "Delhi"
 * @param {object} options
 * @param {number} options.limit - max results (default 5)
 * @param {string} options.countryCode - restrict to country (default 'in' for India)
 * @returns {Promise<Array<{name: string, displayName: string, state: string, lat: string, lon: string}>>}
 */
export async function searchLocation(query, { limit = 5, countryCode = 'in' } = {}) {
  if (!query || query.trim().length < 2) return [];

  try {
    const params = new URLSearchParams({
      q: query,
      format: 'json',
      addressdetails: '1',
      limit: String(limit),
      countrycodes: countryCode,
    });

    const res = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!res.ok) throw new Error(`Nominatim search failed: ${res.status}`);

    const data = await res.json();

    return data.map((item) => {
      const addr = item.address || {};
      const city = addr.city || addr.town || addr.village || addr.county || addr.state_district || '';
      const state = addr.state || '';
      return {
        name: city || item.name || query,
        displayName: item.display_name,
        state,
        lat: item.lat,
        lon: item.lon,
      };
    });
  } catch (err) {
    console.error('Location search error:', err);
    return [];
  }
}

/**
 * Reverse geocode from lat/lon to a location name.
 * @param {number} lat
 * @param {number} lon
 * @returns {Promise<{name: string, displayName: string, state: string, lat: string, lon: string} | null>}
 */
export async function reverseGeocode(lat, lon) {
  try {
    const params = new URLSearchParams({
      format: 'json',
      lat: String(lat),
      lon: String(lon),
      addressdetails: '1',
    });

    const res = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!res.ok) throw new Error(`Nominatim reverse failed: ${res.status}`);

    const item = await res.json();
    const addr = item.address || {};
    const city = addr.city || addr.town || addr.village || addr.county || '';
    const state = addr.state || '';

    return {
      name: city || item.name || '',
      displayName: item.display_name,
      state,
      lat: item.lat,
      lon: item.lon,
    };
  } catch (err) {
    console.error('Reverse geocode error:', err);
    return null;
  }
}

/**
 * Custom React hook helper: creates a debounced search function.
 * Returns a function that, when called, waits `delay` ms before executing the search.
 * Clears the previous timer on each call.
 * 
 * Usage:
 *   const timerRef = useRef(null);
 *   const debouncedSearch = createDebouncedSearch(timerRef, 400);
 *   // in handler:
 *   debouncedSearch(query, (results) => setSuggestions(results));
 */
export function createDebouncedSearch(timerRef, delay = 400) {
  return (query, callback, options = {}) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (!query || query.trim().length < 2) {
      callback([]);
      return;
    }

    timerRef.current = setTimeout(async () => {
      const results = await searchLocation(query, options);
      callback(results);
    }, delay);
  };
}

export default { searchLocation, reverseGeocode, createDebouncedSearch };
