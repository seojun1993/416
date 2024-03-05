/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import CircleButton from "../common/circle-button";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Switch from "../common/switch";
import IncreaseButton from "../ui/increase-button";
import { P3 } from "../ui/text";
import { SoundSpeed, useSettingStore, zooms } from "@/contexts/setting.store";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOutVariants } from "@/variants";

const SIGN_SUPPORT_PATH = ["/birthday", "/memory-class"];

const BottomBar = () => {
  const [themeMode, toggleTheme] = useThemeMode();
  const theme = useTheme();

  const bottomRef = useRef<HTMLDivElement>(null);
  const {
    mode,
    zoom,
    setZoom,
    signOn,
    setSignOn,
    soundOn,
    setSoundOn,
    volumeRange,
    volIndex,
    setVolumnAction,
    soundSpeed,
    selectedSoundSpeedIndex,
    setSoundSpeed,
    tooltipMode,
    setTooltipMode,
  } = useSettingStore((state) => ({
    mode: state.mode,
    zoom: state.zoom,
    setZoom: state.setZoom,
    signOn: state.signActivate,
    setSignOn: state.setSignActivate,
    soundOn: state.soundActivate,
    setSoundOn: state.setSoundActivate,
    volumeRange: state.volumeRange,
    volIndex: state.selectedVolumeIndex,
    setVolumnAction: state.setVolumnAction,
    soundSpeed: state.soundSpeed,
    selectedSoundSpeedIndex: state.selectedSoundSpeedIndex,
    setSoundSpeed: state.setSoundSpeed,
    tooltipMode: state.tooltipMode,
    setTooltipMode: state.setTooltipMode,
  }));

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleWindowResize = useCallback(() => {
    if (bottomRef.current) {
      document.documentElement.style.setProperty(
        "--bottom-height",
        `${bottomRef.current.clientHeight}px`
      );
    }
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      setTooltipMode(null);
    }
    window.addEventListener("click", handleClick);
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();
    return () => {
      window.removeEventListener("click", handleWindowResize);
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  useLayoutEffect(() => {
    switch (mode) {
      case "sign":
        if (SIGN_SUPPORT_PATH.includes(pathname)) {
          setSignOn(true);
        } else {
          setSignOn(false);
        }
        break;
      case "sound":
        setSignOn(false);
        setSoundOn(true);
        break;
      case "normal":
      default:
        setSignOn(false);
    }
  }, [mode, pathname]);

  return (
    <BottomWrapper ref={bottomRef}>
      <div
        css={css`
          display: flex;
          column-gap: 0.46em;
        `}
      >
        <CircleButton
          css={css`
            width: 5.25em;
          `}
          active={pathname === "/"}
          onClick={() => {
            const id = sessionStorage.getItem("redirect_id");
            if (id) {
              sessionStorage.removeItem("redirect_id");
            }
            navigate("/");
          }}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56.471"
              viewBox="0 0 56 56.471"
              style={{ transition: "none" }}
            >
              <path
                id="집"
                data-name="집"
                d="M28.666,1,1,22.176V57.471H19V34.529H39V57.471H57V22.176Z"
                transform="translate(-1 -1)"
                fill="currentColor"
                style={{ transition: "none" }}
              />
            </svg>
          }
        >
          홈화면
        </CircleButton>
        <CircleButton
          css={css`
            width: 5.25em;
          `}
          active={pathname === "/menu"}
          onClick={() => navigate("menu")}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="52"
              height="40"
              viewBox="0 0 52 40"
              style={{ transition: "none" }}
            >
              <g
                id="메뉴"
                data-name="메뉴"
                transform="translate(-240 -2066)"
                style={{ transition: "none" }}
              >
                <rect
                  id="윗사각형"
                  data-name="윗사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2066)"
                  fill="currentColor"
                  style={{ transition: "none" }}
                />
                <rect
                  id="중간사각형"
                  data-name="중간사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2082)"
                  fill="currentColor"
                  style={{ transition: "none" }}
                />
                <rect
                  id="아랫사각형"
                  data-name="아랫사각형"
                  width="52"
                  height="8"
                  rx="4"
                  transform="translate(240 2098)"
                  fill="currentColor"
                  style={{ transition: "none" }}
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
            column-gap: 0.3em;
          `}
        >
          <CircleButton
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
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
              </svg>
            }
          >
            이전
          </CircleButton>
          <CircleButton
            css={css`
              flex-direction: row-reverse;
              span {
                margin-left: 0;
                margin-right: 0.4rem;
              }
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
                  stroke="currentColor"
                  style={{
                    fill: "none",
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="8"
                />
              </svg>
            }
          >
            다음
          </CircleButton>
        </div>
        <CircleButton
          css={css`
            background-color: ${themeMode === "dark"
              ? theme.color.accent.foreground
              : theme.color.background.secondary};
            width: 5.25em;
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
                  width: fit-content;
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
                  width: "fit-content",
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
        <CircleButton
          key="searchButton"
          css={
            pathname === "/search"
              ? css`
                  background-color: ${theme.color.accent.foreground};
                  color: ${theme.color.background.secondary};
                  fill: ${theme.color.background.secondary};
                `
              : ""
          }
          onClick={() =>
            pathname === "/search" ? navigate(-1) : navigate("search")
          }
          icon={
            pathname === "/search" ? (
              <svg
                id="그룹_136"
                data-name="그룹 136"
                xmlns="http://www.w3.org/2000/svg"
                width="59.999"
                height="60"
                viewBox="0 0 59.999 60"
              >
                <rect
                  id="사각형_95"
                  data-name="사각형 95"
                  width="9.428"
                  height="75.423"
                  rx="4.714"
                  transform="translate(0 6.668) rotate(-45)"
                />
                <rect
                  id="사각형_96"
                  data-name="사각형 96"
                  width="9.428"
                  height="75.423"
                  rx="4.714"
                  transform="translate(53.332 0) rotate(45)"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="63.414"
                height="60"
                viewBox="0 0 63.414 60"
                style={{
                  fill: "none",
                }}
              >
                <g
                  id="그룹_7"
                  data-name="그룹 7"
                  transform="translate(-1816 -2051)"
                  style={{
                    fill: "none",
                    transition: "none",
                  }}
                >
                  <g
                    id="타원_2"
                    data-name="타원 2"
                    transform="translate(1816 2051)"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    style={{
                      fill: "none",
                      transition: "none",
                    }}
                  >
                    <ellipse
                      cx="26.417"
                      cy="26.02"
                      rx="26.417"
                      ry="26.02"
                      stroke="none"
                      style={{
                        fill: "none",
                        transition: "none",
                      }}
                    />
                    <ellipse
                      cx="26.417"
                      cy="26.02"
                      rx="22.417"
                      ry="22.02"
                      fill="none"
                      style={{
                        fill: "none",
                        transition: "none",
                      }}
                    />
                  </g>
                  <rect
                    id="사각형_14"
                    data-name="사각형 14"
                    width="8"
                    height="26"
                    rx="4"
                    transform="translate(1855.373 2092.615) rotate(-45)"
                    fill="currentColor"
                  />
                </g>
              </svg>
            )
          }
        >
          {pathname === "/search" ? "검색닫기" : "희생자검색"}
        </CircleButton>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          column-gap: 0.617em;
          justify-content: flex-end;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.23em;
            /* width: 3.85em; */
            position: relative;
          `}
        >
          <AnimatePresence mode="wait">
            {tooltipMode === "text" && (
              <ControllerWrapper
                {...fadeInOutVariants}
                onClick={(event) => event.stopPropagation()}
              >
                <P3
                  css={css`
                    /* font-size: 1.12rem; */
                  `}
                >
                  글씨확대
                </P3>
                <div
                  css={css`
                    display: flex;
                    padding: 0 2rem;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    & button + button {
                      position: relative;
                      &::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translate(-100%, -50%);
                        width: calc(100% + 4rem);
                        background-color: #dddddd;
                        height: 4px;
                      }
                    }
                  `}
                >
                  {zooms.map((item) => (
                    <button
                      key={item.text + "sign"}
                      css={css`
                        background-color: transparent;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border: none;
                        padding: 0;
                        padding: 0;
                        border-radius: 9999rem;
                      `}
                      onClick={(event) => {
                        event.stopPropagation();
                        setZoom(() =>
                          zooms.findIndex(
                            (zoomValue) => zoomValue.value === item.value
                          )
                        );
                      }}
                    >
                      <ControllerItem
                        selected={zoom === item.value}
                        css={css`
                          &::after {
                            content: "${item.text}";
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>
              </ControllerWrapper>
            )}
          </AnimatePresence>
          <IncreaseButton
            onIncreaseClick={(event) => {
              event.stopPropagation();
              setZoom((idx) => idx + 1);
            }}
            onDecreaseClick={(event) => {
              event.stopPropagation();
              setZoom((idx) => idx - 1);
            }}
          />
          <P3
            css={css`
              /* font-size: 0.865em; */
              line-height: 1.2;
              color: ${theme.color.text.main};
              text-align: center;
              font-weight: 700;
            `}
          >
            글씨확대
          </P3>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.23em;
            /* width: 3.85em; */
          `}
        >
          <Switch
            tabIndex={1}
            isOpen={soundOn}
            setIsOpen={(state) => setSoundOn(state)}
          />
          <P3
            css={css`
              /* font-size: 0.865em; */
              line-height: 1.2;
              color: ${theme.color.text.main};
              text-align: center;
              font-weight: 700;
            `}
          >
            음성지원
          </P3>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.23em;
            /* width: 3.85em; */
            position: relative;
          `}
        >
          <AnimatePresence mode="wait">
            {tooltipMode === "sound" && (
              <ControllerWrapper
                onClick={(event) => event.stopPropagation()}
                {...fadeInOutVariants}
              >
                <P3
                  css={css`
                    /* font-size: 1.12rem; */
                  `}
                >
                  음량조절
                </P3>
                <div
                  css={css`
                    display: flex;
                    padding: 0 2rem;
                    justify-content: center;
                    column-gap: 0.36rem;
                    align-items: center;
                    position: relative;
                  `}
                >
                  <div
                    css={css`
                      border: none;
                      background-color: transparent;
                      display: flex;
                      align-items: center;
                      margin-right: 0.44rem;
                      aspect-ratio: 1/1;
                      border-radius: 9999rem;
                    `}
                    onClick={(event) => {
                      event.stopPropagation();
                      setVolumnAction(volIndex - 1);
                    }}
                  >
                    <ControllerIcon
                      css={css`
                        width: 1.4rem;
                        height: 0.8rem;
                      `}
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="8"
                      viewBox="0 0 52 8"
                    >
                      <rect id="minus" width="52" height="8" rx="4" />
                    </ControllerIcon>
                  </div>
                  {volumeRange.map((item, volIdx) => (
                    <div
                      key={item + "volumn"}
                      css={css`
                        background-color: transparent;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border: none;
                        padding: 0;
                        padding: 0;
                        border-radius: 9999rem;
                      `}
                    >
                      <ControllerItem
                        selected={volIndex >= volIdx}
                        css={css`
                          border-radius: 9999rem;
                          width: 0.28rem;
                          height: 1.6rem;
                          aspect-ratio: 1/1;
                          border: none;
                          position: relative;
                        `}
                      />
                    </div>
                  ))}
                  <div
                    css={css`
                      border: none;
                      background-color: transparent;
                      display: flex;
                      align-items: center;
                      margin-left: 0.44rem;
                      aspect-ratio: 1/1;
                      border-radius: 9999rem;
                    `}
                    onClick={(event) => {
                      event.stopPropagation();
                      setVolumnAction(volIndex + 1);
                    }}
                  >
                    <ControllerIcon
                      css={css`
                        width: 1.4rem;
                        height: 1.4rem;
                      `}
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                    >
                      <g id="plus" transform="translate(-2914 -1964)">
                        <rect
                          id="사각형_707"
                          data-name="사각형 707"
                          width="52"
                          height="8"
                          rx="4"
                          transform="translate(2914 1986)"
                        />
                        <rect
                          id="사각형_708"
                          data-name="사각형 708"
                          width="52"
                          height="8"
                          rx="4"
                          transform="translate(2944 1964) rotate(90)"
                        />
                      </g>
                    </ControllerIcon>
                  </div>
                </div>
              </ControllerWrapper>
            )}
          </AnimatePresence>
          <IncreaseButton
            onIncreaseClick={(event) => {
              event.stopPropagation();
              setVolumnAction(volIndex + 1);
            }}
            onDecreaseClick={(event) => {
              event.stopPropagation();
              setVolumnAction(volIndex - 1);
            }}
          />
          <P3
            css={css`
              /* font-size: 0.865em; */
              line-height: 1.2;
              color: ${theme.color.text.main};
              text-align: center;
              font-weight: 700;
            `}
          >
            음량조절
          </P3>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.23em;
            /* width: 3.85em; */
            position: relative;
          `}
        >
          <AnimatePresence mode="wait">
            {tooltipMode === "speed" && (
              <ControllerWrapper
                onClick={(event) => event.stopPropagation()}
                {...fadeInOutVariants}
              >
                <P3
                  css={css`
                    /* font-size: 1.12rem; */
                  `}
                >
                  음성속도
                </P3>
                <div
                  css={css`
                    display: flex;
                    padding: 0 2rem;
                    justify-content: space-between;
                    align-items: center;
                    position: relative;
                    & button + button {
                      position: relative;
                      &::before {
                        content: "";
                        position: absolute;
                        top: 50%;
                        left: 0%;
                        transform: translate(-100%, -50%);
                        width: calc(100% + 4rem);
                        background-color: gray;
                        height: 4px;
                      }
                    }
                  `}
                >
                  {soundSpeed.map((item, speedIdx) => (
                    <button
                      key={item.text + "speed"}
                      css={css`
                        background-color: transparent;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        border: none;
                        padding: 0;
                        padding: 0;
                        border-radius: 9999rem;
                      `}
                      onClick={(event) => {
                        event.stopPropagation();
                        setSoundSpeed(() =>
                          soundSpeed.findIndex(
                            (soundValue) => soundValue.value === item.value
                          )
                        );
                      }}
                    >
                      <ControllerItem
                        selected={selectedSoundSpeedIndex === speedIdx}
                        css={css`
                          border-radius: 9999rem;
                          width: 0.8rem;
                          aspect-ratio: 1/1;
                          border: none;
                          position: relative;
                          &::after {
                            content: "${item.text}";
                          }
                        `}
                      />
                    </button>
                  ))}
                </div>
              </ControllerWrapper>
            )}
          </AnimatePresence>
          <IncreaseButton
            onIncreaseClick={(event) => {
              event.stopPropagation();
              setSoundSpeed((idx) => idx + 1);
            }}
            onDecreaseClick={(event) => {
              event.stopPropagation();
              setSoundSpeed((idx) => idx - 1);
            }}
          />
          <P3
            css={css`
              /* font-size: 0.865em; */
              line-height: 1.2;
              color: ${theme.color.text.main};
              text-align: center;
              font-weight: 700;
            `}
          >
            음성속도
          </P3>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            row-gap: 0.23em;
            /* width: 3.85em; */
          `}
        >
          <Switch
            tabIndex={1}
            disabled={!SIGN_SUPPORT_PATH.includes(pathname)}
            isOpen={signOn}
            setIsOpen={(state) => setSignOn(state)}
          />
          <P3
            css={css`
              /* font-size: 0.865em; */
              line-height: 1.2;
              color: ${theme.color.text.main};
              text-align: center;
              font-weight: 700;
            `}
          >
            수어
          </P3>
        </div>
      </div>
    </BottomWrapper>
  );
};

export default BottomBar;

const BottomWrapper = styled.div`
  position: relative;
  box-shadow: 0px -0.15em 0.15em rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 1fr fit-content(50%);
  padding: 1.85dvh 2.1dvw 1.4dvh;
  font-size: 3dvh;
  /* gap: 0.6em; */
  flex-wrap: wrap;
  z-index: 1;
  width: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.color.background.secondary};
  max-height: 4em;
`;

const ControllerWrapper = styled(motion.div)`
  position: absolute;
  top: calc(-100% - 2.5rem);
  box-shadow: 0 0 0.9rem rgba(0, 0, 0, 0.8);
  width: 16rem;
  height: 5.4rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  left: calc(-5.5rem);
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  padding-top: 0.8rem;
  background-color: ${(props) => props.theme.color.secondary.foreground};
`;

const ControllerItem = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected
      ? props.theme.color.accent.foreground
      : props.theme.color.switch.disable};
  border-radius: 9999rem;
  width: 0.8rem;
  aspect-ratio: 1/1;
  border: none;
  position: relative;
  &::after {
    white-space: nowrap;
    pointer-events: none;
    position: absolute;
    color: ${(props) =>
      props.selected
        ? props.theme.color.accent.foreground
        : props.theme.color.text.main};
    left: 50%;
    transform: translateX(-50%);
    top: 100%;
    font-family: "Pretendard";
    font-size: 1.12rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 700;
    margin-top: 0.2rem;
  }
`;

const ControllerIcon = styled.svg`
  fill: ${(props) => props.theme.color.icon.badge};
`;
