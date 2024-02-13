/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import { H1 } from "@/components/ui/text";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode, useState } from "react";
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
          <MemoryRoadContent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={memoryItems[selected].title}
          >
            {Description}
          </MemoryRoadContent>
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
  margin-top: 2.4rem;
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

const memorySummaryComponents: {
  [key in (typeof memoryItems)[number]["title"]]: ReactNode;
} = {
  단원고등학교: <></>,
  "(가칭)4.16생명안전공원": <></>,
  "4.16기억전시관": <></>,
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
  "단원고4.16기억교실": <></>,
};
