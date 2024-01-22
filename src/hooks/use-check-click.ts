import { RefObject, useEffect, useRef } from "react";

interface usecheckClickOption {
  time?: number;
  ref: RefObject<HTMLElement>;
  onFirstClick?: (ref: HTMLElement) => void;
}
export const useCheckClick = (options: usecheckClickOption) => {
  const { ref, onFirstClick, time = 30000 } = options;
  const clicked = useRef(false);
  const timeoutId = useRef<NodeJS.Timeout>();
  const handleClick = (e: MouseEvent) => {
    if (!clicked.current) {
      e.preventDefault();
      clicked.current = true;
      clearTimeout(timeoutId.current);
      if (ref.current) {
        onFirstClick?.(ref.current);
      }

      timeoutId.current = setTimeout(() => {
        clicked.current = false;
        ref.current?.classList.remove("__focussed");
      }, time);
    } else {
      console.log(e);
    }
  };
  const handleWindowClick = () => {
    const isTargetElement = document.activeElement === ref.current;
    if (ref.current) {
      if (isTargetElement) {
        ref.current.classList.add("__focussed");
      } else {
        ref.current.classList.remove("__focussed");
        clicked.current = false;
      }
    }
  };
  useEffect(() => {
    if (ref.current) {
      const domRef = ref.current;
      if (domRef) {
        domRef.classList.add("__focussed-target");
      }
      window.addEventListener("click", handleWindowClick, false);
      domRef.addEventListener("click", handleClick, false);
      return () => {
        domRef.removeEventListener("click", handleClick, false);
        domRef.classList.remove("__focussed-target");
        window.removeEventListener("click", handleWindowClick, false);
      };
    }
  }, [onFirstClick]);
};
