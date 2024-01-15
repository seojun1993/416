/** @jsxImportSource @emotion/react */

import { P3 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";
interface SizeOptions {
  aspect: number;
  gapWithAspect: string;
  gap: string;
}
interface Key {
  icon: ReactNode;
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
    },
  ],
  [
    {
      icon: ">",
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
      aspect: 2,
    },
  ],
];
const Keyboard = ({ options }: { options?: KeyboardOptions }) => {
  const { keyboardItem, gap } = options ?? {
    keyboardItem: keyMap,
    gap: "0.16rem",
  };
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
            {keys?.map((item) => {
              const aspect = item.aspect ?? 1;
              const gapWithAspect = aspect > 1 ? gap + ` * ${aspect - 1}` : "0";
              return item.renderItem ? (
                item.renderItem({ ...item, gap, gapWithAspect, aspect })
              ) : (
                <button
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
                    box-shadow: inset 0 -0.12rem 0.6rem rgba(0, 0, 0, 0.15);
                    border: none;
                  `}
                  key={item.icon?.toString()}
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
