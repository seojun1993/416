/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import { H1, H4, P3 } from "@/components/ui/text";
import { useSettingStore } from "@/contexts/setting.store";
import { useA11y } from "@/hooks/use-a11y";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useEffect, useState } from "react";
import manualImage from "@/assets/images/manual";
import ImageX from "@/components/ui/image";
import { fadeInOutVariants } from "@/variants";
const memoryItems = [
  {
    title: "볼륨 및 속도 조절" as const,
    a11y: "",
    description: [
      "<b>화면 오른쪽 아래의 버튼</b>을 사용해 음량 및 음성 속도, 글씨 크기를 <b>조절</b>할 수 있습니다.",
    ],
    image: manualImage.manual_1,
  },
  {
    title: "점자 및 키패드" as const,
    a11y: "",
    description: [
      "기기 왼쪽 아래에는 <b>점자 패드</b>가 있습니다.<br/>점자 패드를 사용하시면 주요 콘텐츠의 내용을 <b>점자로 확인</b>할 수 있습니다.",
      `키패드의 네모는 숫자, 삼각형은 방향, 동그라미는 확인, 세모는 홈 확인 및 취소 버튼 입니다.<br/>
  <b>키패드의 숫자로 메뉴와 정보를 선택</b>할 수 있습니다.`,
    ],
    image: manualImage.manual_2,
  },
  {
    title: "화면 높낮이 조절 안내" as const,
    a11y: "",
    description: [
      "오른쪽 아래에 <b>키오스크 화면 높낮이 조절 버튼</b>이 있습니다. <br/>위, 아래 방향 버튼으로 <b>높이를 조절</b>할 수 있습니다. 기기가 움직일 때 안전에 유의하세요.",
    ],
    image: manualImage.manual_3,
  },
];

const MemoryRoad = () => {
  const [selected, setSelected] = useState(0);

  const { mode, setVolumnAction, volumeRange } = useSettingStore(
    ({ mode, setVolumnAction, volumeRange }) => ({
      mode,
      setVolumnAction,
      volumeRange,
    })
  );

  useA11y("silence");

  useEffect(() => {
    setVolumnAction(volumeRange.length - 2);
  }, []);
  return (
    <MemoryShell>
      <LazyMotion features={domAnimation}>
        <MemoryContent
          key={memoryItems[selected].title}
          item={memoryItems[selected]}
        />
        <MemoryListSmallButtons>
          {memoryItems.map((item, index) => (
            <MemoryListButton
              data-a11y-id={item.a11y}
              selected={index === selected}
              onClick={() => setSelected(index)}
              key={item.title + index + "button"}
            >
              {item.title}
            </MemoryListButton>
          ))}
        </MemoryListSmallButtons>
      </LazyMotion>
    </MemoryShell>
  );
};

export default MemoryRoad;

interface MemoryContentProps {
  item: {
    title: string;
    description: string[];
    image: string[];
  };
}

const ContentImage = m(ImageX);

function MemoryContent({ item }: MemoryContentProps) {
  const [page, setPage] = useState(0);
  return (
    <>
      <H1
        css={css`
          text-align: center;
        `}
      >
        키오스크 사용 안내
      </H1>
      <TitleDescription
        variants={fadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        css={css`
          margin-top: 0.4rem;
          color: white;
          font-weight: 400;
          height: calc(var(--font-size) * 4.5);
          /* margin-bottom: 1.6rem; */
          b {
            color: #fff500;
            font-weight: 800;
          }
        `}
        dangerouslySetInnerHTML={{
          __html: item.description[page],
        }}
      ></TitleDescription>
      <MemoryRoadContent
        variants={fadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        css={css`
          margin-top: 0;
          margin-bottom: 1rem;
        `}
        key={item.title}
      >
        <div
          css={css`
            display: flex;
            flex-grow: 1;
            flex: 1;
            justify-content: center;
          `}
        >
          <div
            css={css`
              width: 48rem;
              height: 18.8rem;
              margin: 0 auto;
              border: 4px solid white;
              position: relative;
            `}
          >
            <ContentImage key={page + item.title} src={item.image[page]} />
            {item.image.length > 1 ? (
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  column-gap: 1rem;
                  position: absolute;
                  left: 50%;
                  transform: translateX(-50%);
                  top: calc(100% + 1rem);
                `}
              >
                <LeftButton
                  data-disable-focus-effect="true"
                  data-a11y-id="이전"
                  onClick={() => {
                    if (page > 0) setPage((prev) => prev - 1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36.07"
                    height="64.141"
                    viewBox="0 0 36.07 64.141"
                  >
                    <path
                      id="naxt_icon"
                      d="M-20094.957-17310.031l-24,25,24,25"
                      transform="translate(20123.957 17317.102)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="10"
                    />
                  </svg>

                  <P3 css={css``}>이전</P3>
                </LeftButton>
                <H4>
                  <b>{page + 1}</b>&nbsp; /&nbsp;{item.image.length}
                </H4>
                <RightButton
                  data-disable-focus-effect="true"
                  data-a11y-id="다음"
                  onClick={() => {
                    if (page < item.image.length - 1)
                      setPage((prev) => prev + 1);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36.07"
                    height="64.141"
                    viewBox="0 0 36.07 64.141"
                  >
                    <path
                      id="naxt_icon"
                      d="M-20118.957-17310.031l24,25-24,25"
                      transform="translate(20126.027 17317.102)"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="10"
                    />
                  </svg>

                  <P3 css={css``}>다음</P3>
                </RightButton>
              </div>
            ) : null}
          </div>
        </div>
      </MemoryRoadContent>
    </>
  );
}

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  background-color: #122f5f;

  padding-bottom: 1.6rem;
`;
const MemoryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;
`;

const MemoryListButton = styled.button<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: calc(var(--font-size) * 1.12);
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
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
`;

const TitleDescription = m(P3);

const LeftButton = styled.button`
  border-radius: 0.4rem;
  width: 5.2rem;
  height: 2.6rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  column-gap: 0.3rem;
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;
const RightButton = styled.button`
  border-radius: 0.4rem;
  width: 5.2rem;
  height: 2.6rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  column-gap: 0.3rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;
