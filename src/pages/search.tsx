/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import Keyboard from "@/components/pages/search/keyboard";
import { H1, H4, P1 } from "@/components/ui/text";
import {
  getStudentsFromSearchQuery,
  getStudentsQuery,
} from "@/queries/student";
import { css, useTheme } from "@emotion/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FormEventHandler, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { filterNameContainFromPattern } from "@/fetcher/student";

const Search = () => {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data } = useQuery(getStudentsQuery());
  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (!inputRef.current) return;
    const foundStudents = filterNameContainFromPattern(
      data!,
      inputRef.current!.value
    );
    if (!foundStudents?.length) {
      return alert("결과없음");
    }

    queryClient.setQueryData(
      getStudentsFromSearchQuery(inputRef.current!.value).queryKey,
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

  return (
    <MainShell
      css={css`
        width: fit-content;
        margin: 0 auto;
      `}
    >
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
            홍길동, 김민지, 선생님, 열정소녀 등
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
              border: none;
              background-color: ${theme.color.accent.foreground};
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
            <H4>검색</H4>
          </button>
        </div>
        <Keyboard
          defaultValue={searchParam.get("keyword") ?? ""}
          onChange={(value) => {
            if (inputRef.current) {
              inputRef.current.value = value;
            }
          }}
        />
      </form>
    </MainShell>
  );
};

export default Search;
