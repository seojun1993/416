/** @jsxImportSource @emotion/react */

import { css, useTheme } from "@emotion/react";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Switch from "../common/switch";
import { useSettingStore, zooms } from "@/contexts/setting.store";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInOutVariants } from "@/variants";
import { sendA11yEvent } from "@/libs/utils";

const SIGN_SUPPORT_PATH = ["/memory-class"];

const BottomBar = () => {
  const timeoutId = useRef<NodeJS.Timeout>();
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
      <SquareButton
        data-a11y-id="home"
        active={pathname === "/"}
        data-disabled-outline
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
        홈
      </SquareButton>

      <SquareButton
        data-a11y-id="menu"
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
      </SquareButton>
      <SquareButton
        onFocus={(event) => {
          timeoutId.current = setTimeout(() => {
            sendA11yEvent("back");
          }, 150);
        }}
        onClick={(event) => {
          clearTimeout(timeoutId.current);
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
      </SquareButton>
      <SquareButton
        onFocus={(event) => {
          timeoutId.current = setTimeout(() => {
            sendA11yEvent("front");
          }, 150);
        }}
        onClick={() => {
          clearTimeout(timeoutId.current);
          window.history.forward();
        }}
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
      </SquareButton>
      <SquareButton
        data-a11y-id="contrast"
        css={css`
          color: ${themeMode === "dark"
            ? theme.color.accent.foreground
            : theme.color.text.main};
          fill: ${themeMode === "dark"
            ? theme.color.accent.foreground
            : theme.color.text.main};
        `}
        onClick={() => {
          sendA11yEvent(themeMode === "light" ? "contrast_off" : "contrast_on");
          toggleTheme();
        }}
        icon={
          themeMode === "light" ? (
            <div
              css={css`
                aspect-ratio: 1/1;
                display: flex;
                align-items: center;
              `}
            >
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
                      fill="currentColor"
                    />
                    <path
                      id="햇살"
                      data-name="햇살"
                      d="M34.746,67.873V58.4A2.127,2.127,0,1,1,39,58.4v9.471a2.127,2.127,0,0,1-4.254,0ZM9.168,61.68a2.011,2.011,0,0,1,0-2.912l7.019-6.794a2.179,2.179,0,0,1,3.009,0,2.012,2.012,0,0,1,0,2.911l-7.02,6.794a2.177,2.177,0,0,1-3.008,0ZM2.059,37.058a2.059,2.059,0,0,1,0-4.118H12.124a2.059,2.059,0,0,1,0,4.118ZM16.187,18.023l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0L19.2,15.112a2.011,2.011,0,0,1,0,2.912,2.177,2.177,0,0,1-3.008,0ZM34.746,11.6V2.127a2.127,2.127,0,0,1,4.254,0V11.6a2.127,2.127,0,0,1-4.254,0Z"
                      transform="translate(309 1618.555)"
                      fill="currentColor"
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
                    fill="currentColor"
                  />
                  <path
                    id="합치기_1"
                    data-name="합치기 1"
                    d="M34.746,67.873V58.4A2.127,2.127,0,1,1,39,58.4v9.471a2.127,2.127,0,0,1-4.254,0ZM9.168,61.68a2.011,2.011,0,0,1,0-2.912l7.019-6.794a2.179,2.179,0,0,1,3.009,0,2.012,2.012,0,0,1,0,2.911l-7.02,6.794a2.177,2.177,0,0,1-3.008,0ZM2.059,37.058a2.059,2.059,0,0,1,0-4.118H12.124a2.059,2.059,0,0,1,0,4.118ZM16.187,18.023l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0L19.2,15.112a2.011,2.011,0,0,1,0,2.912,2.177,2.177,0,0,1-3.008,0ZM34.746,11.6V2.127a2.127,2.127,0,0,1,4.254,0V11.6a2.127,2.127,0,0,1-4.254,0Z"
                    transform="translate(309 1618.555)"
                    fill="currentColor"
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
                    fill="currentColor"
                  />
                  <path
                    id="합치기_1-2"
                    data-name="합치기 1"
                    d="M34.744,67.872V58.4A2.128,2.128,0,0,1,39,58.4v9.471a2.128,2.128,0,0,1-4.255,0ZM9.167,61.682a2.013,2.013,0,0,1,0-2.912l7.02-6.793a2.176,2.176,0,0,1,3.008,0,2.012,2.012,0,0,1,0,2.911l-7.019,6.794a2.179,2.179,0,0,1-3.009,0ZM2.058,37.059a2.059,2.059,0,0,1,0-4.118H12.122a2.059,2.059,0,1,1,0,4.118ZM16.187,18.025l-7.02-6.794a2.012,2.012,0,0,1,0-2.911,2.179,2.179,0,0,1,3.009,0l7.02,6.793a2.013,2.013,0,0,1,0,2.912,2.179,2.179,0,0,1-3.009,0ZM34.744,11.6V2.127a2.128,2.128,0,0,1,4.255,0V11.6a2.128,2.128,0,0,1-4.255,0Z"
                    transform="translate(39 70) rotate(180)"
                    fill="currentColor"
                  />
                </g>
              </g>
            </svg>
          )
        }
      >
        고대비
      </SquareButton>
      <SquareButton
        key="searchButton"
        active={pathname === "/search"}
        onFocus={() => {
          timeoutId.current = setTimeout(() => {
            sendA11yEvent("search");
          }, 150);
        }}
        onClick={() => {
          clearTimeout(timeoutId.current);
          pathname === "/search" ? navigate(-1) : navigate("search");
        }}
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
      </SquareButton>
      <SquareButton
        data-a11y-id="글씨크기 선택"
        onClick={(event) => {
          event.stopPropagation();
          setTooltipMode("text");
        }}
        topEl={
          <AnimatePresence mode="wait">
            {tooltipMode === "text" && (
              <ControllerWrapper
                {...fadeInOutVariants}
                onClick={(event) => event.stopPropagation()}
              >
                {zooms.map((item) => (
                  <Button
                    data-a11y-id={
                      item.text.replace("x", "").replace(".0", "") + "배"
                    }
                    active={zoom === item.value}
                    key={item.text + "sign"}
                    onClick={(event) => {
                      event.stopPropagation();
                      setZoom(() =>
                        zooms.findIndex(
                          (zoomValue) => zoomValue.value === item.value
                        )
                      );
                    }}
                  >
                    {item.text.replace("x", "")}
                  </Button>
                ))}
              </ControllerWrapper>
            )}
          </AnimatePresence>
        }
        icon={
          <div
            data-disable-focus-effect
            data-disabled-outline
            css={css`
              width: 5rem;
              height: 2rem;
              font-size: 1.12rem;
              border-radius: 1rem;
              display: flex;
              align-items: center;
              justify-content: center;
              border: none;
              background-color: white;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              font-weight: bold;
              color: black;
            `}
          >
            {zooms
              .find((v) => v.value === zoom)
              ?.text?.replace("x", "")
              .replace(".0", "") ?? ""}
          </div>
        }
      >
        글씨크기
      </SquareButton>

      <SquareButton
        data-a11y-id="음량 선택"
        onClick={(event) => {
          event.stopPropagation();
          setTooltipMode("sound");
        }}
        icon={
          <div
            data-disable-focus-effect
            data-disabled-outline
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 5rem;
              height: 2rem;
              font-size: 1.12rem;
              border-radius: 1rem;
              border: none;
              background-color: white;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              font-weight: bold;
              color: black;
            `}
          >
            {100 -
              volumeRange.findIndex(
                (_, volumeIndex) => volumeIndex === volIndex
              ) *
                20}
          </div>
        }
      >
        <AnimatePresence mode="wait">
          {tooltipMode === "sound" && (
            <ControllerWrapper
              onClick={(event) => event.stopPropagation()}
              {...fadeInOutVariants}
            >
              {volumeRange.map((item, volIdx) => (
                <Button
                  data-a11y-id={100 - volIdx * 20}
                  active={volIndex === volIdx}
                  key={item + "volumn" + volIdx}
                  onClick={(event) => {
                    event.stopPropagation();

                    setVolumnAction(volIdx);
                  }}
                >
                  {100 - volIdx * 20}
                </Button>
              ))}
            </ControllerWrapper>
          )}
        </AnimatePresence>
        음량선택
      </SquareButton>

      <SquareButton
        data-a11y-id="음성속도"
        onClick={(event) => {
          event.stopPropagation();
          setTooltipMode("speed");
        }}
        icon={
          <div
            data-disable-focus-effect
            data-disabled-outline
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
              width: 5rem;
              height: 2rem;
              font-size: 1.12rem;
              border-radius: 1rem;
              border: none;
              background-color: white;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
              font-weight: bold;
              color: black;
            `}
          >
            {soundSpeed[selectedSoundSpeedIndex].text}
          </div>
        }
      >
        <AnimatePresence mode="wait">
          {tooltipMode === "speed" && (
            <ControllerWrapper
              css={css`
                max-height: calc(100dvh - (var(--bottom-height)));
              `}
              onClick={(event) => event.stopPropagation()}
              {...fadeInOutVariants}
            >
              {soundSpeed.map((item, soundSpeedIdx) => (
                <Button
                  data-a11y-id={
                    item.text.replace("x", "").replace(".0", "") + "배속"
                  }
                  active={selectedSoundSpeedIndex === soundSpeedIdx}
                  key={item.text + "speed"}
                  onClick={(event) => {
                    event.stopPropagation();

                    setSoundSpeed(() =>
                      soundSpeed.findIndex(
                        (soundValue) => soundValue.value === item.value
                      )
                    );
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </ControllerWrapper>
          )}
        </AnimatePresence>
        음성속도
      </SquareButton>
      <SquareButton
        disabled={!SIGN_SUPPORT_PATH.includes(pathname)}
        data-a11y-id="sign_language"
        onClick={() => {
          sendA11yEvent(signOn ? "sign_language_off" : "sign_language_on");
          setSignOn(!signOn);
        }}
        css={css`
          display: flex;
          flex-direction: column;
          row-gap: 0.23em;
          /* width: 3.85em; */
        `}
        icon={
          <Switch
            disabled={!SIGN_SUPPORT_PATH.includes(pathname)}
            isOpen={signOn}
            setIsOpen={(state) => setSignOn(state)}
          />
        }
      >
        수어안내
      </SquareButton>
    </BottomWrapper>
  );
};

export default BottomBar;

const BottomWrapper = styled.div`
  position: relative;
  box-shadow: 0px -0.15em 0.15em rgba(0, 0, 0, 0.1);
  display: flex;
  z-index: 10;
  background-color: #666666;
  height: 5.2rem;
  column-gap: 0.2rem;
`;

const ControllerWrapper = styled(motion.div)`
  position: absolute;
  bottom: calc(100%);
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0.9rem rgba(0, 0, 0, 0.8);
  width: 100%;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  padding: 2rem 1.3rem;
  background-color: ${(props) => props.theme.color.background.secondary};
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

interface SquareButtonProps extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode;
  topEl?: ReactNode;
  active?: boolean;
}

const SquareButton = ({
  icon,
  topEl,
  active = false,
  ...props
}: SquareButtonProps) => {
  return (
    <SquareButtonWrapper
      data-disable-focus-effect
      {...props}
      active={active}
      data-disabled-outline
    >
      {topEl}
      <div
        css={css`
          display: flex;
          align-items: flex-end;
          justify-content: center;
          width: 100%;
          height: 100%;
        `}
      >
        <div
          css={css`
            height: 1.4rem;
            display: flex;
            align-items: center;
          `}
        >
          {icon}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        `}
      >
        {props.children && (
          <SquareButtonChildSpan>{props.children}</SquareButtonChildSpan>
        )}
      </div>
    </SquareButtonWrapper>
  );
};

const SquareButtonWrapper = styled.button<{ active?: boolean }>`
  border: none;
  outline: none;
  padding-block: 0;
  padding-inline: 0;
  height: 100%;
  position: relative;
  flex: 6;
  grid-template-rows: 1fr 2.6rem;
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) =>
    props.active
      ? props.theme.color.accent.foreground
      : props.theme.color.text.main};
  fill: ${(props) =>
    props.active
      ? props.theme.color.accent.foreground
      : props.theme.color.text.main};
  > * {
    transition: background-color 0.1s ease-in-out;
    width: 100;
  }
  &:focus-visible,
  &:focus {
    outline: 0.2em solid ${(props) => props.theme.color.accent.foreground} !important;
    outline-offset: -0.2rem;
  }
  &:focus {
    outline: none;
  }
  &:active {
    color: ${(props) => props.theme.color.accent.foreground};
    svg * {
      fill: ${(props) => props.theme.color.accent.foreground};
    }
  }
`;

const SquareButtonChildSpan = styled.span`
  white-space: nowrap;
  /* font-size: 0.68em; */
  font-size: calc(var(--font-size) * 1.12);
  font-weight: bold;
  line-height: 0.65em;
`;

const Button = styled.button<{ active?: boolean }>`
  border-radius: 999rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  height: 2rem;
  box-shadow: 0px 0px 0.3em rgb(0, 0, 0, 0.2);
  transition: background-color 0.1s ease-in-out;
  color: ${(props) => props.theme.color.text.main};
  font-size: calc(var(--font-size) * 1.12);
  background-color: white;
  font-weight: 700;
  background-color: ${(props) =>
    props.active ? props.theme.color.accent.foreground : "white"};
  color: ${(props) =>
    props.theme.themeMode === "dark"
      ? "black"
      : props.active
      ? "white"
      : "black"};
`;

// 음성안내 버튼
// <SquareButton
//         data-a11y-id="voice"
//         onClick={() => setSoundOn(!soundOn)}
//         css={css`
//           display: flex;
//           flex-direction: column;
//           row-gap: 0.23em;
//           /* width: 3.85em; */
//         `}
//         icon={
//           <Switch
//             tabIndex={1}
//             isOpen={soundOn}
//             setIsOpen={(state) => setSoundOn(state)}
//           />
//         }
//       >
//         음성안내
//       </SquareButton>
