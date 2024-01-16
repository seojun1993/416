/** @jsxImportSource @emotion/react */
import Book from "@/assets/images/board/book.png";
import { MainShell } from "@/components/common/main-shell";
import { H1 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import HTMLFlipBook from "react-pageflip";
import { useSearchParams } from "react-router-dom";

import 김예은 from "@/assets/images/김예은/main.png";
import 약전 from "@/assets/images/김예은/약전.png";

const Board = () => {
  const bookRef = useRef<HTMLDivElement>(null);
  const animatedBookRef = useRef<any>(null);
  const [bookSize, setBookSize] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const theme = useTheme();
  const handleBookResize = () => {
    console.log(bookRef.current);
    if (bookRef.current) {
      const width = bookRef.current.clientWidth;
      const height = bookRef.current.clientHeight;
      console.log([width, height]);
      setBookSize([width, height]);
    }
  };

  const handlePrevClick = () => {
    if (animatedBookRef.current?.pageFlip?.().flipPrev) {
      animatedBookRef.current?.pageFlip?.().flipPrev?.();
    }
  };
  const handleNextClick = () => {
    if (animatedBookRef.current?.pageFlip?.().flipPrev) {
      animatedBookRef.current?.pageFlip?.().flipNext?.();
    }
  };

  useEffect(() => {
    handleBookResize();
    if (bookRef.current) {
      const ref = bookRef.current;
      ref.addEventListener("resize", handleBookResize);
      return () => {
        ref.removeEventListener("resize", handleBookResize);
      };
    }
  }, []);
  return (
    <MainShell
      css={css`
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.61em;
        `}
      >
        <svg
          id="그룹_456"
          data-name="그룹 456"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="140"
          height="140"
          viewBox="0 0 140 140"
        >
          <defs>
            <clipPath id="clip-path">
              <rect
                id="사각형_701"
                data-name="사각형 701"
                width="140"
                height="140"
                fill="#fff500"
              />
            </clipPath>
          </defs>
          <g id="그룹_455" data-name="그룹 455" clipPath="url(#clip-path)">
            <path
              id="패스_1167"
              data-name="패스 1167"
              d="M66.1,0a8.16,8.16,0,1,0,8.161,8.16A8.17,8.17,0,0,0,66.1,0"
              transform="translate(2.684)"
              fill="#fff500"
            />
            <path
              id="패스_1168"
              data-name="패스 1168"
              d="M131.436,65.559a1.456,1.456,0,0,0-1.973.59A41.018,41.018,0,0,1,103.2,86.555a37.361,37.361,0,0,1-27.306-3.9,48.55,48.55,0,0,0,6.859-10.336,51.487,51.487,0,0,0,4.592-18.955c.511-7.339-.338-13.626-2.6-19.228a19.538,19.538,0,0,0-6.225-8.455,18.293,18.293,0,0,0-10.278-3.734,17.688,17.688,0,0,0-10.915,3.145,21.546,21.546,0,0,0-7.086,8.718,41.953,41.953,0,0,0-3.367,20.265A47.815,47.815,0,0,0,59.707,83.785a38.392,38.392,0,0,1-9.625,3.345,37.85,37.85,0,0,1-16.171-.523c-10.831-2.65-20.4-10.115-26.264-20.479l0-.006a1.464,1.464,0,0,0-1.632-.686,1.457,1.457,0,0,0-1.044,1.771c3.179,12.52,13.591,23.367,26.522,27.63A46.894,46.894,0,0,0,41.5,96.931,42.979,42.979,0,0,0,51.8,96.483,39.25,39.25,0,0,0,67.369,90.2a42.928,42.928,0,0,0,17.978,6.735,42.459,42.459,0,0,0,5.786.393,44.778,44.778,0,0,0,14.521-2.442,42.786,42.786,0,0,0,16.837-10.81,40.764,40.764,0,0,0,9.653-16.836,1.463,1.463,0,0,0-.708-1.679M56.846,53.15a36.128,36.128,0,0,1,1.515-15.914,15,15,0,0,1,3.776-6.011,10.4,10.4,0,0,1,6.209-2.62q.5-.047,1-.047A12.056,12.056,0,0,1,80.26,36.142c2.814,5.9,2.811,12.386,2.317,16.781A36.488,36.488,0,0,1,76.954,68.97a45.04,45.04,0,0,1-7.812,8.6,40.737,40.737,0,0,1-12.3-24.418"
              transform="translate(0.228 1.016)"
              fill="#fff500"
            />
            <path
              id="패스_1169"
              data-name="패스 1169"
              d="M132.339,63.056a5.241,5.241,0,0,0-5.236,5.236,58.316,58.316,0,0,1-116.632,0A5.235,5.235,0,1,0,0,68.292a68.787,68.787,0,0,0,137.575,0,5.241,5.241,0,0,0-5.236-5.236"
              transform="translate(0 2.921)"
              fill="#fff500"
            />
          </g>
        </svg>
        <H1 css={css``}>{name}의 다이어리</H1>
      </div>
      <div
        ref={bookRef}
        css={css`
          position: relative;
          width: 80%;
          flex: 0 0 80%;
          /* outline: 8px solid ${theme.color.accent.foreground}; */
        `}
      >
        {bookSize[1] > 1 ? (
          <HTMLFlipBook
            flippingTime={500}
            ref={(ref) => (animatedBookRef.current = ref)}
            drawShadow={false}
            style={{
              /* transform: "scaleX(0.94) scaleY(0.98) translate(0.3%,-0.5%)", */
              zIndex: 1,
            }}
            mobileScrollSupport={false}
            size="stretch"
            width={bookSize[0]}
            height={bookSize[1]}
            maxShadowOpacity={0.5}
            startPage={1}
            className={""}
            minWidth={0}
            maxWidth={0}
            minHeight={0}
            maxHeight={bookSize[1]}
            usePortrait={false}
            startZIndex={0}
            autoSize
            showCover={false}
            clickEventForward={false}
            useMouseEvents={false}
            swipeDistance={0}
            showPageCorners={false}
            disableFlipByClick={false}
          >
            <Page>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  css={css`
                    height: 100%;
                    object-fit: contain;
                    margin: 0 auto;
                  `}
                  src={김예은}
                />
              </div>
            </Page>
            <Page>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  css={css`
                    height: 100%;
                    object-fit: contain;
                    margin: 0 auto;
                  `}
                  src={약전}
                />
              </div>
            </Page>
            <Page>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  css={css`
                    height: 100%;
                    object-fit: contain;
                    margin: 0 auto;
                  `}
                  src={약전}
                />
              </div>
            </Page>
            <Page>
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  height: 100%;
                `}
              >
                <img
                  css={css`
                    height: 100%;
                    object-fit: contain;
                    margin: 0 auto;
                  `}
                  src={약전}
                />
              </div>
            </Page>
          </HTMLFlipBook>
        ) : null}
        <img
          src={Book}
          css={css`
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        />
        <LeftButton onClick={handlePrevClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54.482"
            height="96.969"
            viewBox="0 0 54.482 96.969"
          >
            <path
              id="prev_icon"
              d="M-20078.957-17310.031l-40,40,40,40"
              transform="translate(20124.955 17318.516)"
              fill="none"
              stroke="#fb950a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </LeftButton>
        <RightButton onClick={handleNextClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54.486"
            height="96.969"
            viewBox="0 0 54.486 96.969"
          >
            <path
              id="naxt_icon"
              d="M-20118.957-17310.031l40,40-40,40"
              transform="translate(20127.441 17318.516)"
              fill="none"
              stroke="#fb950a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </RightButton>
      </div>
    </MainShell>
  );
};

export default Board;

const Page = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      css={css`
        background-color: #ffffff;
        box-shadow: inset -7px 0 30px -7px rgba(0, 0, 0, 0.4);
        color: black;
      `}
    >
      {props.children}
    </div>
  );
});

const LeftButton = styled.button`
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 2;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;
const RightButton = styled.button`
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  z-index: 2;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;
