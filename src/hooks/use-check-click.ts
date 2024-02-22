import { RefObject, useEffect, useRef } from "react";

interface usecheckClickOption {
  time?: number;
  ref: RefObject<HTMLElement>;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}
export const useCheckClick = (options: usecheckClickOption) => {
  const { ref, onFirstClick, onDoubleClick, time = 30000 } = options;
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
      ref.current?.focus();

      timeoutId.current = setTimeout(() => {
        clicked.current = false;
        ref.current?.blur();

        options.onBlur && options.onBlur(ref.current);
      }, time);
    } else {
      ref?.current && onDoubleClick && onDoubleClick(ref.current);
    }
  };
  const handleWindowClick = () => {
    const isTargetElement = document.activeElement === ref.current;
    if (ref.current) {
      if (isTargetElement) {
        ref.current.focus();
      } else {
        ref.current?.blur();
        options.onBlur && options.onBlur(ref.current);
        clicked.current = false;
      }
    }
  };

  const handleKeydown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "Enter":
      case "Space":
        clicked.current = true;
        ref.current?.click?.();
        break;
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
      domRef.addEventListener("keydown", handleKeydown);
      return () => {
        domRef.removeEventListener("click", handleClick, false);
        domRef.removeEventListener("keydown", handleKeydown);
        domRef.classList.remove("__focussed-target");
        window.removeEventListener("click", handleWindowClick, false);
      };
    }
  }, [onFirstClick, onDoubleClick]);
};
