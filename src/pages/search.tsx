/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import Keyboard from "@/components/pages/search/keyboard";
import { H1, H4, P1 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import * as hg from "hangul-js";
const Search = () => {
  const theme = useTheme();
  const [input, setInput] = useState("");

  useEffect(() => {}, []);

  return (
    <MainShell
      css={css`
        width: fit-content;
        margin: 0 auto;
      `}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
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
          찾고 싶은 희생자의{" "}
          <strong
            css={css`
              font-family: "NanumSquareRoundOTF";
              font-weight: 800;
              line-height: 1;
              color: ${theme.color.yellow};
            `}
          >
            이름
          </strong>
          을 검색해보세요
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
            `}
          >
            홍길동, 김민지, 이아담, 박이브
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
            value={input}
            disabled
            css={css`
              font-size: 1.6rem;
              font-family: "NanumSquareRoundOTF";
              font-weight: 800;
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
            css={css`
              display: flex;
              align-items: center;
              padding: 0.3rem 0;
              width: 8rem;
              justify-content: center;
              border-radius: 9999rem;
              height: 100%;
              background-color: ${theme.color.accent.foreground};
              border: none;
              color: ${theme.color.background.secondary};
              fill: ${theme.color.background.secondary};
              transition: opacity 0.1s ease-in-out;

              &:active {
                opacity: 0.8;
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
            <H4>검색</H4>
          </button>
        </div>
        <Keyboard
          onChange={(value) => {
            setInput(value);
          }}
        />
      </form>
    </MainShell>
  );
};

export default Search;
