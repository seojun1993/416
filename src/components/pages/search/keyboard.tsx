/** @jsxImportSource @emotion/react */

import { P3 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode, useEffect, useRef } from "react";
import * as hg from "hangul-js";
type SpecificKeyTypes =
  | "Enter"
  | "Backspace"
  | "Space"
  | "Shift"
  | "Tab"
  | "None";
type Position = [number, number];

interface SizeOptions {
  aspect: number;
  gapWithAspect: string;
  gap: string;
  position: Position;
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
  const { aspect, gapWithAspect, icon, position } = props;
  return (
    <SearchButtonKey
      type="submit"
      data-position={position}
      css={css`
        width: calc(2rem * ${aspect} + ${gapWithAspect});
      `}
      key={icon?.toString()}
    >
      {icon}
    </SearchButtonKey>
  );
};

const SearchButtonChild = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  column-gap: 0.2rem;
  fill: ${(props) => props.theme.color.secondary.foreground};
  color: ${(props) => props.theme.color.secondary.foreground};
  p {
    color: ${(props) => props.theme.color.secondary.foreground};
  }
`;

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
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="56"
          height="38"
          viewBox="0 0 56 38"
        >
          <g id="back" transform="translate(2 2)">
            <path
              id="패스"
              d="M1581.813,449l-17.189,17,17.189,17h34.811V449Z"
              transform="translate(-1564.624 -449)"
              fill="none"
              stroke="#222"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
            />
            <path
              id="패스-2"
              data-name="패스"
              d="M1583.446,471.773l-2.462-2.408,14.9-14.572,2.462,2.408Z"
              transform="translate(-1556.214 -446.283)"
              fill="#222"
            />
            <path
              id="패스-3"
              data-name="패스"
              d="M2.408,17.357,0,14.9,14.572,0,16.98,2.461Z"
              transform="translate(24.77 25.49) rotate(-90)"
              fill="#222"
            />
          </g>
        </svg>
      ),
      keyType: "Backspace",
    },
  ],
  [
    {
      icon: "→",
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
        <SearchButtonChild>
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
              transition: none;
              * {
                transition: none;
              }
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
        </SearchButtonChild>
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
  const keyboardContainerRef = useRef<HTMLDivElement>(null);
  const defaultOptions = {
    keyboardItem: keyMap,
    gap: "0.16rem",
  };
  const { keyboardItem, gap, defaultValue } = {
    ...defaultOptions,
    ...options,
  };
  const inputValue = useRef<string>(defaultValue ?? "");

  const handleArrowKeyDown = (event: KeyboardEvent) => {
    const target = event.target as any;
    const [x, y] = target.dataset.position.split(",").map(Number);
    const keyHandler: {
      ArrowUp: (position: Position) => [number, number] | null;
      ArrowDown: (position: Position) => [number, number] | null;
      ArrowRight: (position: Position) => [number, number] | null;
      ArrowLeft: (position: Position) => [number, number] | null;
    } = {
      ArrowUp: ([argX, argY]) => (argX > 0 ? [argX - 1, argY] : null),
      ArrowDown: ([argX, argY]) =>
        argX < keyboardItem.length - 1 ? [argX + 1, argY] : null,
      ArrowRight: ([argX, argY]) =>
        y < keyboardItem[argX].length - 1 ? [argX, argY + 1] : null,
      ArrowLeft: ([argX, argY]) => (argY > 0 ? [argX, argY - 1] : null),
    };
    if (Object.hasOwn(keyHandler, event.key)) {
      const position = keyHandler[event.key as keyof typeof keyHandler]([x, y]);
      if (position) {
        const nextRef = document.querySelector(
          `[data-position="${position[0]},${position[1]}"]`
        ) as HTMLButtonElement;
        if (nextRef) {
          nextRef.focus();
        }
      }
    }
  };

  const getSpecificKeyPressHandler = (keyType?: SpecificKeyTypes) => {
    const key = keyType ?? "None";
    const specificKeyPressHandler: {
      [key in Exclude<SpecificKeyTypes, "None">]: (value: string) => string;
    } & { None: (value: string, newValue: string) => string } = {
      Backspace: (value) => {
        const disassembled = hg.disassemble(value);
        disassembled.pop();
        return hg.assemble(disassembled);
      },
      Enter: (value) => value,
      None: (value, newValue) => {
        const disassembled = hg.disassemble(value);
        disassembled.push(newValue);
        return hg.assemble(disassembled);
      },
      Shift: (value) => value,
      Space: (value) => {
        const disassembled = hg.disassemble(value);
        disassembled.push(" ");
        return hg.assemble(disassembled);
      },
      Tab: (value) => {
        const disassembled = hg.disassemble(value);
        disassembled.push(" ");
        return hg.assemble(disassembled);
      },
    };

    return specificKeyPressHandler[key];
  };

  useEffect(() => {
    if (keyboardContainerRef.current) {
      const ref = keyboardContainerRef.current;
      ref.addEventListener("keydown", handleArrowKeyDown);
      return () => {
        ref.removeEventListener("keydown", handleArrowKeyDown);
      };
    }
  }, []);
  return (
    <div
      ref={keyboardContainerRef}
      css={css`
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-wrap: wrap;
        gap: ${gap};
      `}
    >
      {keyboardItem.map((keys, x) => {
        return (
          <div
            css={css`
              display: flex;
              column-gap: ${gap};
            `}
            key={x}
          >
            {keys?.map((item, y) => {
              const aspect = item.aspect ?? 1;
              const gapWithAspect = aspect > 1 ? gap + ` * ${aspect - 1}` : "0";
              return item.renderItem ? (
                item.renderItem({
                  ...item,
                  gap,
                  gapWithAspect,
                  aspect,
                  position: [x, y],
                })
              ) : (
                <button
                  data-position={[x, y]}
                  type="button"
                  onClick={() => {
                    const prev = hg.disassemble(inputValue.current);
                    const handler = getSpecificKeyPressHandler(item.keyType);
                    const newValue = handler(
                      inputValue.current,
                      item.icon?.toString() ?? ""
                    );

                    inputValue.current = newValue;
                    options?.onChange?.(newValue);
                  }}
                  css={css`
                    grid-column: span 2;
                    aspect-ratio: 1/1;
                    height: 2rem;
                    width: calc(2rem * ${aspect} + ${gapWithAspect});
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.12em;
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
                  key={x + y + "button"}
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
