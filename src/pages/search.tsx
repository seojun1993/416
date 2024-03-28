/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import Keyboard, { Key } from "@/components/pages/search/keyboard";
import { H1, H4, P1 } from "@/components/ui/text";
import {
  getStudentsFromSearchQuery,
  getStudentsQuery,
} from "@/queries/student";
import { css, useTheme } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterNameContainFromPattern } from "@/fetcher/student";
import NotFoundModal from "@/components/ui/not-found-modal";
import { useA11y } from "@/hooks/use-a11y";
import { sendA11yEvent } from "@/libs/utils";
import { useSettingStore } from "@/contexts/setting.store";
import styled from "@emotion/styled";
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
  [
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
    {
      icon: [
        <SearchButtonChild data-a11y-id="remove">
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

    { icon: ["ㅋ"], value: ["ㅋ"], a11y: ["text_11"] },
    { icon: ["ㅌ"], value: ["ㅌ"], a11y: ["text_12"] },
    { icon: ["ㅊ"], value: ["ㅊ"], a11y: ["text_10"] },
    { icon: ["ㅍ"], value: ["ㅍ"], a11y: ["text_13"] },
    { icon: ["ㅠ"], value: ["ㅠ"], a11y: ["text_22"] },
    { icon: ["ㅜ"], value: ["ㅜ"], a11y: ["text_21"] },
    { icon: ["ㅡ"], value: ["ㅡ"], a11y: ["text_23"] },
  ],
];

const Search = () => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const mode = useSettingStore((state) => state.mode);
  const { data } = useQuery(getStudentsQuery());
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const foundStudents = filterNameContainFromPattern(
      data!,
      inputRef.current!.value.trim()
    );
    if (!foundStudents?.length) {
      sendA11yEvent("bell");
      return setOpen(true);
    }

    queryClient.setQueryData(
      getStudentsFromSearchQuery(inputRef.current!.value.trim()).queryKey,
      foundStudents
    );
    setSearchParam({ keyword: inputRef.current.value });
    navigate(`/search-result?keyword=${inputRef.current.value}`);
  };
  useEffect(() => {
    const defaultKeyword = searchParam.get("keyword");
    if (defaultKeyword && inputRef.current) {
      inputRef.current.value = defaultKeyword;
    }
  }, []);

  useA11y("search_screen");
  return (
    <MainShell
      css={css`
        width: fit-content;
        flex-direction: column;
        margin: 0 auto;
      `}
    >
      {mode === "wheel" && (
        <div
          css={css`
            flex: 1;
          `}
        />
      )}
      <form
        onSubmit={handleSubmit}
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          width: fit-content;
          margin: 0 auto;
        `}
      >
        <H1
          css={css`
            margin-top: 3.6rem;
          `}
        >
          검색을 통해{" "}
          <strong
            css={css`
              font-family: "NanumSquareRoundOTF";
              font-weight: 800;
              line-height: 1;
              color: ${theme.color.yellow};
            `}
          >
            희생자
          </strong>
          를 만나보세요
        </H1>
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 0.6rem;
            margin-top: 1rem;
            font-family: "NanumSquareRoundOTF";
          `}
        >
          <P1
            css={css`
              padding: 0.5rem 1.3rem;
              height: 2.2rem;
              color: black;
              background-color: ${theme.color.yellow};
              line-height: 1;
              border-radius: 0.4rem;
              font-family: "NanumSquareRoundOTF";
            `}
          >
            검색 예시
          </P1>

          <P1
            css={css`
              font-family: "NanumSquareRoundOTF";
              color: white;
            `}
          >
            김도언, 임경빈, 전찬호, 한고운, 허재강 등
          </P1>
        </div>
        <div
          onSubmit={(event) => {
            event.preventDefault();
          }}
          css={css`
            width: 50rem;
            height: 4rem;
            margin-top: 4rem;
            border-radius: 9999rem;
            background-color: ${theme.color.background.card};
            box-shadow: 0px 0px 0.4rem ${theme.color.shadow.card.border};
            border: 0.15rem solid white;
            text-decoration: none;
            padding: 0.6rem;
            display: flex;
            align-items: center;
          `}
        >
          <input
            name="keyword"
            ref={inputRef}
            disabled
            css={css`
              font-size: calc(var(--font-size) * 1.6);
              /* font-family: "NanumSquareRoundOTF", serif, system-ui,
                -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
                Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif; */
              font-weight: 800;
              font-display: swap;
              background-color: transparent;
              height: fit-content;
              flex: 1;
              border: none;
              line-height: 1;
              color: white;
              outline: none;
              padding-left: 1.4rem;
            `}
          />
          <button
            data-a11y-id="search"
            css={css`
              display: flex;
              align-items: center;
              padding: 0.3rem 0;
              width: 8rem;
              justify-content: center;
              border-radius: 9999rem;
              height: 100%;
              border: none;
              background-color: ${theme.color.accent.foreground};
              color: ${theme.color.background.secondary};
              fill: ${theme.color.background.secondary};
              transition: opacity 0.1s ease-in-out;

              &:active {
                opacity: 0.2;
              }
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="104.575"
              height="103"
              viewBox="0 0 104.575 103"
              css={css`
                margin-right: 0.3rem;
                aspect-ratio: 1/1;
                width: 2rem;
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
            <H4 css={css``}>검색</H4>
          </button>
        </div>
        <Keyboard
          defaultValue={searchParam.get("keyword") ?? ""}
          keyboardItem={mode === "wheel" ? keyMap : undefined}
          onChange={(value) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
        />
      </form>
      <NotFoundModal duration={10000} open={open} onChange={setOpen}>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, 0.8);
            flex: 0 0 35%;
            padding: 1.6rem;
            border-radius: 0.8rem;
            row-gap: 0.8rem;
          `}
        >
          <svg
            css={css`
              width: 2rem;
              height: 2rem;
            `}
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <g
              id="그룹_626"
              data-name="그룹 626"
              transform="translate(-1816 -2051)"
            >
              <g
                id="타원_2"
                data-name="타원 2"
                transform="translate(1816 2051)"
                fill="none"
                stroke="#fff"
                strokeWidth="5"
              >
                <circle cx="45" cy="45" r="45" stroke="none" />
                <circle cx="45" cy="45" r="42.5" fill="none" />
              </g>
              <rect
                id="사각형_14"
                data-name="사각형 14"
                width="5"
                height="34"
                rx="2.5"
                transform="translate(1888.423 2126.958) rotate(-45)"
                fill="#fff"
              />
              <rect
                id="사각형_862"
                data-name="사각형 862"
                width="5"
                height="40"
                rx="2.5"
                transform="translate(1845.001 2083.535) rotate(-45)"
                fill="#fff500"
              />
              <rect
                id="사각형_863"
                data-name="사각형 863"
                width="5.001"
                height="40"
                rx="2.5"
                transform="translate(1848.535 2111.821) rotate(-135)"
                fill="#fff500"
              />
            </g>
          </svg>

          <H4
            css={css`
              color: white;
              font-size: 1.12rem;
              width: max-content;
            `}
          >
            일치하는 검색 결과가 없습니다
          </H4>
        </div>
      </NotFoundModal>
    </MainShell>
  );
};

export default Search;
