import { useCallback, useLayoutEffect, useState } from "react";

export const useElementSize = <T extends HTMLElement>(ref: T | null) => {
  const [size, setSize] = useState<DOMRect | undefined>(
    ref?.getBoundingClientRect()
  );

  const handleResize = useCallback(() => {
    if (!ref) return;
    const rect = ref.getBoundingClientRect();
    setSize(rect);
  }, [ref]);

  useLayoutEffect(() => {
    handleResize();
    if (ref) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize]);

  return size;
};
