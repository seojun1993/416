/** @jsxImportSource @emotion/react */

import { P3 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode, useRef, useState } from "react";
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
  icon: ReactNode[];
  value?: string[];
  a11y?: string[];
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
  border-radius: 0.2rem;
  background-color: white;
  border: none;
  transition: opacity 0.1s ease-in-out;
  box-shadow: inset 0 -0.12rem 0.6rem rgba(0, 0, 0, 0.15);
`;

const SearchButton = (props: KeyWithSizeOption) => {
  const { aspect, gapWithAspect, icon, position } = props;
  return (
    <SearchButtonKey
      type="button"
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
  /* fill: ${(props) => props.theme.color.secondary.foreground};
  color: ${(props) => props.theme.color.secondary.foreground}; */
  p {
    /* color: ${(props) => props.theme.color.secondary.foreground}; */
  }
`;

const keyMap: Key[][] = [
  // [
  //   {
  //     icon: ["'"],
  //   },
  //   {
  //     icon: ["1"],
  //   },

  //   {
  //     icon: ["2"],
  //   },
  //   {
  //     icon: ["3"],
  //   },
  //   {
  //     icon: ["4"],
  //   },
  //   {
  //     icon: ["5"],
  //   },
  //   {
  //     icon: ["6"],
  //   },
  //   {
  //     icon: ["7"],
  //   },
  //   {
  //     icon: ["8"],
  //   },
  //   {
  //     icon: ["9"],
  //   },
  //   {
  //     icon: ["0"],
  //   },
  //   {
  //     icon: ["-"],
  //   },
  //   {
  //     icon: ["="],
  //   },
  //   {
  //     icon: ["₩"],
  //   },
  //   {
  //     icon: [
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="56"
  //         height="38"
  //         viewBox="0 0 56 38"
  //       >
  //         <g id="back" transform="translate(2 2)">
  //           <path
  //             id="패스"
  //             d="M1581.813,449l-17.189,17,17.189,17h34.811V449Z"
  //             transform="translate(-1564.624 -449)"
  //             fill="none"
  //             stroke="#222"
  //             strokeLinecap="round"
  //             strokeLinejoin="round"
  //             strokeWidth="4"
  //           />
  //           <path
  //             id="패스-2"
  //             data-name="패스"
  //             d="M1583.446,471.773l-2.462-2.408,14.9-14.572,2.462,2.408Z"
  //             transform="translate(-1556.214 -446.283)"
  //             fill="#222"
  //           />
  //           <path
  //             id="패스-3"
  //             data-name="패스"
  //             d="M2.408,17.357,0,14.9,14.572,0,16.98,2.461Z"
  //             transform="translate(24.77 25.49) rotate(-90)"
  //             fill="#222"
  //           />
  //         </g>
  //       </svg>,
  //     ],
  //     keyType: "Backspace",
  //   },
  // ],
  [
    // {
    //   icon: ["→"],
    //   keyType: "Tab",
    // },
    {
      icon: ["ㅂ"],
      value: ["ㅂ"],
      a11y: ["text_06"],
    },
    {
      icon: ["ㅈ"],
      value: ["ㅈ"],
      a11y: ["text_09"],
    },
    {
      icon: ["ㄷ"],
      value: ["ㄷ"],
      a11y: ["text_03"],
    },
    {
      icon: ["ㄱ"],
      value: ["ㄱ"],
      a11y: ["text_01"],
    },
    {
      icon: ["ㅅ"],
      value: ["ㅅ"],
      a11y: ["text_07"],
    },
    {
      icon: ["ㅛ"],
      value: ["ㅛ"],
      a11y: ["text_20"],
    },
    {
      icon: ["ㅕ"],
      value: ["ㅕ"],
      a11y: ["text_18"],
    },
    {
      icon: ["ㅑ"],
      value: ["ㅑ"],
      a11y: ["text_16"],
    },
    {
      icon: ["ㅐ"],
      value: ["ㅐ"],
      a11y: ["text_25"],
    },
    {
      icon: ["ㅒ"],
      value: ["ㅒ"],
      a11y: ["text_26"],
    },
    {
      icon: ["ㅔ"],
      value: ["ㅔ"],
      a11y: ["text_27"],
    },
    {
      icon: ["ㅖ"],
      value: ["ㅖ"],
      a11y: ["text_28"],
    },

    // {
    //   icon: ["["],
    // },
    // {
    //   icon: ["]"],
    // },
  ],
  [
    { icon: [], keyType: "None" },
    {
      icon: ["ㅁ"],
      value: ["ㅁ"],
      a11y: ["text_05"],
    },
    {
      icon: ["ㄴ"],
      value: ["ㄴ"],
      a11y: ["text_02"],
    },
    {
      icon: ["ㅇ"],
      value: ["ㅇ"],
      a11y: ["text_08"],
    },
    {
      icon: ["ㄹ"],
      value: ["ㄹ"],
      a11y: ["text_04"],
    },
    {
      icon: ["ㅎ"],
      value: ["ㅎ"],
      a11y: ["text_14"],
    },
    {
      icon: ["ㅗ"],
      value: ["ㅗ"],
      a11y: ["text_19"],
    },
    {
      icon: ["ㅓ"],
      value: ["ㅓ"],
      a11y: ["text_17"],
    },
    {
      icon: ["ㅏ"],
      value: ["ㅏ"],
      a11y: ["text_15"],
    },
    {
      icon: ["ㅣ"],
      value: ["ㅣ"],
      a11y: ["text_24"],
    },
    // {
    //   icon: [
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="56"
    //       height="38"
    //       viewBox="0 0 56 38"
    //     >
    //       <g id="back" transform="translate(2 2)">
    //         <path
    //           id="패스"
    //           d="M1581.813,449l-17.189,17,17.189,17h34.811V449Z"
    //           transform="translate(-1564.624 -449)"
    //           fill="none"
    //           stroke="#222"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //           strokeWidth="4"
    //         />
    //         <path
    //           id="패스-2"
    //           data-name="패스"
    //           d="M1583.446,471.773l-2.462-2.408,14.9-14.572,2.462,2.408Z"
    //           transform="translate(-1556.214 -446.283)"
    //           fill="#222"
    //         />
    //         <path
    //           id="패스-3"
    //           data-name="패스"
    //           d="M2.408,17.357,0,14.9,14.572,0,16.98,2.461Z"
    //           transform="translate(24.77 25.49) rotate(-90)"
    //           fill="#222"
    //         />
    //       </g>
    //     </svg>,
    //   ],
    //   keyType: "Backspace",
    // },
    // {
    //   icon: [";"],
    // },
    // {
    //   icon: ["'"],
    // },
    {
      icon: [
        <SearchButtonChild>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="38"
            viewBox="0 0 56 38"
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
            <g id="back" transform="translate(2 2)">
              <path
                id="패스"
                d="M1581.813,449l-17.189,17,17.189,17h34.811V449Z"
                transform="translate(-1564.624 -449)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
              />
              <path
                id="패스-2"
                data-name="패스"
                d="M1583.446,471.773l-2.462-2.408,14.9-14.572,2.462,2.408Z"
                transform="translate(-1556.214 -446.283)"
                fill="currentColor"
              />
              <path
                id="패스-3"
                data-name="패스"
                d="M2.408,17.357,0,14.9,14.572,0,16.98,2.461Z"
                transform="translate(24.77 25.49) rotate(-90)"
                fill="currentColor"
              />
            </g>
          </svg>
          <p
            css={css`
              font-size: 1.12rem;
              font-family: "Pretendard";
              font-size: calc(var(--font-size) * 1.12);
              line-height: 1.2;
              text-align: center;
              font-weight: 700;
            `}
          >
            지움
          </p>
        </SearchButtonChild>,
      ],
      // renderItem: SearchButton,
      keyType: "Backspace",
      a11y: ["remove"],
      aspect: 2,
    },
  ],
  [
    // {
    //   icon: [
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="38"
    //       height="41"
    //       viewBox="0 0 38 41"
    //     >
    //       <g
    //         id="그룹_73"
    //         data-name="그룹 73"
    //         transform="translate(-1240 -1514)"
    //       >
    //         <rect
    //           id="사각형_59"
    //           data-name="사각형 59"
    //           width="16"
    //           height="19"
    //           transform="translate(1251 1536)"
    //         />
    //         <path
    //           id="다각형_1"
    //           data-name="다각형 1"
    //           d="M19,0,38,22H0Z"
    //           transform="translate(1240 1514)"
    //           fill="#222"
    //         />
    //       </g>
    //     </svg>,
    //   ],
    //   keyType: "Shift",
    // },
    { icon: ["ㅋ"], value: ["ㅋ"], a11y: ["text_11"] },
    { icon: ["ㅌ"], value: ["ㅌ"], a11y: ["text_12"] },
    { icon: ["ㅊ"], value: ["ㅊ"], a11y: ["text_10"] },
    { icon: ["ㅍ"], value: ["ㅍ"], a11y: ["text_13"] },
    { icon: ["ㅠ"], value: ["ㅠ"], a11y: ["text_22"] },
    { icon: ["ㅜ"], value: ["ㅜ"], a11y: ["text_21"] },
    { icon: ["ㅡ"], value: ["ㅡ"], a11y: ["text_23"] },
    // { icon: [","] },
    // { icon: ["."] },
    // { icon: ["/"] },
    // {
    //   icon: [
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="38"
    //       height="41"
    //       viewBox="0 0 38 41"
    //     >
    //       <g
    //         id="그룹_73"
    //         data-name="그룹 73"
    //         transform="translate(-1240 -1514)"
    //       >
    //         <rect
    //           id="사각형_59"
    //           data-name="사각형 59"
    //           width="16"
    //           height="19"
    //           transform="translate(1251 1536)"
    //         />
    //         <path
    //           id="다각형_1"
    //           data-name="다각형 1"
    //           d="M19,0,38,22H0Z"
    //           transform="translate(1240 1514)"
    //           fill="#222"
    //         />
    //       </g>
    //     </svg>,
    //   ],
    //   keyType: "Shift",
    // },
  ],
  // [
  //   {
  //     icon: [""],
  //     aspect: 8,
  //     keyType: "Space",
  //   },
  // ],
];
const Keyboard = (
  options: Partial<
    KeyboardOptions & {
      defaultValue: string;
      onChange: (value: string) => void;
    }
  >
) => {
  const [isShifter, setIsShifter] = useState(false);
  const keyboardContainerRef = useRef<HTMLDivElement>(null);
  const defaultOptions = {
    keyboardItem: keyMap,
    gap: "0.6rem",
  };
  const { keyboardItem, gap, defaultValue } = {
    ...defaultOptions,
    ...options,
  };
  const inputValue = useRef<string>(defaultValue ?? "");

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
      Shift: (value) => {
        setIsShifter((prev) => !prev);
        return value;
      },
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
              ) : item.icon?.length ? (
                <button
                  data-a11y-id={item.a11y?.[+isShifter] ?? item.a11y?.[0]}
                  data-position={[x, y]}
                  type="button"
                  onClick={() => {
                    // const prev = hg.disassemble(inputValue.current);
                    const handler = getSpecificKeyPressHandler(item.keyType);
                    const pressedValue = (
                      item?.value?.[+isShifter] ??
                      item?.value?.[0] ??
                      ""
                    ).toString();
                    const newValue = handler(inputValue.current, pressedValue);

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
                    font-size: calc(var(--font-size) * 1.12);
                    padding: 0.4rem;
                    border-radius: 0.2rem;
                    /* background-color: white;
                    box-shadow: inset 0 -0.12rem 0.06rem rgba(0, 0, 0, 0.15);
                    border: none;
                    transition: opacity 0.1s ease-in-out;
                    outline-offset: 0.05rem !important;
                    &:active {
                      opacity: 0.8;
                    } */
                  `}
                  key={x + y + "button"}
                >
                  {item.icon[+isShifter] ?? item.icon[0]}
                </button>
              ) : (
                <div
                  data-position={[x, y]}
                  css={css`
                    grid-column: span 2;
                    aspect-ratio: 1/1;
                    height: 2rem;
                    width: calc(2rem * ${aspect} + ${gapWithAspect});
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: calc(var(--font-size) * 1.12);
                    padding: 0.4rem;
                    border-radius: 0.2rem;
                    /* background-color: white;
                  box-shadow: inset 0 -0.12rem 0.06rem rgba(0, 0, 0, 0.15);
                  border: none;
                  transition: opacity 0.1s ease-in-out;
                  outline-offset: 0.05rem !important;
                  &:active {
                    opacity: 0.8;
                  } */
                  `}
                  key={x + y + "button"}
                >
                  {item.icon[+isShifter] ?? item.icon[0]}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
