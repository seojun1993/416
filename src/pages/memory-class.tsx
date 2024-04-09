/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import ImageX from "@/components/ui/image";
import { H1, H2, P3 } from "@/components/ui/text";
import styled from "@emotion/styled";
import {
  ComponentType,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import classImg from "@/assets/images/classinfo";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  motion,
  useAnimate,
} from "framer-motion";
import { css, useTheme } from "@emotion/react";
import { VideoSpeeds, useSettingStore } from "@/contexts/setting.store";
import { useA11y } from "@/hooks/use-a11y";
import { sendA11yEvent } from "@/libs/utils";
import PreloadVideo from "@/components/ui/preload-video";

const memoryItems = [
  { title: "기억교실 연혁" as const, sign: "/videos/0.webm", a11y: "c_time" },
  { title: "1반" as const, sign: "/videos/1.webm", a11y: "c_01" },
  { title: "2반" as const, sign: "/videos/2.webm", a11y: "c_02" },
  { title: "3반" as const, sign: "/videos/3.webm", a11y: "c_03" },
  { title: "4반" as const, sign: "/videos/4.webm", a11y: "c_04" },
  { title: "5반" as const, sign: "/videos/5.webm", a11y: "c_05" },
  { title: "6반" as const, sign: "/videos/6.webm", a11y: "c_06" },
  { title: "7반" as const, sign: "/videos/7.webm", a11y: "c_07" },
  { title: "8반" as const, sign: "/videos/8.webm", a11y: "c_08" },
  { title: "9반" as const, sign: "/videos/9.webm", a11y: "c_09" },
  { title: "10반" as const, sign: "/videos/10.webm", a11y: "c_10" },
  { title: "교무실" as const, sign: "/videos/11.webm", a11y: "c_11" },
];

const MemoryClass = () => {
  const [selected, setSelected] = useState(0);
  const { signActivate, zoom, mode, speed, setSpeed } = useSettingStore(
    ({ signActivate, zoom, mode, speed, setSpeed }) => ({
      signActivate,
      zoom,
      mode,
      speed,
      setSpeed,
    })
  );
  const theme = useTheme();
  const [delaySignActive, setDelaySignActive] = useState(signActivate);
  const Description = memorySummaryComponents[memoryItems[selected].title];
  const [signRef, animate] = useAnimate();
  const timeoutId = useRef<NodeJS.Timeout>();
  const videoSrc = memoryItems[selected].sign;

  const handleScrollClick = useCallback(
    (dir: "TOP" | "BOTTOM") => () => {
      const scroller = document.querySelector("article");
      if (scroller) {
        const top =
          scroller.scrollTop +
          (dir === "TOP" ? -scroller.clientHeight : scroller.clientHeight);
        scroller.scrollTo({ top, behavior: "smooth" });
      }
    },
    []
  );

  useEffect(() => {
    async function toggleActive() {
      if (!signActivate && signRef.current) {
        await animate(
          signRef.current,
          {
            opacity: 0,
          },
          {
            duration: 0.5,
          }
        );
      }
      setDelaySignActive(signActivate);
    }
    toggleActive();
  }, [signActivate]);
  useA11y(mode === "sound" ? "class_detail" : "class");
  return (
    <MemoryShell key="memory-class">
      <AnimatePresence mode="wait">
        {mode === "wheel" ? (
          <>
            <motion.div
              layout
              data-isopen={signActivate}
              css={css`
                display: flex;
                flex-direction: column;
                height: 100%;
                justify-content: space-between;
                transform-origin: right;
                padding-bottom: 1.6rem;
                &[data-isOpen="true"] {
                  width: 100%;
                }
              `}
              transition={{
                type: "tween",
                ease: "linear",
              }}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  flex: 1;
                `}
              >
                <MemoryHeader>
                  <H1>단원고 4.16기억교실</H1>
                </MemoryHeader>
                <LazyMotion features={domAnimation}>
                  <AnimatePresence mode="wait">
                    <MemoryClassContent
                      css={css`
                        margin-top: 1.6rem;
                      `}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      key={memoryItems[selected].title}
                    >
                      <MemoryClassContentImage>
                        <MemoryClassImg src={classImg[selected]} />
                      </MemoryClassContentImage>
                      <Description />
                    </MemoryClassContent>
                  </AnimatePresence>
                </LazyMotion>
                {(!delaySignActive || !videoSrc) && (
                  <div
                    css={css`
                      margin-left: 20.2rem;
                      padding-top: 0.6rem;
                      padding-bottom: 1rem;
                      display: flex;
                    `}
                  >
                    <MemoryClassScrollButton
                      data-disable-focus-effect="true"
                      onClick={handleScrollClick("TOP")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64.141"
                        height="36.07"
                        viewBox="0 0 64.141 36.07"
                      >
                        <path
                          id="naxt_icon"
                          d="M-20094.957-17310.031l-24,25,24,25"
                          transform="translate(-17252.961 20123.957) rotate(90)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="10"
                        />
                      </svg>

                      <P3>위</P3>
                    </MemoryClassScrollButton>
                    <MemoryClassScrollButton
                      data-disable-focus-effect="true"
                      onClick={handleScrollClick("BOTTOM")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="64.139"
                        height="36.07"
                        viewBox="0 0 64.139 36.07"
                      >
                        <path
                          id="naxt_icon"
                          d="M24,50,0,25,24,0"
                          transform="translate(7.07 31.07) rotate(-90)"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="10"
                        />
                      </svg>

                      <P3>아래</P3>
                    </MemoryClassScrollButton>
                  </div>
                )}
                <MemoryClassNav css={css``}>
                  {memoryItems.map((item, index) => (
                    <MemoryClassButton
                      onFocus={() => {
                        timeoutId.current = setTimeout(() => {
                          sendA11yEvent(item.a11y);
                        }, 150);
                      }}
                      layoutId={item.title}
                      onClick={() => {
                        clearTimeout(timeoutId.current);
                        setSelected(index);
                      }}
                      selected={index === selected}
                      key={item.title}
                    >
                      {item.title}
                    </MemoryClassButton>
                  ))}
                </MemoryClassNav>
              </div>
            </motion.div>
            {delaySignActive && videoSrc && (
              <motion.div
                key={videoSrc}
                ref={signRef}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                  },
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "tween",
                  ease: "linear",
                }}
                css={css`
                  /* width: 36rem; */
                  flex: 0 0 21.7rem;
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                  padding-bottom: 1rem;
                `}
              >
                <PreloadVideo
                  key={videoSrc}
                  src={videoSrc}
                  videoSize={80}
                  autoPlay
                  muted
                ></PreloadVideo>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <motion.div
              layout
              data-isopen={signActivate}
              css={css`
                display: flex;
                flex-direction: column;
                height: 100%;
                justify-content: space-between;
                transform-origin: right;
                padding-bottom: 1.6rem;
                &[data-isOpen="true"] {
                  width: 100%;
                }
              `}
              transition={{
                type: "tween",
                ease: "linear",
              }}
            >
              <MemoryHeader>
                <H1>단원고 4.16기억교실</H1>
                <MemoryClassNav
                  css={css`
                    margin-bottom: 2rem;
                  `}
                >
                  {memoryItems.map((item, index) => (
                    <MemoryClassButton
                      onFocus={() => {
                        timeoutId.current = setTimeout(() => {
                          sendA11yEvent(item.a11y);
                        }, 150);
                      }}
                      layoutId={item.title}
                      onClick={() => {
                        clearTimeout(timeoutId.current);
                        setSelected(index);
                      }}
                      selected={index === selected}
                      key={item.title}
                    >
                      {item.title}
                    </MemoryClassButton>
                  ))}
                </MemoryClassNav>
              </MemoryHeader>
              <LazyMotion features={domAnimation}>
                <AnimatePresence mode="wait">
                  <MemoryClassContent
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={memoryItems[selected].title}
                  >
                    <MemoryClassContentImage>
                      <MemoryClassImg src={classImg[selected]} />
                    </MemoryClassContentImage>
                    <Description />
                  </MemoryClassContent>
                </AnimatePresence>
              </LazyMotion>
            </motion.div>
            {delaySignActive && videoSrc && (
              <motion.div
                key={videoSrc}
                ref={signRef}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                  transition: {
                    delay: 0.5,
                  },
                }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "tween",
                  ease: "linear",
                }}
                css={css`
                  /* width: 36rem; */
                  flex: 0 0 21.7rem;
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                  padding-bottom: 1rem;
                `}
              >
                <PreloadVideo
                  key={videoSrc}
                  src={videoSrc}
                  videoSize={80}
                  autoPlay
                  muted
                ></PreloadVideo>
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
      <div
        css={css`
          position: absolute;
          right: 3rem;
          bottom: 0;
          transition: bottom 0.5s ease-in-out;
        `}
      >
        <SignControllerWrapper>
          <P3
            css={css`
              margin-bottom: 0.5rem;
              line-height: 1.2;
            `}
          >
            수어속도
          </P3>
          <div
            css={css`
              display: flex;
              column-gap: 3rem;
              position: relative;
              & button:first-of-type {
                position: relative;
                &::before {
                  content: "";
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  right: -1.5rem;
                  width: 2rem;
                  background-color: gray;
                  height: 4px;
                }
              }
              & button + button {
                position: relative;
                &:not(:last-child) {
                  &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: calc(100% + 3rem);
                    background-color: gray;
                    height: 4px;
                  }
                }
                &:last-of-type {
                  &::before {
                    content: "";
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    left: -1.5rem;
                    width: 2rem;
                    background-color: gray;
                    height: 4px;
                  }
                }
              }
            `}
          >
            {VideoSpeeds.map((item) => (
              <SignControllerButton
                key={item.text}
                onClick={() => setSpeed(item.value)}
              >
                <SignControllerCircle
                  selected={speed === item.value}
                  css={css`
                    border-radius: 9999rem;

                    &::after {
                      content: "${item.text}";
                      color: ${theme.color.text.main};
                      white-space: nowrap;
                      pointer-events: none;
                      position: absolute;
                      left: 50%;
                      transform: translateX(-50%);
                      top: 100%;
                      font-family: "Pretendard";
                      font-size: calc(var(--font-size) * 1.12);
                      /* font-size: 1.12em; */
                      line-height: 1.2;
                      text-align: center;
                      font-weight: 700;
                      margin-top: 0.2rem;
                    }
                  `}
                />
              </SignControllerButton>
            ))}
          </div>
        </SignControllerWrapper>
      </div>
    </MemoryShell>
  );
};

export default MemoryClass;

const SignControllerWrapper = styled.div`
  width: 16rem;
  height: 5.4rem;
  margin: 0 1rem;
  padding-top: 0.8rem;
  display: flex;
  background-color: white;
  border-top-right-radius: 0.4rem;
  border-top-left-radius: 0.4rem;
  overflow: hidden;
  box-shadow: 0 0 0.9rem rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.color.secondary.foreground};
`;

const SignControllerButton = styled.button`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  padding: 0;
  border-radius: 9999rem;
  padding: 0;
  &:active,
  &:focus,
  &:focus-visible {
    > div {
      background-color: ${(props) => props.theme.color.accent.foreground};
    }
  }
`;
const SignControllerCircle = styled.div<{ selected: boolean }>`
  background-color: ${(props) =>
    props.selected
      ? props.theme.color.accent.foreground
      : props.theme.color.text.sub};

  width: 0.8rem;
  aspect-ratio: 1/1;
  border: none;
  position: relative;
`;

const MemoryClassScrollButton = styled.button`
  width: 5.2rem;
  height: 2.6rem;
  border-radius: 0.4rem;
  margin-left: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 0.4rem;
  border: none;
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
  p {
    color: black;
  }
`;

const MemoryClassImg = styled(ImageX)`
  img {
    border-radius: 0.6rem;
    object-fit: cover;
  }
`;

const MemoryClassNav = styled.nav`
  display: flex;
  row-gap: 0.8rem;
  column-gap: 1.54rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
`;
const MemoryClassButton = styled(motion.button)<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: calc(var(--font-size) * 1.12);
  font-weight: 800;
  width: 10.8rem;
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

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  padding-bottom: 2rem;
  & + div {
    padding-top: 2rem;
    border-top: 0.08rem solid rgba(255, 255, 255, 0.5);
  }
`;

const MemoryClassContentDescription = styled.article`
  overflow-y: scroll;
  width: 100%;
  padding-right: 0.5rem;
  margin-left: 1rem;
`;

const DescriptionContent = styled(P3)`
  color: white;
  text-align: start;
  font-weight: 400;
  letter-spacing: -0.01rem;
  line-height: 1.4;
`;

const DescriptionTitle = styled.h1`
  font-size: calc(var(--font-size) * 1.4);
  font-family: "Pretendard";
  color: ${(props) => props.theme.color.yellow};
  line-height: 1;
`;
const MemoryClassContentImage = styled.div`
  padding: 0.4rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.8rem;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;
const MemoryClassContent = styled(m.div)`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  height: 18.32rem;
  flex-grow: 1;
`;

const MemoryHeader = styled.div`
  text-align: center;
`;

const MemoryShell = styled(MainShell)`
  position: relative;
  /* flex-direction: column; */
  align-items: center;
  /* padding-bottom: 1.6rem; */
  column-gap: 1.2rem;
  justify-content: space-between;
`;
const memorySummaryComponents: {
  [key in (typeof memoryItems)[number]["title"]]: ComponentType;
} = {
  "기억교실 연혁": () => {
    const theme = useTheme();
    useA11y("class_time");
    return (
      <MemoryClassContentDescription>
        <DescriptionWrapper>
          <DescriptionTitle>
            단원고 4.16기억교실 이전, 복원 경과
          </DescriptionTitle>
          <H2
            css={css`
              font-size: calc(var(--font-size) * 1.2);
              color: #ffffe0;
              font-family: "Pretendard";
              margin-bottom: 0.4rem;
            `}
          >
            4.16기억저장소 기록화 자료 토대로 원형 복원
          </H2>

          <DescriptionContent>
            2014년 4월 설레는 마음으로 수학여행을 떠났던
            <br />
            단원고등학교 2학년 학생 250명,
            <br />
            선생님 11명은 학교로 돌아오지 못했습니다.
            <br />
            <br />
            교실에는 아이들과 선생님을 그리워하며 추모하는
            <br />
            마음의 편지와 메모 등이 쌓였고
            <br />
            학생들이 공부했던 교실은 돌아오지 못한
            <br />
            희생자들을 추모하고 기억하는 공간이 되었습니다.
            <br />
            <br />
            이후 교실을 그대로 남겨달라는 시민들의 목소리가 커졌고
            <br />
            경기도교육청, (사)4.16세월호참사가족협의회, 경기도,
            <br />
            경기도의회, 안산시, 경기도안산교육지원청, 단원고등학교는
            <br />
            <b
              css={css`
                color: ${theme.color.yellow};
              `}
            >
              2016년 5월 9일
            </b>{" "}
            협약을 통해 별도의 시설 건립 후<br />
            이전·복원하기로 결정했습니다.
            <br />
            <br />
            단원고 4.16기억교실은{" "}
            <b
              css={css`
                color: ${theme.color.yellow};
              `}
            >
              2020년 12월 14일
            </b>{" "}
            임시공간에서
            <br />
            이전하였으며 4.16기억저장소 기록화 자료를 토대로
            <br />
            단원고등학교 학생들이 사용하였던 교실의 문틀, 문, 창틀,
            <br />
            창문, 천장 텍스, 몰딩 등 교실 기록물을 그대로
            <br />
            4.16민주시민교육원 기억관 2층, 3층에 원형 복원하여
            <br />
            <b
              css={css`
                color: ${theme.color.yellow};
              `}
            >
              2021년 4월 12일
            </b>{" "}
            정식 개방하였습니다.
            <br />
          </DescriptionContent>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>최초이전</DescriptionTitle>
          <DescriptionContent>
            <strong>단원고등학교 - 구) 안산교육지원청 별관</strong>
            <br />
            <br />
            2016. 8. 20. ~ 2016. 8. 21.
            <br />
            1층
            <br />
            기억교실 4실(2-1반 ~ 2-4반)
            <br />
            2층
            <br />
            기억교실 6실(2-5반 ~ 2-10반), 기억교무실
            <br />
            <br />
            2016. 11. 21. ~
            <br />
            기억교실 개방
          </DescriptionContent>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>임시 이전</DescriptionTitle>
          <DescriptionContent>
            <strong>구) 안산교육지원청 별관 – 구) 안산교육지원청 본관</strong>
            <br />
            <br />
            2018. 8. 1. ~ 2018. 8. 11.
            <br />
            2층
            <br />
            기억교실 6실(2-1반 ~ 2-6반)
            <br />
            3층
            <br />
            기억교실 4실(2-7반 ~ 2-10반), 기억교무실
            <br />
            <br />
            2018. 9. 17.
            <br />
            기억교실 재개방
          </DescriptionContent>
        </DescriptionWrapper>
        <DescriptionWrapper>
          <DescriptionTitle>복원 이전</DescriptionTitle>
          <DescriptionContent>
            <strong>구) 안산교육지원청 본관 - 4.16민주시민교육원 기억관</strong>
            <br />
            2020. 12. 14.
            <br />
            2층
            <br />
            기억교실 4실(2-7반 ~ 2-10반), 기억교무실
            <br />
            3층
            <br />
            기억교실 6실(2-1반 ~ 2-6반)
            <br />
            <br />
            2021. 4. 12.
            <br />
            <strong>기억교실 정식 개방</strong>
            <br />
            <br />
            2021. 12. 27.
            <br />
            <strong
              css={css`
                color: #ffffe0;
              `}
            >
              「단원고 4.16기억교실 기록물류」 국가지정기록물 제14호 지정
            </strong>
            <br />
            (소장기관: 4.16민주시민교육원, 4.16기억저장소)
          </DescriptionContent>
        </DescriptionWrapper>
      </MemoryClassContentDescription>
    );
  },
  "1반": () => {
    useA11y("class_01");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          1반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 1반은 여학생 문과반입니다.
          <br />
          37명의 학생이 수학여행을 떠나
          <br />
          18명의 학생이 희생되고, 19명의 학생이 돌아왔습니다.
          <br />
          <br />
          1반은 단원고등학교 10개 반 중,
          <br />
          가장 많은 학생이 살아 돌아온 반입니다.
          <br />
          교실 책상 중 빈 책상은 살아 돌아오거나
          <br />
          수학여행에 참가하지 않은 아이들의 책상이고,
          <br />
          물건이 놓인 책상은 돌아오지 못한 아이들의 책상입니다.
          <br />
          놓여있는 물품들은 보고 만져도 되지만
          <br />
          모두 실제 물품이니 소중하게 지켜주세요.
          <br />
          <br />
          살며시 의자에 앉아, 기억노트에 메시지를 작성해 주세요.
          <br />
          또, 책상 위 우측 상단에 QR코드를 통해
          <br />
          아이들과 선생님들의 이야기를 보실 수 있습니다.
          <br />
          <br />
          세월호 참사 당시, 텅 비어 버린 단원고등학교
          <br />
          2학년 교실에는 아이들이 쓰던 공책과 필통.
          <br />
          그리고 시민들이 책상 위에 남긴 메시지와
          <br />
          하얀 국화꽃이 피어나고 있었습니다.
          <br />
          수학여행 간 아이들의 무사 귀환을 간절히 기다리던
          <br />
          부모들은 아들딸의 책상과 의자를 끌어안아야 했습니다.
          <br />
          <br />
          평범한 고등학생들의 일상이 담겨있던 10개의 교실은
          <br />
          그날 이후, 세월호 참사의 현장이자 증거가 되었습니다.
          <br />
          ‘보고싶고 사랑한다’는 말들이 빼곡히 적혀 있는 칠판,
          <br />
          ‘빨리 돌아오라’는 포스트잇으로 도배된 창문,
          <br />
          말갛게 웃고 있는 아이들의 사진과
          <br />
          꽃, 편지, 간식들이 수북이 쌓인 책상.
          <br />
          시간이 멈춘 교실에는 아이들의 온기를 품은 듯한
          <br />
          햇볕이 위로처럼 내려앉아 있었습니다.
          <br />
          <br />
          1반 교실에는 아이들이 직접 만들어서 사용한 달력이
          <br />
          복도 쪽 교실 벽에 걸려있습니다.
          <br />
          그림을 그리고 하나하나 색종이를 오려서
          <br />
          정성스럽게 만든 달력에는 학교 일정과
          <br />
          친구들의 생일이 또박또박 적혀 있습니다.
          <br />
          특히 가장 큰 글씨로 적힌 ‘수학여행’ 글자를 보면,
          <br />
          아이들이 얼마나 그 시간을
          <br />
          설레는 마음으로 기다렸을지가 느껴집니다.
          <br />
          <br />
          뒤쪽 게시판에는 반 아이들의 생일을 캐릭터 보드게임판으로
          <br />
          귀엽게 만들어 놓은 판넬이 눈에 띕니다.
          <br />
          색종이로 섬세하게 오려서 만든 리락쿠마,
          <br />
          루피, 올라프 등의 캐릭터를 보며,
          <br />
          좋아하는 것들이 차고 넘쳤던
          <br />
          1반 아이들의 취향을 떠올려 봅니다.
          <br />
          <br />
          또, 1반 사물함 위 꽃무늬 시트지에서 당시 학교 친구들과
          <br />
          유니나 선생님의 제자들이 남긴 메시지를 볼 수 있습니다.
          <br />
          제발 돌아와 달라는 애원, 대학 합격했다는 소식,
          <br />
          꿈에 나와달라는 부탁, 사랑한다는 말들이
          <br />
          안타깝게 내려앉아 있습니다.
          <br />
          <br />
          이곳에 함께 모여 그림을 그리고 종이를 자르며,
          <br />
          설레는 마음으로 교실을 장식하던
          <br />
          18명의 아이들을 떠올려 봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
            `}
          >
            <li>정의로운 시선으로 자기 몫을 아낌없이 나누는 박성빈</li>
            <li>커다란 눈망울의 엉뚱한 정리요정 김수진</li>
            <li>귀여운 잔소리 가득한 편지로 가족을 웃게 하는 우소영</li>
            <li>어떤 일이든 당차게 척척 해내는 막내 김영경</li>
            <li>일본어 교사를 꿈꾸는 카툰 습작생 김현정</li>
            <li>좋아하는 것이 분명해 자기 삶의 주인공이 되고 싶은 김예은</li>
            <li>세상에서 엄마를 가장 좋아하던 수학 천재 조은화</li>
            <li>집안일을 기쁘게 도맡아 하던 따뜻한 고해인</li>
            <li>뛰어난 손재주로 가족을 위해 요리하는 김민희</li>
            <li>그림 그리기를 좋아하는 자유로운 영혼의 김주아</li>
            <li>아빠를 우주 끝까지 사랑한다고 말하는 김민지</li>
            <li>명랑하고 다정하던 속 깊은 넷째딸 문지성</li>
            <li>다정한 미소로 유치원 교사를 꿈꾸는 정가현</li>
            <li>소수의 마음도 살필 줄 알았던 세심한 리더 유미지</li>
            <li>내면의 흥으로 남자 아이돌 춤도 거뜬히 소화하는 이수연</li>
            <li>씩씩하고 큰 목소리로 주변을 행복하게 만드는 김수경</li>
            <li>자기 몫의 세상을 당당하게 펼쳐나가는 이연화</li>
            <li>카메라에 담긴 세상을 정성껏 편집하는 한고운</li>
          </ul>
          <br />
          세상에 단 한 사람밖에 없는 유일한 딸, 친구, 언니,
          <br />
          동생, 제자였던 아이들의 존재를 기억해 봅니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "2반": () => {
    useA11y("class_02");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          2반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 2반은 여학생 문과반입니다.
          <br />
          36명의 학생이 수학여행을 떠나
          <br />
          25명의 학생이 희생되고, 11명의 학생이 돌아왔습니다.
          <br />
          <br />
          참사 발생 2년 후.
          <br />
          단원고 4.16기억교실은 단원고등학교의
          <br />
          정상화를 위해 원래 학교를 떠나
          <br />
          축소된 공간으로 임시 이전하게 되었습니다.
          <br />
          교실 이전을 앞두고 유가족들은
          <br />
          책상 위 아이의 유품을 손수 상자에 담았습니다.
          <br />
          아이들의 체취와 숨결이 머물던 단원고등학교 2학년 교실은
          <br />
          그렇게 사라지게 되었습니다.
          <br />
          <br />
          세월호 참사의 현장이자 흔적이었던 교실을
          <br />
          새로운 교육을 위한 현장으로 만들기 위한
          <br />
          유가족과 시민들의 노력으로 세 번의 이전 끝에
          <br />
          현재의 4.16민주시민교육원 기억관에 터를 잡게 되었습니다.
          <br />
          <br />
          아이들이 쓰던 교실을 완벽하게 복원하기 위해
          <br />
          4.16기억저장소는 책걸상은 물론 단원고등학교의 창문틀, 문틀,
          <br />
          몰딩 등 하나하나까지 그대로 옮겨와
          <br />
          현재는 예전 단원고 시절의 모습을 온전히 되찾았습니다.
          <br />
          <br />
          교실 뒤쪽 게시판에는 2반 친구들의 정겨운 단체사진을
          <br />
          크게 프린트한 판넬이 눈에 띕니다.
          <br />
          손가락으로 브이를 그리고, 꽃받침을 하며
          <br />
          카메라를 바라보는 아이들의 눈동자에는
          <br />
          2학년 생활에 대한 기대와 설렘이 어려있습니다.
          <br />
          사진 안에 ‘서로를 존중하는 완소2반’이란
          <br />
          글자를 보면, 소중하고 귀하기만 했던 아이들과
          <br />
          빛나던 한 시절이 스쳐 지나갑니다.
          <br />
          <br />
          담임 전수영 선생님은 교실 뒤에 ‘칭찬합시다’ 게시판을 만들어
          <br />
          아이들이 반을 위해 배려했던 내용을 적도록 했습니다.
          <br />
          책걸상과 사물함에 이름표를 붙인 아이들을 칭찬하고,
          <br />
          재활용 분리수거를 했던 아이와
          <br />
          교실 문단속을 했던 아이를 칭찬한 이력이 남아있습니다.
          <br />
          아이들은 이 게시판을 통해
          <br />
          서로를 배려하는 방법을 배웠을 것입니다.
          <br />
          <br />
          따뜻하고 엉뚱하고 반짝이는 유머가 넘치던 2반
          <br />
          25명 아이들의 이름과 얼굴을 떠올려 봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>춤추고 노래하며 주변을 무장해제 시키는 박혜선</li>
            <li>따뜻하고 깊은 마음으로 카메라를 메고 달리는 김수정</li>
            <li>선하고 순수한 마음을 가진 봄날의 햇살 양온유</li>
            <li>인내심과 승부욕으로 미래를 연출하는 PD 박정은</li>
            <li>
              뭘 하든 최선을 다해야 직성이 풀리는 미래의
              <br />
              역사학자 남수빈
            </li>
            <li>자연스러운 유머와 웃음으로 주변을 반짝이게 하는 남지현</li>
            <li>아이들을 보면 행복해지던, 장갑처럼 따뜻한 사람 윤민지</li>
            <li>엄마아빠 생일에 미역국까지 끓여주던 살림꾼 강수정</li>
            <li>디즈니 만화를 좋아하는 우아한 4차원 소녀 길채원</li>
            <li>수어통역사로 필요한 사람에게 힘이 되고 싶은 조서우</li>
            <li>춤도 공부도 기도도 매일 최선을 다하는 전하영</li>
            <li>그림 그리기를 좋아해 아름다운 옷을 만들고 싶은 김민지</li>
            <li>친구 같던 엄마와 긴 편지로 사랑을 나누는 정지아</li>
            <li>책 읽고 상상하기를 즐기는 몰입의 장인 김주희</li>
            <li>축구 보는 것을 좋아하고 달리기를 잘하는 강우영</li>
            <li>매 순간 다가오던 것들을 기쁘게 즐기는 한세영</li>
            <li>역사와 신화를 좋아하는 남다른 패션감각의 소유자 허유림</li>
            <li>애교 많은 미래의 메이크업아티스트 이혜경</li>
            <li>뭐든 알아서 척척 움직이는 선량하고 속 깊은 김지윤</li>
            <li>많은 사람과 나누는 삶을 꿈꾸는 자기관리의 여왕 박주희</li>
            <li>활발하고 털털한 성격으로 경찰을 꿈꾸는 윤솔</li>
            <li>
              책 읽는 것을 좋아하고, 소설 쓰는 것을 좋아하는
              <br /> 당당한 아이 송지나
            </li>
            <li>만화가를 꿈꾸며 일본 유학까지 계획한 김소정</li>
            <li>춤과 노래를 즐기며 유치원 교사를 꿈꾸는 허다윤</li>
            <li>예쁜 손글씨로 빵 이름을 쓰며 제과제빵을 배우는 오유정</li>
          </ul>
          <br />
          아이들 한 명 한 명의 꿈과 이야기들을 오래 기억해 봅니다. <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "3반": () => {
    useA11y("class_03");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          3반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 3반은 여학생 문과반입니다.
          <br />
          34명의 학생이 수학여행을 떠나
          <br />
          26명의 학생이 희생되고, 8명의 학생이 돌아왔습니다.
          <br />
          <br />
          벚꽃이 피던 4월에 아이들은 흥겹게 어우러져서
          <br />
          함께 사진을 찍고 춤을 추면서 봄날의 교정을 노래했습니다.
          <br />
          <br />
          책상에 놓여있는 사진 속에서 아이들은
          <br />
          마치 어제 이 교실에서 노래를 흥얼거리던 것처럼
          <br />
          명랑하고 해맑게 카메라를 바라보고 브이를 그립니다.
          <br />
          똑같은 교복을 입었지만 취한 자세는 모두 제각각입니다.
          <br />
          누워있는 아이, 친구 등에 업힌 아이,
          <br />
          바닥에 주저앉아 있는 아이들이
          <br />
          벚꽃보다 더 밝고 다채롭게 빛납니다.
          <br />
          <br />
          장난꾸러기와 끼쟁이들이 많아서 경쾌하던 3반 교실에는
          <br />
          이제 아이들의 수다와 웃음소리 대신
          <br />긴 침묵과 깊은 그리움,
          <br />
          갈 곳 잃은 수백 개의 이야기만이 남아있습니다.
          <br />
          <br />
          교실 뒤쪽 게시판에는 3반 친구들이 담임 김초원 선생님을 위해
          <br />
          준비했던 편지 선물이 줄줄이 사탕처럼 매달려 있습니다.
          <br />
          마침 4월 16일이 생일이었던 김초원 선생님을 생각하며
          <br />
          아이들은 2014년 당일 자정에 깜짝 생일파티를 준비했습니다.
          <br />
          케이크도 직접 만들고, 선생님께 잘 어울릴 액세서리도
          <br />
          미리 골라두고, 두근두근한 마음으로 깜짝 파티를
          <br />
          기다렸을 아이들 모습이 그려집니다.
          <br />
          <br />
          원래 반 아이들이 마음을 담아 정성껏 쓴 이 편지 꾸러미는
          <br />배 안에서 전달할 예정이었습니다.
          <br />
          하지만 편지를 교실에 남겨 둔 채 수학여행을 떠나게 되었고,
          <br />
          그렇게 남아있는 34개의 편지들은
          <br />
          오래 담아두고 기억할 이야기로 교실에 영원히 남았습니다.
          <br />
          <br />
          이날 밤 선실에서 3반 아이들은 케이크를 들고 있는
          <br />
          담임선생님과 함께 단체 사진을 남겼습니다.
          <br />
          김초원 선생님은 감동을 받아 빨개진 눈으로 활짝 웃고 있고,
          <br />
          아이들은 3반의 트레이드마크 같은 피스 포즈를 취하며
          <br />
          잊지 못할 수학여행 추억에 만족한 얼굴입니다.
          <br />
          <br />
          이 교실에서 시끌벅적하게 깜짝 생일파티를 준비하며
          <br />
          한껏 신나 있었을 3반 아이들의 얼굴을 떠올려 봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>아빠와 친구처럼 지내며 패션디자이너를 꿈꾸는 박채연</li>

            <li>누구를 만나든 당당하고 친절한 동글동글 동글이 김도언</li>

            <li>일본의 역사 왜곡을 알리고 싶어 역사교사를 꿈꾸는 전영수</li>

            <li>개구쟁이 표정으로 자유롭고 용감한 음악을 만드는 김시연</li>

            <li>뮤지컬 배우를 꿈꾸며 후회 없이 최선을 다해 사는 유예은</li>

            <li>
              좋아하는 것, 중요한 것, 해야 할 것들을 똑부러지게
              <br />
              해내는 김담비
            </li>

            <li>친구들을 아우르던 의리 있는 리더 유혜원</li>

            <li>터프한 행동 속에 따뜻한 마음을 품은 장주이</li>

            <li>엄마와 밤새 수다 떠는 것과 그림 그리기를 좋아하는 황지현</li>

            <li>털털한 성격으로 많은 친구들의 사랑을 받는 최수희</li>

            <li>자기 할 일을 척척 해내는 든든한 딸 박지우</li>

            <li>겉도 속도 하얀 눈사람 같은 김수경</li>

            <li>예쁜 것들을 좋아했지만 작은 체구로 뭐든 잘 먹는 최윤민</li>

            <li>호기심이 많아서 배움에 두려움 없는 김지인</li>

            <li>독학으로 배운 그림으로 사람들을 놀라게 하는 박지윤</li>

            <li>감각있는 장식품과 액세서리를 직접 만드는 금손 김주은</li>

            <li>용감하고 활달한 성격으로 무대 위의 모습을 꿈꾸는 정예진</li>

            <li>알뜰살뜰 동생을 챙기던 속 깊은 큰딸 박영란</li>

            <li>군인이 되고 싶은 주황색 덕후 이지민</li>

            <li>빛나는 재능으로 우아한 구두를 디자인하는 박예슬</li>

            <li>장학금으로 기쁘게 부모님 여행을 보내드린 신승희</li>

            <li>연기자를 꿈꾸는 야무지고 사랑스러운 큰딸 김빛나라</li>

            <li>강한 의지로 공부하며 당당하게 빛을 발하는 김소연</li>

            <li>추리물을 즐겨보며 타인을 돕는 경찰관이 되고 싶은 백지숙</li>

            <li>남자아이돌을 좋아하는 사려 깊은 막내 김영은</li>

            <li>산책을 좋아하고 글짓기를 잘하는 한은지</li>
          </ul>
          <br />
          각자의 개성과 목소리로 교실을 꽉 채운
          <br />
          26명 아이들의 꿈과 삶을 오래 기억해 봅니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "4반": () => {
    useA11y("class_04");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          4반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 4반은 남학생 문과반입니다.
          <br />
          37명의 학생이 수학여행을 떠나
          <br />
          28명의 학생이 희생되고, 9명의 학생이 돌아왔습니다.
          <br />
          <br />
          2014년 4월 16일 오전 8시 49분,
          <br />
          세월호가 왼쪽으로 45도 기울어집니다.
          <br />
          배가 45도로 기울면 복원이 어려우므로
          <br />
          빠르게 퇴선 조치를 해야 합니다.
          <br />
          세월호 4층 좌우에는 탈출을 위한 비상대기 갑판이 있었지만
          <br />배 안에서는 ‘위험하니 현재 자리에서 대기하라’는
          <br />
          방송이 나왔습니다.
          <br />
          특히 ‘단원고 학생들은 절대로 움직이지 말라’고까지 했습니다.
          <br />
          결국, 아이들은 뒤늦게 육지로 올라왔고
          <br />
          가족들이 아이들을 만난 장소는 ‘팽목항’이었습니다.
          <br />
          팽목항은 세월호 침몰 소식을 들은 국민들이
          <br />한 마음으로 달려와 간절한 바람을 보냈던 곳입니다.
          <br />
          <br />
          2014년 4월 16일부터
          <br />
          세월호가 인양되기 시작한 2017년 3월까지
          <br />
          이곳에는 미수습자 가족들이 머무르고 있었습니다.
          <br />
          인양 이후에는 목포로 옮겨가게 되어
          <br />
          팽목항의 텐트나 가건물은 철거되었지만,
          <br />
          컨테이너 박스에 꾸려진 ‘팽목 기억관’이
          <br />
          시민들이 찾을 수 있는 분향소이자
          <br />
          기억관의 역할을 하고 있습니다.
          <br />
          <br />
          친구들과 서로 의지하며 가만히 있으라는 방송을
          <br />
          듣고 기다리던 2학년 4반 아이들의 이름을 불러봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>
              ‘안 먹으면 안 돼지’라는 상호까지 준비한 미래의
              <br />
              고깃집 사장 안준혁
            </li>

            <li>축구만큼 역사 공부에 푹 빠진 김정현</li>
            <li>언제든 좋아하는 일이 생길 거라며 꿈 찾기에 바쁜 김웅기</li>
            <li>검사였다 변호사였다 이제는 가수가 되고 싶은 꿈부자 임경빈</li>
            <li>‘굴곡 없이 행복하게 살기’라는 인생목표를 세운 임요한</li>
            <li>아버지와 함께 하는 농구를 즐기는 김동혁</li>
            <li>퇴근하는 아빠를 포옹으로 맞이하는 애교쟁이 정차웅</li>
            <li>신맛 짠맛을 기가 막히게 구분하는 타고난 맛 감별사 강혁</li>
            <li>형을 너무 좋아해 형 따라 무엇이든 배우는 동생 김범수</li>
            <li>체육관에서 땀 흘리며 운동하는 것이 좋은 권오천</li>
            <li>라면을 좋아하고 잘 끓여서 별명도 ‘진라면’인 진우혁</li>
            <li>여덟 시에 보는 벚꽃이 가장 아름답다는 작가 지망생 최성호</li>
            <li>나 혼자 세계여행을 비롯해 버킷리스트가 꽉 찬 박수현</li>
            <li>
              친구들이 인정한 만화가, 그림 실력으로 음악밴드
              <br />
              멤버가 된 홍순영
            </li>
            <li>드럼도 배우고 합기도 수련도 하는 몸 튼튼 마음 튼튼 한정무</li>
            <li>운동도 음악도 공부도 골고루 잘하는 김호연</li>
            <li>마술사가 되고 싶어 먼 길 오가며 연습하는 김용진</li>
            <li>
              록밴드 ‘Green Day’처럼 소울 있는 노래를
              <br />
              만들고 싶은 강승묵
            </li>
            <li>수영선수 시절 다져진 몸매로 모델을 준비하는 슬라바</li>
            <li>책 읽기와 글쓰기를 좋아하는 작가 지망생 김윤수</li>
            <li>
              스케치북과 연필만 있으면 OK, 그림 그리는 게<br />
              제일 좋은 빈하용
            </li>
            <li>
              족발, 피자, 통닭, 먹고 싶은 것이 많은 만큼 <br />
              마음 씀씀이도 넉넉한 강신욱
            </li>
            <li>농구를 즐기는 중국어 능력자 안형준</li>
            <li>토마토 파스타를 맛있게 만드는 박정훈</li>
            <li>자동차 디자이너가 되기 위해 열심히 그림 그리는 정휘범</li>
            <li>아빠를 꼭 빼닮은 멋쟁이 패셔니스타 장진용</li>
            <li>아픈 엄마를 위해 요리를 배우러 다니는 김건우</li>
            <li>필리핀 무술 칼리 아르니스 사범이 되고 싶은 김대희</li>
          </ul>
          <br />
          배움과 성장을 즐기는 2학년 4반
          <br />
          스물여덟 명의 친구들을 기억합니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "5반": () => {
    useA11y("class_05");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          5반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 5반은 남학생 문과반입니다.
          <br />
          36명의 학생이 수학여행을 떠나
          <br />
          27명의 학생이 희생되고, 9명의 학생이 돌아왔습니다.
          <br />
          <br />
          5반에는 뇌종양으로 인해 수학여행을
          <br />
          가지 못한 한 아이가 있습니다.
          <br />
          수학여행을 떠나기 전, 5반 담임 선생님과 친구들은
          <br />
          큰 수술을 견뎌낸 이 아이를 찾아가
          <br />
          “함께 못 가 미안하고, 완쾌되기를 빈다”는 말을 전했습니다.
          <br />
          며칠 후, 친구들이 수학여행에서 돌아오지 못했다는 소식을
          <br />
          들어야 했던 이 아이는 한동안 말을 잃었고,
          <br />
          이듬해, 늘 그리워했던 친구들 곁으로 떠났습니다.
          <br />
          <br />
          2학년 5반 교실에는 없는 것이 하나 있습니다.
          <br />
          바로, 커튼입니다.
          <br />
          2학년 5반과 6반은 특별활동 교실이었기 때문에
          <br />
          다른 반 교실과 달리 복도 쪽 창이 작고 커튼 대신
          <br />
          암막 블라인드가 설치되어 있습니다.
          <br />
          <br />
          또한 2학년 5반 교실을 둘러보면
          <br />
          ‘모두가 주인 되는 2학년 5반’ 게시물과 <br />
          ‘2학년 5반의 학급규칙’ 판넬을 발견할 수 있습니다.
          <br />
          반장, 부반장, 서기, 총무와 같은 기본적인 역할 뿐만 아니라
          <br />
          학급에 필요한 다양한 역할이 세심하게 나눠져 있습니다.
          <br />
          <br />
          이런 약속들을 만들기 위해 머리를 맞대고 회의했을
          <br />
          2학년 5반 아이들의 모습을 하나하나 떠올려 봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>헤어디자이너를 꿈꾸며 엄마의 머리를 손질해 준 이홍승</li>
            <li>달콤하고 부드러운 빵을 친구들과 나눌 줄 아는 천인호</li>
            <li>친구들 사이에서 ‘의리’하면 떠오르는 아이 이창현</li>
            <li>그림 그리기에 남다른 재주가 있는 애교 많은 동생 인태범</li>
            <li>부드럽고 온화한 성격에 운동까지 잘하는 반전매력 이진환</li>
            <li>세계를 누비는 관광가이드가 되고 싶은 만화왕 이석준</li>
            <li>역사에 관심이 많고 볼링부원으로 활동한 김성현</li>
            <li>멋지게 옷을 입을 줄 아는 향긋한 바리스타 박준민</li>
            <li>경호원이 되겠다는 목표에 한 걸음씩 다가가는 문중식</li>
            <li>‘평화와 정의를 실현하는 삶을 살고 싶다’는 좌우명의 박성호</li>
            <li>리더십 있고 운동을 좋아하는 작은 김건우</li>
            <li>친구 같은 엄마를 살뜰히 챙기며 청년 복지사를 꿈꾼 정이삭</li>
            <li>자신의 미래를 스스로 준비하던 용기 있는 김한별</li>
            <li>정 많고 반듯해 가는 길에 많은 사람의 배웅을 받은 최민석</li>
            <li>손으로 조립하는 것을 잘하고 동물을 좋아하는 김인호</li>
            <li>친구들의 고민 상담사이자 합기도에 푹 빠진 김진광</li>
            <li>독학으로 피아노를 익힌 음악 천재 김도현</li>
            <li>무언가 고장 나면 뚝딱 고치는 해결사 큰 김건우</li>
            <li>‘노력하며 살자!’라는 목표를 가진 김민석</li>
            <li>넘치는 끼와 명랑함이 트레이드마크인 서동진</li>
            <li>다이아몬드 태몽으로 세상에 온 빛나는 남자 최남혁</li>
            <li>자신을 믿어주는 엄마의 사랑을 동생들에게도 보여준 조성원</li>
            <li>모두에게 다정해 주변에서 인기 짱인 박홍래</li>
            <li>수요일 아침마다 2학년 5반을 깔끔하게 정리했을 박진리</li>
            <li>곰인형 네 개에 사랑하는 가족의 별명을 붙여준 오준영</li>
            <li>운동신경이 뛰어나고 배려가 몸에 배어있는 김민성</li>
            <li>친구들을 모아 새벽에 재미난 일들을 벌이는 김완준</li>
          </ul>
          <br />
          아이들의 이름을, 세상에 머무르던 날들을 기억하겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "6반": () => {
    useA11y("class_06");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          6반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 6반은 남학생 문과반입니다.
          <br />
          38명의 학생이 수학여행을 떠나
          <br />
          25명의 학생이 희생되고, 13명의 학생이 돌아왔습니다.
          <br />
          <br />
          6반에는 침몰하는 세월호 안에서 “배가 가라앉고 있다”고
          <br />
          119에 최초로 신고한 아이가 있습니다.
          <br />
          당시 소방본부는 신고 전화를
          <br />
          해경과 연결해 상황을 공유했는데,
          <br />
          해경은 신고자가 탑승객이라고 했음에도
          <br />
          반복적으로 위도와 경도를 물었습니다.
          <br />
          <br />
          또한 근처에 있던 유조선과 인근 어민들의 대기에도 불구하고
          <br />
          선원도, 해경도, 그 누구도 탑승객들에게
          <br />
          뛰어내리라는 명령을 하지 않았습니다.
          <br />
          <br />
          6반은 끝내 가족의 품으로 돌아오지 못한,
          <br />
          미수습자가 된 두 아이가 있는 반이기도 합니다.
          <br />
          1분단 맨 앞줄의 박영인 학생과
          <br />
          2분단 맨 뒷줄의 남현철 학생입니다.
          <br />
          부모님들은 영인이가 갖고 싶어 했던 축구화,
          <br />
          현철이가 즐겨 연주하던 기타를 팽목항에 갖다 놓으며
          <br />
          간절하게 기다렸지만 두 아이는
          <br />
          인양된 세월호에서도 발견되지 않았습니다.
          <br />
          <br />
          세월호가 인양된 후, 6반이 있던 4층 선수 부분에서
          <br />
          영인이의 교복 상의가 발견되었지만
          <br />
          결국 유해는 찾지 못했습니다.
          <br />
          가족들은 2017년 11월 20일, 참사 발생 1,315일 만에
          <br />
          편지와 유품을 모아 두 아이를 하늘로 보내주었습니다.
          <br />
          <br />
          수학여행에서 돌아오면 하고 싶은 일이 많았을
          <br />
          2학년 6반 25명의 친구들을 떠올려 봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>축구, 야구는 물론 다양한 운동을 좋아하는 볼링부원 박영인</li>
            <li>&lt;사랑하는 그대여&gt;라는 따뜻한 노래를 남긴 이다운</li>
            <li>
              선한 미소와 밝은 기운으로 주변 사람을 무장해제
              <br />
              시켜버린 이영만
            </li>
            <li>그래픽 디자이너를 꿈꾸며 깎은 몽당연필의 주인 이건계</li>
            <li>무대 위라면 무엇이든 될 수 있는 연극부원 김동협</li>
            <li>좋아하는 일에는 온 힘을 다할 줄 아는 패션 디자이너 이장환</li>
            <li>말과 글, 책을 사랑해 국어 교사가 되고 싶은 신호성</li>
            <li>그림을 잘 그려 실내 건축 디자이너라는 꿈이 생긴 김승혁</li>
            <li>
              법관이 되어 평등한 세상을 위한 나만의 역할을
              <br />
              하고 싶은 홍종영
            </li>
            <li>
              도움이 필요한 사람에게 꼭 손을 내밀곤 하는
              <br />
              가족 바라기 정원석
            </li>
            <li>교실 앞자리에서 빛나는 눈으로 수업에 집중했을 김동영</li>
            <li>
              엄마가 처음으로 쓴 손편지와 함께 생일에
              <br />
              수학여행을 떠난 전현탁
            </li>
            <li>헤어 디자이너를 꿈꾸며 자기 머리를 직접 손질한 김승환</li>
            <li>기타 연주, 글쓰기를 좋아하고 멋지게 해내는 남현철</li>
            <li>공인 2단의 검도실력을 뽐내는 멋진 경호원을 꿈꾼 최덕하</li>
            <li>세계 곳곳에 있을 내 모습을 상상하며 외교관을 꿈꾼 서재능</li>
            <li>운동이 취미이자 특기인, 영원한 누나들의 ‘황만두’, 황민우</li>
            <li>영어를 재미있어하는 온 가족의 라면요리사 박새도</li>
            <li>사랑하는 가족들을 위해 시작한 요리가 꿈으로 발전한 이태민</li>
            <li>예쁜 짓만 골라하는 아들이자 동생이자 친구인 권순범</li>
            <li>웃음도 장난기도 많아 가족과 친구들을 웃게 만들어준 김승태</li>
            <li>회계사라는 꿈을 향해 공부에 열의가 생긴 이세현</li>
            <li>성공한 사업가가 되어 엄마에게 펜션을 선물하고 싶은 김민규</li>
            <li>많은 곳을 여행하며 많은 경험을 해 ‘멋지게’ 살고 싶은 구태민</li>
            <li>엄마의 든든한 버팀목이자 알아주는 축구 마니아 선우진</li>
          </ul>
          <br />
          한 명 한 명이 품은 이야기들,
          <br />
          우리에게 남긴 질문들을 잊지 않겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "7반": () => {
    useA11y("class_07");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          7반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 7반은 남학생 이과반입니다.
          <br />
          33명의 학생이 수학여행을 떠나
          <br />
          32명의 학생이 희생되고, 단 한 명의 학생이 돌아왔습니다.
          <br />
          <br />
          7반은 가장 많은 학생이 희생된 반이고,
          <br />
          세월호에서 마지막으로 탈출한 학생이 있는 반입니다.
          <br />이 학생조차 해경이 구한 것이 아닌
          <br />
          스스로 탈출해 살았던 것입니다.
          <br />
          <br />
          2학년 7반 교실의 시계는 우리가 기억해야 하는 사람들과
          <br />
          계속 관심을 가져야 하는 이야기들을
          <br />
          온몸으로 나타내고 있습니다.
          <br />
          단원고 4.16기억교실 각 반에 있는 시계는
          <br />
          시간의 흐름에 따라 자연스럽게 멈춘 것도 있고,
          <br />
          7반의 시계처럼 교실을 찾아온 이들에게
          <br />
          말을 거는 것도 있습니다.
          <br />
          <br />
          그 해, 교내 환경미화 심사 최우수 학급이기도 했던 2학년 7반,
          <br />
          깨끗한 교실을 만들고 싶어 정성을 다해준 아이들을 위해
          <br />
          7반 교실은 32명의 아이들을 꼭 기억해 달라고 말합니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>
              공부에 쓸 학용품을 꼼꼼히 고르며 과학 선생님의 꿈을
              <br />
              키워간 이근형
            </li>
            <li>
              가족들에게는 애기였지만 사실은 의젓하고
              <br />
              어른스러운 이민우
            </li>
            <li>태권도를 잘하고, 형과 둘도 없는 친구처럼 지낸 김성빈</li>
            <li>커다란 손으로 할 줄 아는 것이 많은 팔방미인 박성복</li>
            <li>기타를 독학해 가족 앞에서 연주해 준 ‘오이 오빠’ 김상호</li>
            <li>피아노 연주로 가족과 친구들을 행복하게 만들어 준 김정민</li>
            <li>세상에서 가장 강한 남자가 되기 위해 땀 흘리는 박인배</li>
            <li>
              &lt;Let it go&gt;를 좋아하고 엉뚱한 말로 웃음을 줄 줄<br />
              아는 김수빈
            </li>
            <li>
              여동생을 너그럽게 살피고 로봇을 꼼꼼히 조립할 줄<br />
              아는 정동수
            </li>
            <li>엄마 품과 엄마 냄새를 좋아해 전막내라고 불린 전찬호</li>
            <li>
              운동을 좋아하고 리더십 있는 성격으로 경찰이
              <br />
              되고 싶은 심장영
            </li>
            <li>21명의 친구들과 뜨겁고 빛나는 우정을 주고받은 양철민</li>
            <li>
              무뚝뚝한 듯해도 다정하고, 투박한 듯해도
              <br />
              섬세한 성격의 안중근
            </li>
            <li>
              성대모사는 기본, 익살과 재치를 두루 갖춘
              <br />
              웃음 제조기 이진형
            </li>
            <li>흥도, 끼도, 꿈도 넘치는, 친구들의 수학선생님 김민수</li>
            <li>
              모두가 감탄하는 맛의 떡볶이를 뚝딱 만들어 내는
              <br />
              요리사 손찬우
            </li>
            <li>항상 밝아 칭찬이 절로 나왔던 두 누나의 막내 동생 김기수</li>
            <li>
              여리고 약한 것을 잘 돌보고 단발머리가 멋지게
              <br />
              어울리는 최현주
            </li>
            <li>엄마에게 딸 같은 아들이 되어 준 꿈 많은 소년 이준우</li>
            <li>다정한 아들, 살가운 제자, 유쾌한 친구, 한다면 하는 나강민</li>
            <li>수학, 과학에 특출난 재능이 있고 보라색을 좋아하는 국승현</li>
            <li>환자를 웃게 만드는 명랑한 간호사가 되기로 결심한 오영석</li>
            <li>털털한 성격으로 친구들을 앞에서 이끌곤 하는 김건호</li>
            <li>특전사의 꿈을 기르며 몸도 마음도 단단해진 이강명</li>
            <li>성적도 오르고 친구들과도 즐거워 학교생활을 좋아한 서현섭</li>
            <li>마음먹은 대로! 자신과의 약속은 지키고야 마는 곽수인</li>
            <li>축구도 공부도 뛰어난 반장이자 집안의 든든한 맏이 이수빈</li>
            <li>육군사관학교에 들어가 사랑하는 가족을 지킬 꿈을 꾼 박현섭</li>
            <li>
              하얀 물뱀 태몽으로 엄마에게 온, 파충류 전문 학자를
              <br />
              꿈꾼 허재강
            </li>
            <li>늘 깔끔하고 세련되게 자신을 꾸밀 줄 아는 멋쟁이 성민재</li>
            <li>친구들의 컴퓨터 해결사, 프로게이머를 꿈꾸는 게임왕 송강현</li>
            <li>
              아빠의 사랑 속에서 쑥쑥 자라 패션모델이라는
              <br />
              꿈을 가진 이정인
            </li>
          </ul>
          <br />이 교실에 남은 아이들의 손길과 시간을 가슴에 새기겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "8반": () => {
    useA11y("class_08");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          8반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 8반은 남학생 이과반입니다.
          <br />
          31명의 학생이 수학여행을 떠나
          <br />
          29명의 학생이 희생되고, 두 명의 학생이 돌아왔습니다.
          <br />
          <br />
          2학년 8반 아이들이 교실 달력에 ‘수, 학, 여, 행’
          <br />네 글자를 적어 놓을 때 마음이 어땠을지를 생각하면
          <br />
          절대로 일어나서는 안 되는 일이었습니다.
          <br />
          <br />
          이과반은 문과반에 비해 인원수가 적은 편입니다.
          <br />
          2014년 단원고등학교 2학년 이과반 남학생들은
          <br />
          2개 반 64명 중 단 3명만이 우리 곁으로 돌아왔습니다.
          <br />
          <br />
          시간이 흐를수록 지워지고 잊혀지는 시간 속에서
          <br />
          우리가 할 수 있는 일은 보다 구체적으로
          <br />이 교실에 남은 삶의 흔적들을 떠올려 보는 일일 것입니다.
          <br />
          꿈과 목표가 정해질 때면 게시판에 스스로의 다짐을 새겼을
          <br />
          2학년 8반 아이들의 모습을 상상해 보면서 말입니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>
              부모님의 속옷 서랍에 깜짝 선물을 넣어두는 다정한
              <br />
              아들 임건우
            </li>
            <li>
              컴퓨터와 기계에 관심이 많지만 마음은 늘 사람을
              <br />
              향하는 박시찬
            </li>
            <li>과일과 채소를 유난히 좋아하는 담백하고 신선한 소년 전현우</li>
            <li>포기하지 않고 애니메이션을 창조하겠다는 꿈을 키운 박수찬</li>
            <li>용돈을 차곡차곡 모아 부모님의 기념일을 챙겨드린 김창헌</li>
            <li>주일이면 친구들과 모여 축구하기를 좋아하는 이승현</li>
            <li>
              스스로 컴퓨터를 고칠 수 있지만 엄마에게는 영원한
              <br />
              ‘아기’, 이승민
            </li>
            <li>
              공군사관학교 출신 파일럿이 되고 싶어 차근차근
              <br />
              나아간 홍승준
            </li>
            <li>
              여러 분야에 관심이 많은 취미부자, 붙임성 좋은
              <br />
              개구쟁이 이재욱
            </li>
            <li>
              분해하고 다시 조립하는 모든 것을 단 하루 만에
              <br />
              해내는 김영창
            </li>
            <li>
              수학여행 가기 전, 맘에 드는 옷과 운동화를 장만해
              <br />
              설렌 백승현
            </li>
            <li>맛있는 것을 먹으러 다닐 때 행복한 미래의 요리사 제세호</li>
            <li>체구는 작지만 다부진 손으로 만능 엔지니어를 꿈꾼 고우재</li>
            <li>
              창의적으로 자유롭게! ‘구글’에서 일하는 프로그래머가
              <br />
              꿈인 김재영
            </li>
            <li>직접 만든 자동차를 타고 여행하며 노래 부르고 있을 안주현</li>
            <li>깔끔하고, 꼼꼼하고, 옳다고 믿는 것에는 항상 꼿꼿한 김대현</li>
            <li>늦둥이로 태어나 엄마 사랑이 각별한 태권보이 조봉석</li>
            <li>다친 엄마에게 손수 약을 발라준 ‘우리 집 다람쥐’ 김동현</li>
            <li>
              “열심히 살자!”는 좌우명을 책상에 새기고 마음에
              <br />
              새긴 최수빈
            </li>
            <li>책과 게임에 푹 빠져드는 자신만의 시간이 소중한 지상준</li>
            <li>어른이 되면 시베리아 횡단열차를 타고 여행하고 싶은 최진혁</li>
            <li>
              엄마에게 필요한 걸 선물할 줄 아는 일편단심
              <br />
              축구사랑 임현진
            </li>
            <li>겸손하고 듬직하고 친절해 동생이 닮고 싶은 형, 김제훈</li>
            <li>“할 수 있어, 힘내!”라는 말로 주변을 환하게 만드는 장준형</li>
            <li>
              감동적인 연극, 영화, 드라마를 만드는 연출가가
              <br />
              되고픈 최정수
            </li>
            <li>
              매주 토요일 저녁, 가족과의 삼겹살 파티 약속을
              <br />잘 지킨 이호진
            </li>
            <li>부드럽고 조용한 카리스마로 로봇동아리 회장을 맡은 박선균</li>
            <li>손재주가 뛰어나고 엄마 밥을 제일 좋아하는 ‘삼식이’ 김선우</li>
            <li>
              엄마의 마음을 위로해준 소울푸드, 참치동그랑땡
              <br />
              전문가 조찬민
            </li>
          </ul>
          <br />
          이 교실에서 피어났을 아이들의 다채로운 꿈과
          <br />
          고민들을 마음에 담아 가겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "9반": () => {
    useA11y("class_09");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          9반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 9반은 여학생 이과반입니다.
          <br />
          22명의 학생이 수학여행을 떠나
          <br />
          20명의 학생이 희생되고, 두 명의 학생이 돌아왔습니다.
          <br />
          <br />
          세월호 선체조사위원회의 보고서는
          <br />
          세월호 참사를 이렇게 기록합니다.
          <br />
          "지킬 것들을 제대로 지켰다면,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;세월호는 그렇게 출항하지 않았을 것입니다."
          <br />
          "묶을 것들을 제대로 묶었다면,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;세월호는 그렇게 넘어지지 않았을 것입니다."
          <br />
          "닫을 것들을 제대로 닫았다면,
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;세월호는 그렇게 가라앉지 않았을 것입니다."
          <br />
          <br />
          9반 교실 칠판 옆 게시판에는 아이들이 함께 쓰는 공간을
          <br />잘 유지하기 위한 역할분담표를 붙여놓았습니다.
          <br />
          칠판·복도·교실·음악실 청소, 분리수거, 쓰레기통 관리까지
          <br />할 일을 꼼꼼히 나누었습니다.
          <br />
          작은 역할이지만 맡은 일을 제대로 해내는
          <br />
          교실 풍경이 그려집니다.
          <br />
          <br />
          육지에서, 바다에서, 배에서, 어른들이 맡은 일을
          <br />
          제때 제대로 하지 않았기에 우리 곁을 떠나간
          <br />
          2학년 9반 아이들의 이름을 불러봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>전 세계 어려운 사람들을 찾아 돕는 일을 하고 싶은 이수진</li>
            <li>
              고양이 다윤이가 새끼 낳던 날, 그 곁을 지켜준 고양이
              <br />
              언니 정다혜
            </li>
            <li>네 잎 클로버를 키우는 소녀 권민경</li>
            <li>못 이룬 엄마의 꿈을 대신 이뤄주겠다는 엄마바라기 조은정</li>
            <li>
              중국 안산시에서 나고 자라 중학생 때 한국 안산시에 온<br />
              친구 배향매
            </li>
            <li>수의사를 꿈꿨지만 이제는 뮤지컬 배우가 되고 싶은 편다인</li>
            <li>
              기타도 연극도, 하고 싶은 일이 생기면 조용히 타오르는
              <br />
              불꽃 오경미
            </li>
            <li>
              배 만드는 사람이 되고 싶어서 서점을 돌며 조선공 책을
              <br />
              찾는 김혜선
            </li>
            <li>
              아빠의 흰머리를 염색하고 엄마 얼굴에 팩을 해주는
              <br />
              다정한 임세희
            </li>
            <li>
              ‘목표를 세우면 그 목표가 나를 이끈다’며 계획표도
              <br />
              꼼꼼히 짜는 이보미
            </li>
            <li>아빠를 닮아 키가 크고 축구 보는 것을 좋아하는 최진아</li>
            <li>
              베스트 프렌즈 다섯 명의 우정에 ‘포에버’라는 이름을
              <br />
              지은 진윤희
            </li>
            <li>놀기도 잘하고 공부도 잘하는 당찬 공주 이한솔</li>
            <li>언제나 엄마 사랑, 엄마에게 러브레터를 보내는 김민정</li>
            <li>
              수학여행에서 돌아와 공부에 집중할 거라며 책상을
              <br />
              깔끔히 정리한 김초예
            </li>
            <li>가족들의 스파게티 담당 요리사 고하영</li>
            <li>최고의 한의사가 되는 인생 로드맵을 세우는 김해화</li>
            <li>수학여행 다녀와 제빵학원 다닐 계획에 설레는 정다빈</li>
            <li>10년 모은 용돈 800만원을 집 살 때 보탠 통 큰 딸 박예지</li>
            <li>아픈 사람 낫게 해주는 ‘황금손’ 약사가 되고 싶은 김아라</li>
          </ul>
          <br />
          미안하고 그리운 2학년 9반 스무 명 친구들을 기억합니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "10반": () => {
    useA11y("class_10");
    const { zoom } = useSettingStore(({ zoom }) => ({ zoom }));
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          10반 교실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          2학년 10반은 여학생 이과반입니다.
          <br />
          21명의 학생이 수학여행을 떠나
          <br />
          20명의 학생이 희생되고, 한 명의 학생이 돌아왔습니다.
          <br />
          <br />
          10반 교실 칠판에는 ‘두 달 전에 왔을 때는
          <br />
          여기 칠판이 가득 찼었는데 오늘 와보니
          <br />
          칠판이 너무 허전하네요’라는 글이 보입니다.
          <br />
          ‘우리가 분필을 들고 있는 한 세월호는 지워지지 않는다’
          <br />
          칠판 아래에 다짐처럼 적은 한 문장이 오래 눈길을 끕니다.
          <br />
          <br />
          세월호가 침몰하던 그날 그 바다를 보며
          <br />
          우리는 슬퍼하고 분노 했습니다.
          <br />
          다시는 이런 희생이 생기지 않도록
          <br />
          우리 교육이 살아 나길 바랍니다.
          <br />
          아픔 속에서 희망이 피어나는 세상을 기다립니다.
          <br />
          <br />
          2014년 4월 16일의 약속을 기억하며
          <br />
          2학년 10반 아이들의 이름을 불러봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>띠동갑 동생을 돌보다 유치원 선생님이 되고 싶어진 이소진</li>
            <li>‘안산에서 주희 모르면 간첩’, 친구 많고 인기 많은 김주희</li>
            <li>
              할 줄 아는 게 수학밖에 없으니
              <br />
              장래 희망도 수학 선생님이라는 이다혜
            </li>

            <li>
              친구들 치마도 척척 고쳐주고
              <br />한 번 본 춤은 바로 따라 추는 재주꾼 이해주
            </li>

            <li>아빠의 줄무늬 셔츠를 좋아해서 자주 빌려 입는 김다영</li>
            <li>
              수학여행 사진 찍어 날마다 엄마에게 보낼테니
              <br />
              그것 보고 웃으라고 말하던 권지혜
            </li>

            <li>
              스무 살부터는 돈 벌어 집안을 일으켜보리라,
              <br />
              국가자격증을 따놓은 김송희
            </li>

            <li>
              이다음에 크면 아빠랑 같이 술도 마셔주고
              <br />
              운전도 대신해주고 싶은 이단비
            </li>

            <li>
              언니가 유모차 태워 학교에 데려갔을 만큼
              <br />
              너무 예쁜 동생 이경민
            </li>

            <li>
              사촌 언니들과 아이스크림 먹으며
              <br />
              수다 떠는 게 즐거운 이은별
            </li>
            <li>아빠 등에 매달려 ‘나무늘보 놀이’를 즐기는 애교쟁이 구보현</li>

            <li>
              대학 가서 농사 공부하고 엄마랑 시골 살며
              <br />
              농사를 지으려는 김유민
            </li>

            <li>엄마처럼 사랑으로 달이와 팽이를 키우는 달팽이 엄마 이가영</li>
            <li>연극부 활동하며 방송음향과에 진학할 계획을 세우는 박정슬</li>
            <li>단원고 댄스동아리 ‘트렌디’의 분위기 메이커 이경주</li>
            <li>엄마 아빠 생일이면 케이크를 만들어 선물하는 김민정</li>
            <li>
              큰 대학병원 간호사가 돼 돈 많이 벌어서
              <br />
              엄마에게 집을 사주고 싶은 강한솔
            </li>
            <li>
              아르바이트하느라 고단한 언니의 대학 과제도
              <br />
              도와주는 실력파 동생 장혜원
            </li>
            <li>
              카라멜 마끼아또에 네 잎 클로버 무늬를 띄워
              <br />
              엄마에게 건네고 싶은 장수정
            </li>

            <li>친구들 생일이면 미역국 끓여 보온병에 담아오는 김슬기</li>
          </ul>
          <br />
          열여덟의 우정과 사랑으로 다정다감한 2학년 10반
          <br />
          스무 명 친구들을 오래오래 기억하겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  교무실: () => {
    const { zoom } = useSettingStore(({ zoom }) => ({ zoom }));
    useA11y("class_11");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          교무실 안내
        </DescriptionTitle>
        <br />
        <DescriptionContent>
          아이들과 수학여행을 떠난 단원고 선생님은 모두 14명입니다.
          <br />
          그중 11명의 선생님이 희생되고 3명이 돌아왔습니다.
          <br />
          <br />
          세월호에서 8명의 선생님들은 아이들과 함께 4층 객실을,
          <br />
          나머지 6명의 선생님들은 5층 객실을 사용했습니다.
          <br />
          <br />
          아침 식사를 마치고 한가로운 시간,
          <br />
          갑자기 배가 기울었지만 상황에 대한 아무 설명도 없이
          <br />
          제자리에서 대기하라는 방송만 반복됐습니다.
          <br />
          <br />
          선생님들의 책상 위 교사 업무 파일 안에는
          <br />
          ‘수학여행 인솔 교원 사전 연수자료’가 남아있고,
          <br />
          칠판에는 당시 선생님들이 직접 적어 놓았던
          <br />
          4월의 행사 계획이 그대로 남아있습니다.
          <br />
          칠판에 적힌 계획대로 수학여행을 떠나기 전 사전교육을 통해
          <br />
          탈출이나 안전장비에 대해 인지하고 있었지만,
          <br />
          ‘위험하니 절대로 움직이지 말고 대기하라’는
          <br />
          선원의 방송으로 아이들과 선생님들은
          <br />
          모두 움직일 수 없었습니다.
          <br />
          <br />
          선생님들의 책상 위에는 교무일기와 출석부가 남아있습니다.
          <br />
          교무일기에는 아이들 사진도 붙이고, 아이들의 꿈도 적고,
          <br />
          선생님마다 자율적으로 반을 운영하고
          <br />
          기록한 흔적이 남아있습니다.
          <br />
          <br />
          2014년 4월 16일.
          <br />
          세월호는 바다에 떠 있는 학교였습니다.
          <br />
          침몰하는 순간에도
          <br />
          ‘학생들은 절대 움직이지 말라’는 방송이 나오던 현장.
          <br />
          탈출을 고민하는 자율보다
          <br />
          가만히 있으라는 방송을 따라야 했던 현장.
          <br />
          이 현장은 그동안 이어져 온 주입식 교육의 현장이었습니다.
          <br />
          <br />
          기울고 물이 차는 배 안에서 구조를 믿고 기다리던
          <br />
          아이들의 생명을 끝내 지키지 못한 나라에서
          <br />
          마지막까지 아이들 곁에 있던
          <br />
          11명 선생님의 이름을 불러봅니다.
          <br />
          <br />
          <ul
            css={css`
              padding-left: 1rem;
              li {
                margin-bottom: 0.2rem;
              }
            `}
          >
            <li>아침마다 손을 크게 흔들며 학생들을 맞이하는 선생님 고창석</li>
            <li>학생들이 ‘아빠’라고 부를 만큼 다정한 선생님 김응현</li>
            <li>
              학생들의 개성을 키우는 맵시 있는 교육을 고민하는
              <br />
              선생님 김초원
            </li>

            <li>
              제자들에게 더 많은 세상을 경험하는 여행을 떠나라
              <br />
              조언하는 선생님 남윤철
            </li>

            <li>
              학생들의 환경과 처지를 먼저 살피고 이해하려 노력하는
              <br />
              선생님 박육근
            </li>

            <li>
              학교 텃밭의 여린 채소를 키우듯 학생들을 다독이는
              <br />
              선생님 양승진
            </li>

            <li>언니, 누나처럼 학생들에게 편하게 다가서는 선생님 유니나</li>
            <li>밤늦게까지 학생들에게 손편지를 쓰는 선생님 이지혜</li>
            <li>
              좋은 교사, 좋은 아빠, 좋은 남편, 누구에게나 참 좋은
              <br />
              선생님 이해봉
            </li>

            <li>
              항상 학생을 생각하는 선생님이 되겠다는 첫 다짐을
              <br />
              실천하는 선생님 전수영
            </li>
            <li>
              학생들 마음을 살필 수 있는 기회라며 꾸준히 방과후
              <br />
              상담을 하는 선생님 최혜정
            </li>
          </ul>
          <br />
          생의 마지막까지 선생님의 자리에 서 있던,
          <br />
          11명의 선생님들을 오래오래 기억하겠습니다.
          <br />
          <br />
          화면 상단에 있는 각반 혹은 교무실을
          <br />
          선택하면 해당 안내로 이동합니다.
          <br />
          다른 메뉴를 살펴보려면
          <br />
          좌측 하단에 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
};

// {delaySignActive && videoSrc && (
//   <motion.div
//     key={videoSrc}
//     ref={signRef}
//     initial={{
//       opacity: 0,
//     }}
//     animate={{
//       opacity: 1,
//       transition: {
//         delay: 0.5,
//       },
//     }}
//     exit={{ opacity: 0 }}
//     transition={{
//       type: "tween",
//       ease: "linear",
//     }}
//     css={css`
//       /* width: 36rem; */
//       flex: 0 0 21.7rem;
//       display: flex;
//       flex-direction: column;
//       height: 100%;
//     `}
//   >
//     <PreloadVideo
//       key={videoSrc}
//       src={videoSrc}
//       autoPlay
//       muted
//     ></PreloadVideo>
//   </motion.div>
// )}
