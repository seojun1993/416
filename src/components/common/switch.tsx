/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { HTMLAttributes, useCallback, useEffect, useRef } from "react";
import { LazyMotion, domMax, m } from "framer-motion";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { P3 } from "../ui/text";

interface SwitchProps extends HTMLAttributes<HTMLLabelElement> {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const Switch = ({ isOpen, setIsOpen, ...rest }: SwitchProps) => {
  const ref = useRef<HTMLLabelElement>(null);
  const [mode] = useThemeMode();
  const theme = useTheme();

  const toggleSwitch = () => setIsOpen(!isOpen);
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      ref.current?.focus();
    }
  }, []);
  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      toggleSwitch();
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const refs = ref.current;
      refs.addEventListener("keyup", handleKeyUp);
      refs.addEventListener("keydown", handleKeyDown);
      return () => {
        refs.removeEventListener("keyup", handleKeyUp);
        refs.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);
  return (
    <label
      {...rest}
      ref={ref}
      css={css`
        forced-color-adjust: none;
        width: fit-content;
        height: 1.54em;
        background-color: ${isOpen
          ? theme.color.switch.enable
          : theme.color.switch["disable/30"]};
        display: flex;
        align-items: center;
        border-radius: 1rem;
        padding: 0.15em;
        cursor: pointer;
        column-gap: 0.5em;

        &[data-isOn="true"] {
          flex-direction: row-reverse;
        }

        &:active {
          .handle {
            ${isOpen ? "left : -0.2em;" : "left:0.2em;"}
          }
        }

        .handle {
          position: relative;
          width: 1.24em;
          height: 1.24em;
          background-color: white;
          ${mode === "dark" && "filter: invert(1);"}
          border-radius: 9999rem;
          left: 0;
          right: 0;
          /* transition: left 0.1s ease-in-out, right 0.1s ease-in-out; */
        }
      `}
      data-ison={isOpen}
      onClick={toggleSwitch}
    >
      <LazyMotion features={domMax}>
        <m.div
          className="handle"
          layout
          transition={{ type: "spring", stiffness: 700, damping: 30 }}
        />
        <P3
          css={css`
            color: white;
            font-size: 0.865em;
            ${mode === "dark" && "filter: invert(1);"}
            white-space: nowrap;
            ${isOpen ? "padding-left: 0.45em;" : "padding-right: 0.45em;"}
            font-weight: bold;
          `}
        >
          {isOpen ? "켜짐" : "꺼짐"}
        </P3>
      </LazyMotion>
    </label>
  );
};

export default Switch;
