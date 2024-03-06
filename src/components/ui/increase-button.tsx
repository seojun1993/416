/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import { HTMLAttributes, MouseEventHandler } from "react";
interface IncreaseButtonProps extends HTMLAttributes<HTMLDivElement> {
  onIncreaseClick?: MouseEventHandler;
  onDecreaseClick?: MouseEventHandler;
  a11y?: {
    increase?: string;
    decrease?: string;
  };
}

const IncreaseButton = ({
  onIncreaseClick,
  onDecreaseClick,
  ...props
}: IncreaseButtonProps) => {
  const theme = useTheme();
  const { a11y: { decrease, increase } = {} } = props;
  return (
    <div
      {...props}
      css={css`
        /* width: 3.85em; */
        height: 1.54em;
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 0.8rem;
        > * {
          width: 100;
        }
        > button + button {
          border-left: 0.07em solid #dddddd;
        }
      `}
    >
      <button
        data-a11y-id={decrease}
        data-disabled-outline="true"
        onClick={onDecreaseClick}
        css={css`
          width: calc(var(--font-size) * 2);
          height: calc(var(--font-size) * 2);
          display: flex;
          align-items: center;
          justify-content: center;

          background-color: transparent;
          border: none;
          outline: none;
          background-color: white;
          transition: none;
          fill: ${theme.color.icon.button};
          color: ${theme.color.icon.button};
          border-radius: 9999rem;
          box-shadow: 0px 0px 0.3em rgb(0, 0, 0, 0.2);
          aspect-ratio: 1/1;
          &:active {
            background-color: ${theme.color.accent.foreground};
            svg {
              color: ${theme.color.secondary.foreground};
            }
          }
        `}
      >
        <svg
          css={css`
            transition: none;
            & * {
              transition: none;
            }
            width: 0.802em;
            height: 0.13em;
          `}
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="8"
          viewBox="0 0 52 8"
          fill="currentColor"
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
      <button
        data-a11y-id={increase}
        data-disabled-outline="true"
        onClick={onIncreaseClick}
        css={css`
          width: calc(var(--font-size) * 2);
          height: calc(var(--font-size) * 2);
          display: flex;
          align-items: center;
          justify-content: center;

          background-color: transparent;
          border: none;
          outline: none;
          background-color: white;
          transition: none;
          fill: ${theme.color.icon.button};
          color: ${theme.color.icon.button};
          border-radius: 9999rem;
          box-shadow: 0px 0px 0.3em rgb(0, 0, 0, 0.2);
          aspect-ratio: 1/1;
          &:active {
            background-color: ${theme.color.accent.foreground};
            svg {
              color: ${theme.color.secondary.foreground};
            }
          }
        `}
      >
        <svg
          css={css`
            transition: none;
            & * {
              transition: none;
            }
            width: 0.802em;
            height: 0.802em;
          `}
          xmlns="http://www.w3.org/2000/svg"
          width="52"
          height="52"
          viewBox="0 0 52 52"
          fill="currentColor"
          color="currentColor"
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
    </div>
  );
};

export default IncreaseButton;
