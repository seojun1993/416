/** @jsxImportSource @emotion/react */
import Book from "@/assets/images/board/book.png";
import { MainShell } from "@/components/common/main-shell";
import { H1, H4, P3 } from "@/components/ui/text";
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
import InformationModal from "@/components/ui/information-modal";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import QRCode from "react-qr-code";
import { useQuery } from "@tanstack/react-query";
import { getStudentsQuery } from "@/queries/student";
import { getImagePath } from "../libs/utils";
const Board = () => {
  const { data: students } = useQuery(getStudentsQuery());
  const bookRef = useRef<HTMLDivElement>(null);
  const animatedBookRef = useRef<any>(null);
  const [bookSize, setBookSize] = useState([0, 0]);
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");

  const student =
    id && students
      ? students.find((st) => st["416_id"] === parseInt(id))
      : null;

  const theme = useTheme();
  const handleBookResize = () => {
    if (bookRef.current) {
      const width = bookRef.current.clientWidth;
      const height = bookRef.current.clientHeight;

      setBookSize([width, height * 2.2]);
    }
  };

  const handlePrevClick = () => {
    if (animatedBookRef.current?.pageFlip?.().flipPrev) {
      animatedBookRef.current?.pageFlip?.().flipPrev?.();
      dispatchEvent(new CustomEvent("onPageChange"));
    }
  };
  const handleNextClick = () => {
    if (animatedBookRef.current?.pageFlip?.().flipPrev) {
      animatedBookRef.current?.pageFlip?.().flipNext?.();
      dispatchEvent(new CustomEvent("onPageChange"));
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
        padding-bottom: 1.6em;
        row-gap: 1.57em;
      `}
    >
      <div
        css={css`
          flex-direction: column;
          align-items: center;
          flex: 1;
          display: flex;
          row-gap: 0.9em;
        `}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            column-gap: 0.61em;
            height: 2.85em;
          `}
        >
          <H1 css={css``}>{student?.name}의 다이어리</H1>
        </div>
        <div
          css={css`
            width: 80%;
            flex: 0 0 87%;
            position: relative;
            /* outline: 8px solid ${theme.color.accent.foreground}; */
          `}
        >
          <InformationModal
            duration={0}
            modal={false}
            cssStyles={css`
              justify-content: flex-end;
              width: 110%;
              left: 50%;
              transform: translateX(-50%);
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: rgba(0, 0, 0, 0.8);
                flex: 0 0 35%;
                margin-right: 10%;
                padding: 1.6rem;
                border-radius: 0.8rem;
                row-gap: 0.8rem;
              `}
            >
              <svg
                css={css`
                  height: 2rem;
                `}
                id="그룹_618"
                data-name="그룹 618"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="124"
                height="100"
                viewBox="0 0 124 100"
              >
                <defs>
                  <clipPath id="clip-path">
                    <rect
                      id="사각형_861"
                      data-name="사각형 861"
                      width="124"
                      height="100"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="4"
                    />
                  </clipPath>
                </defs>
                <g
                  id="그룹_616"
                  data-name="그룹 616"
                  clipPath="url(#clip-path)"
                >
                  <path
                    id="패스_1758"
                    data-name="패스 1758"
                    d="M5.793,7.564,23.3,1l3.068,18.445"
                    transform="translate(11.414 1.969)"
                    fill="none"
                    stroke="#fff500"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <line
                    id="선_4"
                    data-name="선 4"
                    y1="23.15"
                    x2="13.366"
                    transform="translate(22.014 2.215)"
                    fill="none"
                    stroke="#fff500"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <path
                    id="패스_1759"
                    data-name="패스 1759"
                    d="M21.564,23.416,4.058,29.98.987,11.535"
                    transform="translate(1.944 22.727)"
                    fill="none"
                    stroke="#fff500"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <line
                    id="선_5"
                    data-name="선 5"
                    x1="13.366"
                    y2="23.15"
                    transform="translate(5.335 30.311)"
                    fill="none"
                    stroke="#fff500"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <path
                    id="패스_1760"
                    data-name="패스 1760"
                    d="M45.433,32.809V18.4c0-4.23-3.849-7.69-8.082-7.69s-8.085,3.46-8.085,7.69V32.809"
                    transform="translate(57.659 21.109)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <path
                    id="패스_1761"
                    data-name="패스 1761"
                    d="M23.824,32.9V18.358c0-4.23,3.849-7.69,8.082-7.69s8.085,3.46,8.085,7.69V32.9"
                    transform="translate(46.938 21.018)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <path
                    id="패스_1762"
                    data-name="패스 1762"
                    d="M85.264,45.952V37.487c0-4.23,4.235-7.69,8.468-7.69a7.716,7.716,0,0,1,7.7,7.69V73.765A18.008,18.008,0,0,1,83.423,91.773H58.654a63.014,63.014,0,0,1-28.68-6.906l-15.5-7.924c-6.344-4.532-6.3-10.88-4.042-14.818s6.166-5.9,11.405-4.883l14.931,5.6V10.361c0-4.233,3.849-7.693,8.082-7.693s8.082,3.46,8.082,7.693v38.3"
                    transform="translate(17.828 5.256)"
                    fill="none"
                    stroke="#fff"
                    strokeLinejoin="round"
                    strokeWidth="4"
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
                손가락을 이용하여 확대해보세요
              </H4>
            </div>
          </InformationModal>
          <div
            ref={bookRef}
            css={css`
              position: relative;
              /* padding: 10px 74px 10px 94px; */
              padding: 0.45dvh 1.925dvw 0dvh 2.45dvw;
              height: 100%;
              background: url(${Book});
              background-size: cover;
              background-repeat: no-repeat;
            `}
          >
            {bookSize[1] > 1 && student ? (
              <HTMLFlipBook
                flippingTime={1000}
                ref={(ref) => (animatedBookRef.current = ref)}
                drawShadow={false}
                style={{
                  zIndex: 1,
                }}
                data-density="soft"
                mobileScrollSupport={false}
                size="stretch"
                width={bookSize[0]}
                height={bookSize[1]}
                maxShadowOpacity={0.5}
                startPage={1}
                className={""}
                minWidth={0}
                maxWidth={bookSize[0]}
                minHeight={0}
                maxHeight={bookSize[1]}
                usePortrait={false}
                startZIndex={0}
                showCover={false}
                autoSize
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
                      src={getImagePath(student.caricature)}
                    />
                  </div>
                </Page>
                {student?.images?.map((image) => (
                  <Page key={image.id}>
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
                        src={getImagePath(image.url)}
                      />
                    </div>
                  </Page>
                ))}
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
                    <div
                      css={css`
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        margin: 0 auto;
                      `}
                    />
                  </div>
                </Page>
              </HTMLFlipBook>
            ) : null}
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
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: flex-end;
        `}
      >
        <div
          css={css`
            padding: 1.2rem 0.6rem;
            background-color: ${theme.color.background.secondary};
            color: ${theme.color.text.main};
            border-radius: 0.8rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 0.8rem;
          `}
        >
          {student?.guestbook_url ? (
            <QRCode width={250} height={250} value={student.guestbook_url} />
          ) : null}
          <P3
            css={css`
              font-weight: 500;
            `}
          >
            해당 QR을 통해
            <br />
            <strong>개인 방명록</strong>을
            <br />
            작성할 수 있습니다.
          </P3>
        </div>
      </div>
    </MainShell>
  );
};

export default Board;

const Page = forwardRef<HTMLDivElement, PropsWithChildren>((props, ref) => {
  const panRef = useRef<ReactZoomPanPinchContentRef>(null);
  const handlePageChange = () => {
    panRef.current?.resetTransform();
  };

  useEffect(() => {
    window.addEventListener("onPageChange", handlePageChange);

    return () => {
      window.removeEventListener("onPageChange", handlePageChange);
    };
  }, []);
  return (
    <div
      ref={ref}
      css={css`
        box-shadow: inset -7px 0 10px -7px rgba(0, 0, 0, 0.4);
        overflow: hidden;
      `}
    >
      <TransformWrapper ref={panRef}>
        <div
          {...props}
          css={css`
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            color: black;
          `}
        >
          <TransformComponent>{props.children}</TransformComponent>
        </div>
      </TransformWrapper>
    </div>
  );
});

const LeftButton = styled.button`
  position: absolute;
  left: -3%;
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
  right: -3%;
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
