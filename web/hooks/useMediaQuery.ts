"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tracks a media query on the client.
 *
 * Uses useSyncExternalStore rather than useState + useEffect: a media query is
 * external state, and subscribing to it this way avoids the cascading render
 * that setting state inside an effect would cause. The server snapshot is
 * always false, so markup matches during hydration.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
