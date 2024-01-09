/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import CircleButton from "../common/circle-button";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Switch from "../common/switch";

const BottomBar = () => {
  const [themeMode, toggleTheme] = useThemeMode();
  const theme = useTheme();
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const handleWindowResize = useCallback(() => {
    if (bottomRef.current) {
      document.documentElement.style.setProperty(
        "--bottom-height",
        `${bottomRef.current.clientHeight}px`
      );
    }
  }, []);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  return (
    <BottomWrapper ref={bottomRef}>
      <div
        css={css`
          display: flex;
          column-gap: 0.6rem;
        `}
      >
        <CircleButton
          onClick={() => navigate("/")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56.471"
              viewBox="0 0 56 56.471"
            >
              <path
                id="집"
                data-name="집"
                d="M28.666,1,1,22.176V57.471H19V34.529H39V57.471H57V22.176Z"
                transform="translate(-1 -1)"
                fill="#666"
              />
            </svg>
          }
        >
          홈화면
        </CircleButton>
        <CircleButton
          onClick={() => navigate("menu")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="40"
              viewBox="0 0 52 40"
            >
              <g id="메뉴" data-name="메뉴" transform="translate(-240 -2066)">
                <rect
                  id="윗사각형"
                  data-name="윗사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2066)"
                  fill="#666"
                />
                <rect
                  id="중간사각형"
                  data-name="중간사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2082)"
                  fill="#666"
                />
                <rect
                  id="아랫사각형"
                  data-name="아랫사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2098)"
                  fill="#666"
                />
              </g>
            </svg>
          }
        >
          메뉴
        </CircleButton>
        <div
          css={css`
            display: flex;
            column-gap: 0.4em;
          `}
        >
          <CircleButton
            css={css`
              margin-left: 0.6rem;
            `}
            onClick={() => {
              if (window.history.state.idx !== 0) {
                navigate(-1);
              }
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35.656"
                height="61.312"
                viewBox="0 0 35.656 61.312"
              >
                <path
                  id="prev_icon"
                  d="M435.533,2062.63l-26,25,26,25"
                  transform="translate(-405.533 -2056.974)"
                  fill="none"
                  style={{
                    fill: "none",
                  }}
                  stroke="#666"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
              </svg>
            }
          />
          <CircleButton
            css={css`
              margin-right: 0.6rem;
            `}
            onClick={() => window.history.forward()}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35.656"
                height="61.312"
                viewBox="0 0 35.656 61.312"
              >
                <path
                  id="next_icon"
                  d="M409.533,2062.63l26,25-26,25"
                  transform="translate(-403.878 -2056.974)"
                  fill="none"
                  stroke="#666"
                  style={{
                    fill: "none",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
              </svg>
            }
          />
        </div>
        <CircleButton
          css={css`
            background-color: ${themeMode === "dark"
              ? theme.color.accent.foreground
              : theme.color.background.secondary};
          `}
          onClick={toggleTheme}
          icon={
            themeMode === "light" ? (
              <div
                css={css`
                  aspect-ratio: 1/1;
                  display: flex;
                  align-items: center;
                  max-height: 1em;
                `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="39"
                  height="69.999"
                  viewBox="0 0 39 69.999"
                  style={{
                    maxHeight: "1em",
                  }}
                >
                  <g
                    id="태양_절반"
                    data-name="태양_절반"
                    transform="translate(-373.001 -2045)"
                  >
                    <g
                      id="태양_절반_그룹"
                      data-name="태양_절반_그룹"
                      transform="translate(64 426.445)"
                    >
                      <path
                        id="중앙원"
                        data-name="중앙원"
                        d="M17.5,36A17.146,17.146,0,0,1,5.126,30.728a18.365,18.365,0,0,1,0-25.456A17.165,17.165,0,0,1,21,.36V35.64A17.163,17.163,0,0,1,17.5,36Z"
                        transform="translate(327 1634.555)"
                        fill="#666"
                      />
                      <path
                        id="햇살"
                        data-name="햇살"
                        d="M34.746,67.873V58.4A2.127,2.127,0,1,1,39,58.4v9.471a2.127,2.127,0,0,1-4.254,0ZM9.168,61.68a2.011,2.011,0,0,1,0-2.912l7.019-6.794a2.179,2.179,0,0,1,3.009,0,2.012,2.012,0,0,1,0,2.911l-7.02,6.794a2.177,2.177,0,0,1-3.008,0ZM2.059,37.058a2.059,2.059,0,0,1,0-4.118H12.124a2.059,2.059,0,0,1,0,4.118ZM16.187,18.023l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0L19.2,15.112a2.011,2.011,0,0,1,0,2.912,2.177,2.177,0,0,1-3.008,0ZM34.746,11.6V2.127a2.127,2.127,0,0,1,4.254,0V11.6a2.127,2.127,0,0,1-4.254,0Z"
                        transform="translate(309 1618.555)"
                        fill="#666"
                      />
                    </g>
                  </g>
                </svg>
                <div
                  css={css`
                    height: 100%;
                    width: 0.44em;
                  `}
                />
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="73.999"
                height="70"
                viewBox="0 0 73.999 70"
                style={{
                  maxHeight: "1em",
                  aspectRatio: 1 / 1,
                }}
              >
                <g id="reversal_icon" transform="translate(-373.001 -2045)">
                  <g
                    id="그룹_4"
                    data-name="그룹 4"
                    transform="translate(64 426.445)"
                  >
                    <path
                      id="빼기_1"
                      data-name="빼기 1"
                      d="M17.5,36A17.146,17.146,0,0,1,5.126,30.728a18.365,18.365,0,0,1,0-25.456A17.165,17.165,0,0,1,21,.36V35.64A17.163,17.163,0,0,1,17.5,36Z"
                      transform="translate(327 1634.555)"
                      fill="#222"
                    />
                    <path
                      id="합치기_1"
                      data-name="합치기 1"
                      d="M34.746,67.873V58.4A2.127,2.127,0,1,1,39,58.4v9.471a2.127,2.127,0,0,1-4.254,0ZM9.168,61.68a2.011,2.011,0,0,1,0-2.912l7.019-6.794a2.179,2.179,0,0,1,3.009,0,2.012,2.012,0,0,1,0,2.911l-7.02,6.794a2.177,2.177,0,0,1-3.008,0ZM2.059,37.058a2.059,2.059,0,0,1,0-4.118H12.124a2.059,2.059,0,0,1,0,4.118ZM16.187,18.023l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0L19.2,15.112a2.011,2.011,0,0,1,0,2.912,2.177,2.177,0,0,1-3.008,0ZM34.746,11.6V2.127a2.127,2.127,0,0,1,4.254,0V11.6a2.127,2.127,0,0,1-4.254,0Z"
                      transform="translate(309 1618.555)"
                      fill="#222"
                    />
                  </g>
                  <g
                    id="그룹_5"
                    data-name="그룹 5"
                    transform="translate(408 2045)"
                  >
                    <path
                      id="빼기_1-2"
                      data-name="빼기 1"
                      d="M17.5,0A17.145,17.145,0,0,0,5.126,5.272a18.365,18.365,0,0,0,0,25.456A17.165,17.165,0,0,0,21,35.64V.36A17.163,17.163,0,0,0,17.5,0Z"
                      transform="translate(21.001 52) rotate(180)"
                      fill="#222"
                    />
                    <path
                      id="합치기_1-2"
                      data-name="합치기 1"
                      d="M34.744,67.872V58.4A2.128,2.128,0,0,1,39,58.4v9.471a2.128,2.128,0,0,1-4.255,0ZM9.167,61.682a2.013,2.013,0,0,1,0-2.912l7.02-6.793a2.176,2.176,0,0,1,3.008,0,2.012,2.012,0,0,1,0,2.911l-7.019,6.794a2.179,2.179,0,0,1-3.009,0ZM2.058,37.059a2.059,2.059,0,0,1,0-4.118H12.122a2.059,2.059,0,1,1,0,4.118ZM16.187,18.025l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0l7.02,6.793a2.013,2.013,0,0,1,0,2.912,2.179,2.179,0,0,1-3.009,0ZM34.744,11.6V2.127a2.128,2.128,0,0,1,4.255,0V11.6a2.128,2.128,0,0,1-4.255,0Z"
                      transform="translate(39 70) rotate(180)"
                      fill="#222"
                    />
                  </g>
                </g>
              </svg>
            )
          }
        >
          고대비
        </CircleButton>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <CircleButton
          onClick={() => navigate("search")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="63.414"
              height="60"
              viewBox="0 0 63.414 60"
            >
              <g
                id="그룹_7"
                data-name="그룹 7"
                transform="translate(-1816 -2051)"
              >
                <g
                  id="타원_2"
                  data-name="타원 2"
                  transform="translate(1816 2051)"
                  fill="none"
                  stroke="#666"
                  strokeWidth="8"
                >
                  <ellipse
                    cx="26.417"
                    cy="26.02"
                    rx="26.417"
                    ry="26.02"
                    stroke="none"
                  />
                  <ellipse
                    cx="26.417"
                    cy="26.02"
                    rx="22.417"
                    ry="22.02"
                    fill="none"
                  />
                </g>
                <rect
                  id="사각형_14"
                  data-name="사각형 14"
                  width="8"
                  height="26"
                  rx="4"
                  transform="translate(1855.373 2092.615) rotate(-45)"
                  fill="#666"
                />
              </g>
            </svg>
          }
        >
          학생검색
        </CircleButton>
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <Switch />
      </div>
    </BottomWrapper>
  );
};

export default BottomBar;

const ScreenSizeSettingTool = styled.div`
  position: absolute;
  top: -50px;
`;

const BottomWrapper = styled.div`
  position: relative;
  box-shadow: 0px -0.15em 0.15em rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 2.5dvh 2.1dvw;
  font-size: 3dvh;
  /* gap: 0.6em; */
  flex-wrap: wrap;
  z-index: 1;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.color.background.secondary};
`;
