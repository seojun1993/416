/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
const Switch = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [isOn, setIsOn] = useState(false);

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
        height: 100px;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        border-radius: 1rem;
        padding: 10px;
        cursor: pointer;
        column-gap: 1rem;
        span {
          font-size: 0.8rem;
        }
        &[data-isOn="true"] {
          flex-direction: row-reverse;
        }

        &:active {
          .handle {
            ${isOn ? "left : -10px;" : "left:10px;"}
          }
        }

        .handle {
          position: relative;
          width: 80px;
          height: 80px;
          background-color: red;
          border-radius: 40px;
          left: 0;
          right: 0;
          transition: left 0.1s ease-in-out, right 0.1s ease-in-out;
        }
      `}
      className="switch"
      data-isOn={isOn}
      onClick={toggleSwitch}
    >
      <motion.div
        className="handle"
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
      <span>{isOn ? "켜짐" : "꺼짐"}</span>
    </div>
  );
};

export default Switch;
