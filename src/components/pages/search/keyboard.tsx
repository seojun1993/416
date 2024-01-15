/** @jsxImportSource @emotion/react */

import { P3 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode, useRef } from "react";
import * as hg from "hangul-js";
type SpecificKeyTypes =
  | "Enter"
  | "Backspace"
  | "Space"
  | "Shift"
  | "Tab"
  | "None";

interface SizeOptions {
  aspect: number;
  gapWithAspect: string;
  gap: string;
}
interface Key {
  icon: ReactNode;
  keyType?: SpecificKeyTypes;
  aspect?: number;
  renderItem?: (item: KeyWithSizeOption) => ReactNode;
}

type KeyWithSizeOption = Key & SizeOptions;

interface KeyboardOptions {
  keyboardItem: Key[][];
  gap: string;
}

const SearchButtonKey = styled.button`
  grid-column: span 2;
  aspect-ratio: 1/1;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem;
  background-color: ${(props) => props.theme.color.switch.enable};
  border-radius: 0.2rem;
  border: none;
  box-shadow: inset 0 -0.12rem 0.6rem rgba(0, 0, 0, 0.15);
`;

const SearchButton = (props: KeyWithSizeOption) => {
  const { aspect, gapWithAspect, icon } = props;
  return (
    <SearchButtonKey
      type="button"
      css={css`
        width: calc(2rem * ${aspect} + ${gapWithAspect});
      `}
      key={icon?.toString()}
    >
      {icon}
    </SearchButtonKey>
  );
};

const keyMap: Key[][] = [
  [
    {
      icon: "'",
    },
    {
      icon: "1",
    },
    {
      icon: "2",
    },
    {
      icon: "3",
    },
    {
      icon: "4",
    },
    {
      icon: "5",
    },
    {
      icon: "6",
    },
    {
      icon: "7",
    },
    {
      icon: "8",
    },
    {
      icon: "9",
    },
    {
      icon: "0",
    },
    {
      icon: "-",
    },
    {
      icon: "=",
    },
    {
      icon: "₩",
    },
    {
      icon: "<",
      keyType: "Backspace",
    },
  ],
  [
    {
      icon: ">",
      keyType: "Tab",
    },
    {
      icon: "ㅂ",
    },
    {
      icon: "ㅈ",
    },
    {
      icon: "ㄷ",
    },
    {
      icon: "ㄱ",
    },
    {
      icon: "ㅅ",
    },
    {
      icon: "ㅛ",
    },
    {
      icon: "ㅕ",
    },
    {
      icon: "ㅑ",
    },
    {
      icon: "ㅐ",
    },
    {
      icon: "ㅔ",
    },
    {
      icon: "[",
    },
    {
      icon: "]",
    },
  ],
  [
    {
      icon: "ㅁ",
    },
    {
      icon: "ㄴ",
    },
    {
      icon: "ㅇ",
    },
    {
      icon: "ㄹ",
    },
    {
      icon: "ㅎ",
    },
    {
      icon: "ㅗ",
    },
    {
      icon: "ㅓ",
    },
    {
      icon: "ㅏ",
    },
    {
      icon: "ㅣ",
    },
    {
      icon: ";",
    },
    {
      icon: "'",
    },
    {
      icon: (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            column-gap: 0.2rem;
          `}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="104.575"
            height="103"
            viewBox="0 0 104.575 103"
            css={css`
              /* margin-right: 0.3rem; */
              aspect-ratio: 1/1;
              height: 100%;
              width: fit-content;
            `}
          >
            <g
              id="그룹_70"
              data-name="그룹 70"
              transform="translate(-1816 -2051)"
            >
              <g
                id="타원_2"
                data-name="타원 2"
                transform="translate(1816 2051)"
                fill="none"
                stroke="currentColor"
                strokeWidth="12"
              >
                <ellipse
                  cx="47.083"
                  cy="46.02"
                  rx="47.083"
                  ry="46.02"
                  stroke="none"
                />
                <ellipse
                  cx="47.083"
                  cy="46.02"
                  rx="41.083"
                  ry="40.02"
                  fill="none"
                />
              </g>
              <rect
                id="사각형_14"
                data-name="사각형 14"
                width="12"
                height="36"
                rx="6"
                transform="translate(1886.634 2128.544) rotate(-45)"
                fill="currentColor"
              />
            </g>
          </svg>
          <P3>검색</P3>
        </div>
      ),
      renderItem: SearchButton,
      keyType: "Enter",
      aspect: 2,
    },
  ],
  [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="41"
          viewBox="0 0 38 41"
        >
          <g
            id="그룹_73"
            data-name="그룹 73"
            transform="translate(-1240 -1514)"
          >
            <rect
              id="사각형_59"
              data-name="사각형 59"
              width="16"
              height="19"
              transform="translate(1251 1536)"
            />
            <path
              id="다각형_1"
              data-name="다각형 1"
              d="M19,0,38,22H0Z"
              transform="translate(1240 1514)"
              fill="#222"
            />
          </g>
        </svg>
      ),
      keyType: "Shift",
    },
    { icon: "ㅋ" },
    { icon: "ㅌ" },
    { icon: "ㅊ" },
    { icon: "ㅍ" },
    { icon: "ㅠ" },
    { icon: "ㅜ" },
    { icon: "ㅡ" },
    { icon: "," },
    { icon: "." },
    { icon: "/" },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="41"
          viewBox="0 0 38 41"
        >
          <g
            id="그룹_73"
            data-name="그룹 73"
            transform="translate(-1240 -1514)"
          >
            <rect
              id="사각형_59"
              data-name="사각형 59"
              width="16"
              height="19"
              transform="translate(1251 1536)"
            />
            <path
              id="다각형_1"
              data-name="다각형 1"
              d="M19,0,38,22H0Z"
              transform="translate(1240 1514)"
              fill="#222"
            />
          </g>
        </svg>
      ),
      keyType: "Shift",
    },
  ],
  [
    {
      icon: "",
      aspect: 8,
      keyType: "Space",
    },
    {
      icon: "한/영",
      aspect: 2,
    },
  ],
];
const Keyboard = (
  options: Partial<
    KeyboardOptions & {
      defaultValue: string;
      onChange: (value: string) => void;
    }
  >
) => {
  const defaultOptions = {
    keyboardItem: keyMap,
    gap: "0.16rem",
  };
  const { keyboardItem, gap, defaultValue } = {
    ...defaultOptions,
    ...options,
  };
  const inputValue = useRef<string>(defaultValue ?? "");
  return (
    <div
      css={css`
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        gap: ${gap};
      `}
    >
      {keyboardItem.map((keys, idx) => {
        return (
          <div
            css={css`
              display: flex;
              column-gap: ${gap};
            `}
            key={idx}
          >
            {keys?.map((item, idx) => {
              const aspect = item.aspect ?? 1;
              const gapWithAspect = aspect > 1 ? gap + ` * ${aspect - 1}` : "0";
              return item.renderItem ? (
                item.renderItem({ ...item, gap, gapWithAspect, aspect })
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const prev = hg.disassemble(inputValue.current);
                    if (item.keyType !== "Backspace") {
                      prev.push(item.icon?.toString() ?? "");
                    } else {
                      prev.pop();
                    }
                    inputValue.current = hg.assemble(prev);
                    options?.onChange?.(inputValue.current);
                  }}
                  css={css`
                    grid-column: span 2;
                    aspect-ratio: 1/1;
                    height: 2rem;
                    width: calc(2rem * ${aspect} + ${gapWithAspect});
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.4rem;
                    border-radius: 0.2rem;
                    background-color: white;
                    box-shadow: inset 0 -0.12rem 0.06rem rgba(0, 0, 0, 0.15);
                    border: none;
                    transition: opacity 0.1s ease-in-out;

                    &:active {
                      opacity: 0.8;
                    }
                  `}
                  key={idx + "button"}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
