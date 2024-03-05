/** @jsxImportSource @emotion/react */
import { HTMLMotionProps, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { fadeInOutVariants } from "@/variants";
import { VideoSpeeds, useSettingStore } from "@/contexts/setting.store";
import { css, useTheme } from "@emotion/react";
import { P3 } from "./text";
import styled from "@emotion/styled";
import { isVideoPlaying } from "@/libs/utils";
interface PreloadVideoProps extends HTMLMotionProps<"video"> {}

const PreloadVideo = (props: PreloadVideoProps) => {
  const { speed, setSpeed, isPlaying, setIsPlaying, zoom } = useSettingStore(
    ({ speed, setSpeed, isPlaying, setIsPlaying, zoom }) => ({
      speed,
      setSpeed,
      isPlaying,
      setIsPlaying,
      zoom,
    })
  );
  const controls = useAnimation();
  const { src } = props;
  const theme = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (src && videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.onloadeddata = () => {
        controls.start("animate");
        setIsPlaying(true);
      };
      videoRef.current.onended = (event) => {
        controls.start("exit");
        setIsPlaying(false);
      };
    }
  }, []);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed, videoRef.current, isPlaying]);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        variants={fadeInOutVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          width: 100%;
          height: 100%;
          *:active,
          *:focus-visible {
            svg {
              * {
                opacity: 0.5;
              }
            }
          }
        `}
      >
        <m.div
          css={css`
            position: relative;
            height: 70%;
          `}
          initial="initial"
          animate={controls}
          transition={{
            ...props.transition,
            type: "tween",
            ease: "linear",
          }}
          onClick={() => {
            if (videoRef.current) {
              if (isVideoPlaying(videoRef.current)) {
                setIsPlaying(false);
                videoRef.current.pause();
              } else {
                setIsPlaying(true);
                videoRef.current.play();
              }
            }
          }}
        >
          <m.video
            css={css`
              width: 100%;
              height: 100%;
              object-fit: cover;
              filter: brightness(${isPlaying ? 1 : 0.6});
              transform: scale(${zoom});
              transform-origin: bottom;
              transition: filter 0.2s ease-in-out, transform 0.2s ease-in-out;
            `}
            loop
            ref={videoRef}
            {...props}
          />
          <button
            data-disable-focus-effect="true"
            css={css`
              position: absolute;
              left: 50%;
              bottom: -2.8rem;
              transform: translate(-50%, -50%);
              z-index: 10;
              background-color: transparent;
              border: none;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            `}
          >
            <RestartIcon
              tabIndex={5}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="222"
              height="230"
              viewBox="0 0 222 230"
            >
              <defs>
                <filter
                  id="패스_837"
                  x="0"
                  y="0"
                  width="222"
                  height="230"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feFlood floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="패스_838"
                  x="75.053"
                  y="63.234"
                  width="95.349"
                  height="103.718"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="5" result="blur-2" />
                  <feFlood floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur-2" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g
                id="그룹_186"
                data-name="그룹 186"
                transform="translate(1 5)"
                clipPath="url(#clip-path)"
              >
                <g
                  transform="matrix(1, 0, 0, 1, -1, -5)"
                  filter="url(#패스_837)"
                >
                  <path
                    id="패스_837-2"
                    data-name="패스 837"
                    d="M169.984,28.888c3.074-3.177,6-6.3,9.046-9.288a15.485,15.485,0,0,1,3.064-1.869c.5,1.065,1.331,2.1,1.446,3.2q1.575,15.177,2.907,30.377c.331,3.856-.973,5.126-4.648,4.8q-15.322-1.36-30.629-2.9a10.548,10.548,0,0,1-2.984-1.331,11.908,11.908,0,0,1,1.538-2.936c3.095-3.231,6.317-6.338,9.659-9.656A82.089,82.089,0,0,0,135.524,22.6C95.081,3.749,46.376,19.851,25.01,59.106c-28.645,52.629,4.484,117.828,63.807,125.575a84.944,84.944,0,0,0,87.814-48.137c.489-1.044.952-2.1,1.5-3.117,2.021-3.754,5.95-5.207,9.559-3.566a7.3,7.3,0,0,1,3.644,9.8,92.115,92.115,0,0,1-17.377,27.148c-23.156,24.9-51.764,36.02-85.555,32.582C44.07,194.881,7.762,159.57,1.131,115.165-6.568,63.612,25.754,14.863,76.261,3c34.292-8.056,64.848.231,91.216,23.736.689.613,1.4,1.2,2.507,2.156"
                    transform="translate(15 15)"
                    fill="currentColor"
                  />
                </g>
                {isPlaying ? (
                  <g
                    transform="matrix(1, 0, 0, 1, 0, 0)"
                    filter="url(#패스_3342)"
                  >
                    <path
                      css={css`
                        stroke: ${theme.color.main};
                      `}
                      id="패스_3342-2"
                      data-name="패스 3342"
                      d="M59.327,5.25v65M8.25,5.25v65"
                      transform="translate(81.21 72.25)"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="15"
                    />
                  </g>
                ) : (
                  <g
                    transform="matrix(1, 0, 0, 1, -1, -5)"
                    filter="url(#패스_838)"
                  >
                    <path
                      id="패스_838-2"
                      data-name="패스 838"
                      d="M113.1,137.171q0-14.949,0-29.9c.013-6.3,3.875-8.6,9.26-5.492q25.967,15,51.91,30.038c5.587,3.239,5.534,7.631-.126,10.912q-25.531,14.8-51.08,29.567c-2.288,1.324-4.568,2.738-7.291,1.056-2.635-1.627-2.711-4.2-2.7-6.915.055-9.756.022-19.512.02-29.268"
                      transform="translate(-23.03 -22.17)"
                      fill="currentColor"
                    />
                  </g>
                )}
              </g>
            </RestartIcon>
            <RestartText>
              <P3
                css={css`
                  color: black;
                `}
              >
                다시재생
              </P3>
            </RestartText>
          </button>
        </m.div>
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
      </m.div>
    </LazyMotion>
  );
};

export default PreloadVideo;

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

const RestartIcon = styled.svg`
  width: 4.4rem;
  height: 4.4rem;
  & * {
    fill: ${(props) => props.theme.color.main};
    transition: opacity 0.05s ease-in-out;
  }
`;

const RestartText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.8rem;
  height: 2rem;
  border-radius: 9999rem;
  margin-top: 0.4rem;
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "white" : props.theme.color.yellow};
`;
