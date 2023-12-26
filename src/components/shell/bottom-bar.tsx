/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import CircleButton from "../common/circle-button";
import { useCallback, useEffect, useRef } from "react";

// TODO : 공통 좌우 패딩
// TODO : 공통 그림자 스타일 필요
const BottomBar = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
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
    <div
      ref={bottomRef}
      css={{
        boxShadow: "0px -10px 10px rgba(0,0,0,0.1)",
        padding: "0.5rem 1.6rem",
        display: "flex",
        justifyContent: "space-between",
        // display: "grid",
        // gridTemplateColumns: "repeat(3, minmax(33dvw, 1fr))",
      }}
    >
      <div
        css={css({
          display: "flex",
          alignItems: "center",
          columnGap: "0.6rem",
        })}
      >
        <CircleButton
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
        />
        <CircleButton
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
        />
        <CircleButton
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="69.999"
              viewBox="0 0 39 69.999"
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
          }
        >
          고대비
        </CircleButton>
        <CircleButton
          css={css({
            marginLeft: "1.2rem",
            backgroundColor: theme.color.button.active,
            color: "white",
          })}
          icon={<p>한</p>}
        />
        <sub>한국어</sub>
        <CircleButton icon={<p>EN</p>} />
        <CircleButton icon={<p>中</p>} />
        <CircleButton icon={<p>日</p>} />
      </div>
    </div>
  );
};

export default BottomBar;
