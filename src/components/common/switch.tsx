/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useThemeMode } from "@/hooks/use-theme-mode";
const Switch = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(false);
  const [mode] = useThemeMode();
  const theme = useTheme();

  const toggleSwitch = () => setIsOn(!isOn);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Space" || event.code === "Enter") {
      setIsOn((prev) => !prev);
    }
  };

  useEffect(() => {
    if (ref.current) {
      const refs = ref.current;
      refs.addEventListener("keydown", handleKeyDown);
      return () => {
        refs.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);
  return (
    <div
      ref={ref}
      tabIndex={1}
      css={css`
        height: 2rem;
        background-color: ${isOn
          ? theme.color.switch.enable
          : theme.color.switch["disable/30"]};
        display: flex;
        align-items: center;
        border-radius: 1rem;
        padding: 0.2rem;
        cursor: pointer;
        column-gap: 1rem;

        &[data-isOn="true"] {
          flex-direction: row-reverse;
        }

        &:active {
          .handle {
            ${isOn ? "left : -0.2em;" : "left:0.2em;"}
          }
        }

        .handle {
          position: relative;
          height: 100%;
          aspect-ratio: 1/1;
          background-color: white;
          ${mode === "dark" && "filter: invert(1);"}
          border-radius: 9999rem;
          left: 0;
          right: 0;
          /* transition: left 0.1s ease-in-out, right 0.1s ease-in-out; */
        }
      `}
      data-isOn={isOn}
      onClick={toggleSwitch}
    >
      <motion.div
        className="handle"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
      <span
        css={css`
          padding: 0.4rem 0;
          ${isOn ? "padding-left: 0.4rem;" : "padding-right: 0.4rem;"}
          font-size: 0.68em;
          line-height: 1.22em;
          font-weight: bold;
          ${mode === "dark" && "filter: invert(1);"}
        `}
      >
        {isOn ? "켜짐" : "꺼짐"}
      </span>
    </div>
  );
};

export default Switch;
