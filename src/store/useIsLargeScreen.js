// hooks/useIsLargeScreen.ts
import { useEffect, useState } from "react";

export const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    setIsLarge(mediaQuery.matches);

    const handler = () => setIsLarge(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isLarge;
};
