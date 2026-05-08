import { useState, useEffect } from 'react';

/**
 * Custom hook to evaluate a CSS media query.
 * @param {string} query - CSS media query string, e.g. '(min-width: 1024px)'
 * @returns {boolean} Whether the media query currently matches
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** True when viewport < 768px (phone) */
export function useIsMobile() {
  return !useMediaQuery('(min-width: 768px)');
}

/** True when 768px ≤ viewport < 1024px */
export function useIsTablet() {
  const isMinTablet = useMediaQuery('(min-width: 768px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  return isMinTablet && !isDesktop;
}

/** True when viewport ≥ 1024px */
export function useIsDesktop() {
  return useMediaQuery('(min-width: 1024px)');
}
