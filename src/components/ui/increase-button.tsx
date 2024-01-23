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
        width: 3.85em;
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
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
        >
          <g
            id="그룹_462"
            data-name="그룹 462"
            transform="translate(-2914 -1964)"
          >
            <rect
              id="사각형_707"
              data-name="사각형 707"
              width="52"
              height="8"
              rx="4"
              transform="translate(2914 1986)"
            />
            <rect
              id="사각형_708"
              data-name="사각형 708"
              width="52"
              height="8"
              rx="4"
              transform="translate(2944 1964) rotate(90)"
            />
          </g>
        </svg>
      </button>
      <button
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="8"
          viewBox="0 0 52 8"
        >
          <rect
            id="사각형_709"
            data-name="사각형 709"
            width="52"
            height="8"
            rx="4"
          />
        </svg>
      </button>
    </div>
  );
};

export default IncreaseButton;
