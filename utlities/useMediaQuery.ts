import { useState, useEffect } from "react";

// const isMobile = useMedia<boolean>(["(max-width: 800px)"], [true], false);

export function useMedia<T>(
  queries: string[],
  values: T[],
  defaultValue: T
): T {
  // Array containing a media query list for each query
  // E.g. PC, tablet, mobile max/min width.
  const mediaQueryLists = process.browser
    ? queries.map((q) => window.matchMedia(q))
    : [];

  const getValue = () => {
    if (!process.browser) return defaultValue;
    // Get index of first media query that matches
    const index = mediaQueryLists.findIndex((mql) => mql.matches);
    // Return related value or defaultValue if none
    return values?.[index] || defaultValue;
  };

  // State and setter for matched value
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(
    () => {
      // Event listener callback
      // Note: By defining getValue outside of useEffect we ensure that it has ...
      // ... current values of hook args (as this hook callback is created once on mount).
      const handler = () => setValue(getValue);
      // call handler right away, handling SSR
      handler();
      // Set a listener for each media query with above handler as callback.
      mediaQueryLists.forEach((mql) => mql.addListener(handler));
      // Remove listeners on cleanup
      return () =>
        mediaQueryLists.forEach((mql) => mql.removeListener(handler));
    },
    // Empty array ensures effect is only run on mount and unmount
    [] // eslint-disable-line
  );

  return value;
}

// for e.g.
// const isMobile = useMedia<boolean>(["(max-width: 600px)"], [true], false);
