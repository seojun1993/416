/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import React, { HTMLAttributes } from "react";
interface IncreaseButtonProps extends HTMLAttributes<HTMLDivElement> {}

// #DDDDDD
const IncreaseButton = (props: IncreaseButtonProps) => {
  const theme = useTheme();
  return (
    <div
      {...props}
      css={css`
        width: 3.7em;
        height: 1.54em;
        border-radius: 999rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 0px 0.3em rgb(0, 0, 0, 0.2);
        transition: background-color 0.1s ease-in-out;
        > * {
          transition: background-color 0.1s ease-in-out;
          width: 100;
        }
        > button + button {
          border-left: 0.07em solid #dddddd;
        }
      `}
    >
      <button
        css={css`
          display: block;
          flex: 0 0 50%;
          background-color: transparent;
          border: none;
          outline: none;
          background-color: white;
          transition: none;
          &:active {
            background-color: ${theme.color.accent.foreground};
            color: ${theme.color.secondary.foreground};
          }
        `}
      >
        +
      </button>
      <button
        css={css`
          display: block;
          flex: 0 0 50%;
          background-color: transparent;
          border: none;
          outline: none;
          background-color: white;
          transition: none;
          &:active {
            background-color: ${theme.color.accent.foreground};
            color: ${theme.color.secondary.foreground};
          }
        `}
      >
        -
      </button>
    </div>
  );
};

export default IncreaseButton;
