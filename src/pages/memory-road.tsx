/** @jsxImportSource @emotion/react */
import maps from "@/assets/images/maps";
import { MainShell } from "@/components/common/main-shell";
import { H1, P3 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useAnimate,
} from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";

const memoryItems = [
  { title: "기억과 약속의 길" as const },
  { title: "단원고4.16기억교실" as const },
  { title: "단원고등학교" as const },
  { title: "4.16기억전시관" as const },
  { title: "(가칭)4.16생명안전공원" as const },
];

const MemoryRoad = () => {
  const [selected, setSelected] = useState(0);
  const Description = memorySummaryComponents[memoryItems[selected].title];
  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>기억과 약속의 길</H1>
      </MemoryHeader>
      <MemoryListButton
        selected={selected === 0}
        onClick={() => setSelected(0)}
      >
        기억과 약속의 길
      </MemoryListButton>
      <MemoryListSmallButtons>
        {memoryItems.slice(1, memoryItems.length).map((item, index) => (
          <MemoryListButton
            key={item.title}
            selected={index + 1 === selected}
            onClick={() => setSelected(index + 1)}
          >
            {item.title}
          </MemoryListButton>
        ))}
      </MemoryListSmallButtons>
      <LazyMotion features={domAnimation}>
        <AnimatePresence mode="wait">
          {selected === 0 ? (
            <MemoryRoadContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={memoryItems[selected].title}
            >
              {Description}
            </MemoryRoadContent>
          ) : (
            <MemoryRoadContent>
              <RoadMapInfo
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img
                  css={css`
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                  `}
                  src={maps.light}
                />
                <RoadRoute selected={selected} />
              </RoadMapInfo>
              <AnimatePresence mode="wait">
                <m.div
                  key={selected}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {Description}
                </m.div>
              </AnimatePresence>
            </MemoryRoadContent>
          )}
        </AnimatePresence>
      </LazyMotion>
    </MemoryShell>
  );
};

export default MemoryRoad;

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-left: 7.6rem;
  padding-right: 7.6rem;
  padding-bottom: 1.6rem;
`;
const MemoryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;
`;

const MemoryListButton = styled.button<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.12rem;
  font-weight: 800;
  width: 100%;
  height: 2.6rem;
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border};
  border-width: 0.15rem;
  border-style: solid;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;
  border-color: ${(props) =>
    props.selected ? props.theme.color.yellow : "white"};
  color: ${(props) => (props.selected ? props.theme.color.yellow : "white")};
`;

const MemoryListSmallButtons = styled.div`
  display: flex;
  width: 100%;
  column-gap: 1rem;
  margin-top: 1rem;
`;

const MemoryRoadContent = styled(m.div)`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  flex-grow: 1;
  margin-top: 2.46rem;
`;

const MemoryRoadAccentText = styled.b`
  color: ${(props) => props.theme.color.yellow};
`;
const MemoryRoadContentTitle = styled.h1`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 1.32);
  text-align: center;
  margin-bottom: 0.2rem;
`;
const MemoryRoadContentDescription = styled.p`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 1.12);
  text-align: center;
`;

const MemoryBadge = styled.div`
  height: 6rem;
  width: 17rem;
  border-radius: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.color.badge.background};
`;
const MemoryQRDescription = styled.p`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 1.12);
  line-height: 1.2;
  margin-left: 0.6rem;
  color: ${(props) => props.theme.color.text.main};
  b {
    color: ${(props) =>
      props.theme.themeMode === "dark" ? props.theme.color.yellow : "black"};
  }
`;

const CallIcon = styled.svg`
  g,
  path,
  rect {
    stroke: ${(props) =>
      props.theme.themeMode === "light" ? "#666666" : "white"};
  }
  path {
    fill: ${(props) =>
      props.theme.themeMode === "light" ? "#666666" : "white"};
  }
`;

const RoadMapInfo = styled(m.div)`
  background-color: ${(props) => props.theme.color.background.card};
  text-decoration: none;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 26rem;
  height: 100%;
  border-radius: 0.8rem;
`;

function RoadRoute({ selected }: { selected: number }) {
  const [toSculptureScope, sculptureAnimate] = useAnimate<SVGSVGElement>();
  const [toMemory, memoryAnimate] = useAnimate<SVGSVGElement>();
  const [toLast, lastAnimate] = useAnimate<SVGSVGElement>();
  const prevSelected = useRef(selected);
  useEffect(() => {
    switch (selected) {
      case 1:
        break;
      case 2:
        const activaAnimation = async () => {
          await sculptureAnimate(
            toSculptureScope.current,
            {
              strokeDasharray: 350,
              strokeLinecap: "round",
              strokeDashoffset: 300,
            },
            { duration: prevSelected.current > selected ? 0 : 1 }
          );
          await sculptureAnimate("#다각형_36", {
            opacity: 1,
          });
        };
        activaAnimation();
        break;
      default:
        const exitAnimation = async () => {
          await sculptureAnimate(
            toSculptureScope.current,
            {
              strokeDasharray: 2,
              strokeLinecap: "round",
              strokeDashoffset: 295,
            },
            {
              duration: 0,
            }
          );
          await sculptureAnimate("#다각형_36", {
            opacity: 0,
          });
          console.log("??");
        };
        exitAnimation();
    }
    switch (selected) {
      case 1:
      case 2:
        break;
      case 3:
        const activaAnimation = async () => {
          await memoryAnimate(
            toMemory.current,
            {
              strokeDasharray: 350,
              strokeLinecap: "round",
              strokeDashoffset: 300,
            },
            { duration: prevSelected.current > selected ? 0 : 1 }
          );
          await memoryAnimate("#다각형_36", {
            opacity: 1,
          });
        };
        activaAnimation();
        break;
      default:
        const exitAnimation = async () => {
          await memoryAnimate(
            toMemory.current,
            {
              strokeDasharray: 5,
              strokeLinecap: "round",
              strokeDashoffset: 305,
            },
            {
              duration: 0,
            }
          );
          await memoryAnimate("#다각형_36", {
            opacity: 0,
          });
        };
        exitAnimation();
    }
    switch (selected) {
      case 1:
      case 2:
      case 3:
        break;
      case 4:
        const activaAnimation = async () => {
          await lastAnimate(
            toLast.current,
            {
              strokeDasharray: 350,
              strokeLinecap: "round",
              strokeDashoffset: 300,
            },
            { duration: prevSelected.current > selected ? 0 : 1 }
          );
          await lastAnimate("#다각형_36", {
            opacity: 1,
          });
        };
        activaAnimation();
        break;
      default:
        const exitAnimation = async () => {
          await lastAnimate(
            toLast.current,
            {
              strokeDasharray: 5,
              strokeLinecap: "round",
              strokeDashoffset: 300,
            },
            {
              duration: 0,
            }
          );
          await lastAnimate("#다각형_36", {
            opacity: 0,
          });
        };
        exitAnimation();
    }

    prevSelected.current = selected;
  }, [selected]);

  return (
    <div
      css={css`
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        css={css`
          position: absolute;
          left: 35%;
          top: 0.5%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            row-gap: 0.1rem;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              (단윈고)
            </P3>
          </div>
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              추모조형물
            </P3>
          </div>
        </div>
        <div
          css={css`
            position: absolute;
            aspect-ratio: 1/1;
            width: 0.916rem;
            height: 0.916rem;
            border-radius: 9999rem;
            z-index: 1;
            ${selected !== 2
              ? `
            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);`
              : ""}

            right: -2rem;
            bottom: 30%;
          `}
        >
          <svg
            className="bounce-down"
            css={css`
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.2s ease-in-out;
              ${selected === 2 && "opacity: 1"}
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="105.999"
            height="127.093"
            viewBox="0 0 105.999 127.093"
          >
            <defs>
              <filter
                id="빼기_4"
                x="0"
                y="0"
                width="105.999"
                height="127.093"
                filterUnits="userSpaceOnUse"
              >
                <feOffset in="SourceAlpha" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodOpacity="0.8" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#빼기_4)">
              <path
                id="빼기_4-2"
                data-name="빼기 4"
                d="M15698.323-3952.782h0a127.544,127.544,0,0,1-10.627-10.266,163.879,163.879,0,0,1-12.36-14.891,100.8,100.8,0,0,1-10.24-16.979c-2.832-6.163-4.269-11.726-4.269-16.532a36.962,36.962,0,0,1,2.946-14.532,37.219,37.219,0,0,1,8.036-11.866,37.386,37.386,0,0,1,11.92-8,37.411,37.411,0,0,1,14.6-2.934,37.413,37.413,0,0,1,14.6,2.934,37.4,37.4,0,0,1,11.921,8,37.216,37.216,0,0,1,8.036,11.866,36.96,36.96,0,0,1,2.946,14.532c0,4.806-1.366,10.215-4.06,16.074a93.5,93.5,0,0,1-9.892,16.215c-7.3,9.855-16,18.865-23.549,26.379Zm.149-84a26.7,26.7,0,0,0-10.482,2.123,26.835,26.835,0,0,0-8.559,5.788,26.919,26.919,0,0,0-5.771,8.585,26.9,26.9,0,0,0-2.116,10.513,26.9,26.9,0,0,0,2.116,10.513,26.914,26.914,0,0,0,5.771,8.585,26.83,26.83,0,0,0,8.559,5.788,26.7,26.7,0,0,0,10.482,2.123,26.711,26.711,0,0,0,10.485-2.123,26.816,26.816,0,0,0,8.56-5.788,26.911,26.911,0,0,0,5.772-8.585,26.9,26.9,0,0,0,2.116-10.513,26.9,26.9,0,0,0-2.116-10.513,26.911,26.911,0,0,0-5.772-8.585,26.82,26.82,0,0,0-8.56-5.788A26.711,26.711,0,0,0,15698.473-4036.781Z"
                transform="translate(-15645.33 4064.28)"
                fill="#fff500"
                stroke="rgba(0,0,0,0)"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
      <div
        css={css`
          position: absolute;
          left: 15%;
          top: 48%;
        `}
      >
        <div
          css={css`
            position: absolute;
            aspect-ratio: 1/1;
            width: 0.916rem;
            height: 0.916rem;
            border-radius: 9999rem;
            z-index: 1;
            ${selected !== 4
              ? `
            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);`
              : ""}
            right: 40%;
            top: -40%;
          `}
        >
          <svg
            className="bounce-down"
            css={css`
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.2s ease-in-out;
              ${selected === 4 && "opacity: 1"}
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="105.999"
            height="127.093"
            viewBox="0 0 105.999 127.093"
          >
            <defs>
              <filter
                id="빼기_4"
                x="0"
                y="0"
                width="105.999"
                height="127.093"
                filterUnits="userSpaceOnUse"
              >
                <feOffset in="SourceAlpha" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodOpacity="0.8" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#빼기_4)">
              <path
                id="빼기_4-2"
                data-name="빼기 4"
                d="M15698.323-3952.782h0a127.544,127.544,0,0,1-10.627-10.266,163.879,163.879,0,0,1-12.36-14.891,100.8,100.8,0,0,1-10.24-16.979c-2.832-6.163-4.269-11.726-4.269-16.532a36.962,36.962,0,0,1,2.946-14.532,37.219,37.219,0,0,1,8.036-11.866,37.386,37.386,0,0,1,11.92-8,37.411,37.411,0,0,1,14.6-2.934,37.413,37.413,0,0,1,14.6,2.934,37.4,37.4,0,0,1,11.921,8,37.216,37.216,0,0,1,8.036,11.866,36.96,36.96,0,0,1,2.946,14.532c0,4.806-1.366,10.215-4.06,16.074a93.5,93.5,0,0,1-9.892,16.215c-7.3,9.855-16,18.865-23.549,26.379Zm.149-84a26.7,26.7,0,0,0-10.482,2.123,26.835,26.835,0,0,0-8.559,5.788,26.919,26.919,0,0,0-5.771,8.585,26.9,26.9,0,0,0-2.116,10.513,26.9,26.9,0,0,0,2.116,10.513,26.914,26.914,0,0,0,5.771,8.585,26.83,26.83,0,0,0,8.559,5.788,26.7,26.7,0,0,0,10.482,2.123,26.711,26.711,0,0,0,10.485-2.123,26.816,26.816,0,0,0,8.56-5.788,26.911,26.911,0,0,0,5.772-8.585,26.9,26.9,0,0,0,2.116-10.513,26.9,26.9,0,0,0-2.116-10.513,26.911,26.911,0,0,0-5.772-8.585,26.82,26.82,0,0,0-8.56-5.788A26.711,26.711,0,0,0,15698.473-4036.781Z"
                transform="translate(-15645.33 4064.28)"
                fill="#fff500"
                stroke="rgba(0,0,0,0)"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 0.1rem;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              (가칭)4.16
            </P3>
          </div>
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              생명안전공원
            </P3>
          </div>
        </div>
      </div>
      <div
        css={css`
          position: absolute;
          left: 21%;
          top: 21%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            row-gap: 0.1rem;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              4.16
            </P3>
          </div>
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              기억전시관
            </P3>
          </div>
        </div>
        <div
          css={css`
            position: absolute;
            aspect-ratio: 1/1;
            width: 0.916rem;
            height: 0.916rem;
            border-radius: 9999rem;
            z-index: 1;
            ${selected !== 3
              ? `
            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);`
              : ""}
            right: -30%;
            bottom: 7%;
          `}
        >
          <svg
            className="bounce-down"
            css={css`
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.2s ease-in-out;
              ${selected === 3 && "opacity: 1"}
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="105.999"
            height="127.093"
            viewBox="0 0 105.999 127.093"
          >
            <defs>
              <filter
                id="빼기_4"
                x="0"
                y="0"
                width="105.999"
                height="127.093"
                filterUnits="userSpaceOnUse"
              >
                <feOffset in="SourceAlpha" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodOpacity="0.8" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#빼기_4)">
              <path
                id="빼기_4-2"
                data-name="빼기 4"
                d="M15698.323-3952.782h0a127.544,127.544,0,0,1-10.627-10.266,163.879,163.879,0,0,1-12.36-14.891,100.8,100.8,0,0,1-10.24-16.979c-2.832-6.163-4.269-11.726-4.269-16.532a36.962,36.962,0,0,1,2.946-14.532,37.219,37.219,0,0,1,8.036-11.866,37.386,37.386,0,0,1,11.92-8,37.411,37.411,0,0,1,14.6-2.934,37.413,37.413,0,0,1,14.6,2.934,37.4,37.4,0,0,1,11.921,8,37.216,37.216,0,0,1,8.036,11.866,36.96,36.96,0,0,1,2.946,14.532c0,4.806-1.366,10.215-4.06,16.074a93.5,93.5,0,0,1-9.892,16.215c-7.3,9.855-16,18.865-23.549,26.379Zm.149-84a26.7,26.7,0,0,0-10.482,2.123,26.835,26.835,0,0,0-8.559,5.788,26.919,26.919,0,0,0-5.771,8.585,26.9,26.9,0,0,0-2.116,10.513,26.9,26.9,0,0,0,2.116,10.513,26.914,26.914,0,0,0,5.771,8.585,26.83,26.83,0,0,0,8.559,5.788,26.7,26.7,0,0,0,10.482,2.123,26.711,26.711,0,0,0,10.485-2.123,26.816,26.816,0,0,0,8.56-5.788,26.911,26.911,0,0,0,5.772-8.585,26.9,26.9,0,0,0,2.116-10.513,26.9,26.9,0,0,0-2.116-10.513,26.911,26.911,0,0,0-5.772-8.585,26.82,26.82,0,0,0-8.56-5.788A26.711,26.711,0,0,0,15698.473-4036.781Z"
                transform="translate(-15645.33 4064.28)"
                fill="#fff500"
                stroke="rgba(0,0,0,0)"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
      <div
        css={css`
          position: absolute;
          right: 6%;
          bottom: 13%;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 0.1rem;
          `}
        >
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              단원고4.16
            </P3>
          </div>
          <div
            css={css`
              background-color: rgba(0, 0, 0, 0.5);
              width: fit-content;
            `}
          >
            <P3
              css={css`
                color: white;
                text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
              `}
            >
              기억교실
            </P3>
          </div>
        </div>
        <div
          css={css`
            position: absolute;
            aspect-ratio: 1/1;
            width: 0.916rem;
            height: 0.916rem;
            border-radius: 9999rem;
            z-index: 1;
            ${selected !== 1
              ? `
            background-color: white;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);`
              : ""}

            right: 40%;
            top: -50%;
          `}
        >
          <svg
            className="bounce-down"
            css={css`
              position: absolute;
              left: 50%;
              top: 0;
              transform: translate(-50%, -50%);
              opacity: 0;
              transition: opacity 0.2s ease-in-out;
              ${selected === 1 && "opacity: 1"}
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="105.999"
            height="127.093"
            viewBox="0 0 105.999 127.093"
          >
            <defs>
              <filter
                id="빼기_4"
                x="0"
                y="0"
                width="105.999"
                height="127.093"
                filterUnits="userSpaceOnUse"
              >
                <feOffset in="SourceAlpha" />
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feFlood floodOpacity="0.8" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#빼기_4)">
              <path
                id="빼기_4-2"
                data-name="빼기 4"
                d="M15698.323-3952.782h0a127.544,127.544,0,0,1-10.627-10.266,163.879,163.879,0,0,1-12.36-14.891,100.8,100.8,0,0,1-10.24-16.979c-2.832-6.163-4.269-11.726-4.269-16.532a36.962,36.962,0,0,1,2.946-14.532,37.219,37.219,0,0,1,8.036-11.866,37.386,37.386,0,0,1,11.92-8,37.411,37.411,0,0,1,14.6-2.934,37.413,37.413,0,0,1,14.6,2.934,37.4,37.4,0,0,1,11.921,8,37.216,37.216,0,0,1,8.036,11.866,36.96,36.96,0,0,1,2.946,14.532c0,4.806-1.366,10.215-4.06,16.074a93.5,93.5,0,0,1-9.892,16.215c-7.3,9.855-16,18.865-23.549,26.379Zm.149-84a26.7,26.7,0,0,0-10.482,2.123,26.835,26.835,0,0,0-8.559,5.788,26.919,26.919,0,0,0-5.771,8.585,26.9,26.9,0,0,0-2.116,10.513,26.9,26.9,0,0,0,2.116,10.513,26.914,26.914,0,0,0,5.771,8.585,26.83,26.83,0,0,0,8.559,5.788,26.7,26.7,0,0,0,10.482,2.123,26.711,26.711,0,0,0,10.485-2.123,26.816,26.816,0,0,0,8.56-5.788,26.911,26.911,0,0,0,5.772-8.585,26.9,26.9,0,0,0,2.116-10.513,26.9,26.9,0,0,0-2.116-10.513,26.911,26.911,0,0,0-5.772-8.585,26.82,26.82,0,0,0-8.56-5.788A26.711,26.711,0,0,0,15698.473-4036.781Z"
                transform="translate(-15645.33 4064.28)"
                fill="#fff500"
                stroke="rgba(0,0,0,0)"
                strokeMiterlimit="10"
                strokeWidth="1"
              />
            </g>
          </svg>
        </div>
      </div>
      {selected > 1 && (
        <svg
          ref={toSculptureScope}
          xmlns="http://www.w3.org/2000/svg"
          width="305.108"
          height="691.922"
          viewBox="0 0 305.108 691.922"
          css={css`
            position: absolute;
            bottom: 29.3%;
            right: 16.25%;
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          `}
        >
          <g
            id="그룹_645"
            data-name="그룹 645"
            transform="translate(10.152 -40.515)"
          >
            <path
              id="패스_2100"
              data-name="패스 2100"
              d={
                selected === 2
                  ? "M1530.958,1255.918h-62.617V993.905L1353.765,974.5V628.34h-6.87l-61.44-13.823"
                  : "M1530.958,1255.918h-62.617V993.905L1353.765,974.5V628.34h-6.87l-105.849-40.181"
              }
              transform="translate(-1236.002 -533.481)"
              fill="none"
              stroke="#ff9d00"
              strokeWidth="20"
              pathLength={40}
            />
            <path
              opacity={0}
              id="다각형_36"
              data-name="다각형 36"
              d="M32.435,0,64.871,56.061H0Z"
              transform="matrix(0.174, -0.985, 0.985, 0.174, -10.152, 104.4)"
              fill="#ff9d00"
            />
          </g>
        </svg>
      )}
      {selected > 2 && (
        <svg
          ref={toMemory}
          css={css`
            position: absolute;
            top: 7.5%;
            right: 40.5%;
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          `}
          xmlns="http://www.w3.org/2000/svg"
          width="179.274"
          height="282.54"
          viewBox="0 0 179.274 282.54"
        >
          <g
            id="그룹_645"
            data-name="그룹 645"
            transform="translate(187.822 -46.558)"
          >
            <path
              opacity={0}
              id="다각형_36"
              data-name="다각형 36"
              d="M32.435,0,64.871,56.061H0Z"
              transform="translate(-148.781 329.098) rotate(-127)"
              fill="#ff9d00"
            />
            <path
              id="패스_2112"
              data-name="패스 2112"
              d={
                selected === 3
                  ? "M-16.206,52.988l-47.532,56.618v103l-62.889,57.778"
                  : "M-16.206,52.988l-47.532,56.618v103l-100.889,57.778"
              }
              fill="none"
              stroke="#ff9d00"
              stroke-width="20"
              pathLength={40}
            />
          </g>
        </svg>
      )}
      {selected > 3 && (
        <svg
          css={css`
            position: absolute;
            top: 31.5%;
            right: 56%;
            stroke-dasharray: 300;
            stroke-dashoffset: 300;
          `}
          ref={toLast}
          xmlns="http://www.w3.org/2000/svg"
          width="192.656"
          height="192.107"
          viewBox="0 0 192.656 192.107"
        >
          <g
            id="그룹_645"
            data-name="그룹 645"
            transform="translate(396.822 -290.991)"
          >
            <path
              opacity={0}
              id="다각형_36"
              data-name="다각형 36"
              d="M32.435,0,64.871,56.061H0Z"
              transform="translate(-357.781 483.098) rotate(-127)"
              fill="#ff9d00"
            />
            <path
              id="패스_2114"
              data-name="패스 2114"
              d="M-214.165,290.991v41.575h-68.141l-55.264,100.571"
              fill="none"
              stroke="#ff9d00"
              stroke-width="20"
              pathLength={40}
            />
          </g>
        </svg>
      )}
    </div>
  );
}
const memorySummaryComponents: {
  [key in (typeof memoryItems)[number]["title"]]: ReactNode;
} = {
  단원고등학교: <></>,
  "(가칭)4.16생명안전공원": <></>,
  "4.16기억전시관": (
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      me
    </div>
  ),
  "기억과 약속의 길": (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 1rem;
        flex-grow: 1;
      `}
    >
      <MemoryRoadContentTitle>
        기억과 약속의 길은 매달 셋째주 토요일에 함께 걷는 프로그램입니다.
        <br />
        <MemoryRoadAccentText>아래 QR코드</MemoryRoadAccentText>를 통해{" "}
        <MemoryRoadAccentText>사전 예약</MemoryRoadAccentText>을 하실 수
        있습니다.
      </MemoryRoadContentTitle>
      <MemoryRoadContentDescription>
        단원고4.16기억교실, 단원고등학교 추모조형물, 4.16기억전시관,
        (가칭)4.16생명안전공원 부지를
        <br />
        함께 둘러보며 걸어가는 길인 ‘기억과 약속의 길’을 운영하고 있습니다.
      </MemoryRoadContentDescription>
      <MemoryRoadContentDescription>
        전문 안내인(4.16기억저장소 유가족운영위원)의 안내로 단원고
        4.16기억교실의 존치 이유,
        <br />
        아이들과 선생님의 마지막 흔적을 마주하고 토론하기도 하며,
        <br />
        아이들이 자주 걸었던 길을 함께 걸으며 소소한 이야기를 듣는 일정입니다.
      </MemoryRoadContentDescription>
      <div
        css={css`
          flex-grow: 1;
          display: flex;
          column-gap: 1.6rem;
        `}
      >
        <MemoryBadge>
          <QRCode
            css={css`
              width: 4rem;
              height: 4rem;
              padding: 0.2rem;
              background-color: white;
            `}
            value="https://me-qr.com/ko/r22wvb5O"
          />
          <MemoryQRDescription>
            해당 QR을 통해
            <br />
            <b>사전예약이 가능</b>합니다.
          </MemoryQRDescription>
        </MemoryBadge>
        <MemoryBadge>
          <CallIcon
            css={css`
              width: 4rem;
              height: 4rem;
              padding: 0.2rem;
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="200"
            height="200"
            viewBox="0 0 200 200"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="사각형_691"
                  data-name="사각형 691"
                  width="126"
                  height="126"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </clipPath>
            </defs>
            <g id="call_icon" transform="translate(-3428 -1322)">
              <g
                id="타원_82"
                data-name="타원 82"
                transform="translate(3428 1322)"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
              >
                <circle cx="100" cy="100" r="100" stroke="none" />
                <circle cx="100" cy="100" r="96" fill="none" />
              </g>
              <g
                id="그룹_453"
                data-name="그룹 453"
                transform="translate(3465 1359)"
              >
                <g
                  id="그룹_452"
                  data-name="그룹 452"
                  clipPath="url(#clip-path)"
                >
                  <path
                    id="패스_1166"
                    data-name="패스 1166"
                    d="M104.3,40.849V33.3A33.338,33.338,0,0,0,70.995,0H49.007a33.338,33.338,0,0,0-33.3,33.3v7.548C7.018,40.994,0,47.058,0,54.5V74.921c0,7.535,7.188,13.667,16.024,13.667a11.584,11.584,0,0,0,1.292-.093l1.592-.215a33.447,33.447,0,0,0,22.658,18.307A9.715,9.715,0,0,0,50.576,120h21.99a9.742,9.742,0,0,0,0-19.484H50.576a9.683,9.683,0,0,0-6.665,2.676A29.633,29.633,0,0,1,19.484,74.136V33.3A29.556,29.556,0,0,1,49.007,3.777H70.995A29.556,29.556,0,0,1,100.518,33.3V86.7a1.889,1.889,0,0,0,1.889,1.889,1.761,1.761,0,0,0,.387-.079c.383.04.859.079,1.184.079,8.834,0,16.022-6.132,16.022-13.667V54.5c0-7.445-7.016-13.507-15.7-13.654"
                    transform="translate(3 2.999)"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                </g>
              </g>
            </g>
          </CallIcon>

          <MemoryQRDescription>
            <div
              css={css`
                margin-bottom: 0.34rem;
              `}
            >
              <b>문의사항</b>
            </div>
            <p>
              031)414-0416
              <br />
              031)410-0416
            </p>
          </MemoryQRDescription>
        </MemoryBadge>
      </div>
    </div>
  ),
  "단원고4.16기억교실": (
    <div
      css={css`
        flex-grow: 1;
      `}
    >
      416
    </div>
  ),
};
