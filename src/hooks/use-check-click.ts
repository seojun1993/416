import { RefObject, useEffect, useRef } from "react";

interface usecheckClickOption {
  ref: RefObject<HTMLElement>;
}
export const useCheckClick = (options: usecheckClickOption) => {
  const { ref } = options;
  const clicked = useRef(false);
  const timeoutId = useRef<NodeJS.Timeout>();
  const handleClick = (e: MouseEvent) => {
    if (!clicked.current) {
      e.preventDefault();
      clicked.current = true;
      ref.current!.style.position = "relative";
      const alert = document.createElement("div");
      alert.style.position = "absolute";
      alert.style.top = "-100%";
      alert.innerText = "<span>123123</span>";
      ref.current!.appendChild(alert);
      clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => {
        clicked.current = false;
      }, 5000);
    } else {
      console.log(e);
    }
  };
  useEffect(() => {
    if (ref.current) {
      const domRef = ref.current;
      domRef.addEventListener("click", handleClick);
      return () => {
        domRef.removeEventListener("click", handleClick);
      };
    }
  });
};
