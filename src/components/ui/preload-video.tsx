/** @jsxImportSource @emotion/react */
import { HTMLMotionProps, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { fadeInOutVariants } from "@/variants";
import { useSettingStore } from "@/contexts/setting.store";
import { css } from "@emotion/react";
import { P3 } from "./text";
interface PreloadVideoProps extends HTMLMotionProps<"video"> {}

const VideoSpeeds = [
  {
    text: "느리게",
    value: 1,
  },

  {
    text: "보통",
    value: 1.5,
  },
  {
    text: "빠르게",
    value: 2,
  },
];

const PreloadVideo = (props: PreloadVideoProps) => {
  const { speed, setSpeed, isPlaying, setIsPlaying } = useSettingStore(
    ({ speed, setSpeed, isPlaying, setIsPlaying }) => ({
      speed,
      setSpeed,
      isPlaying,
      setIsPlaying,
    })
  );
  const controls = useAnimation();
  const { src } = props;
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
    if (isPlaying && videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed, videoRef.current, isPlaying]);
  return (
    <LazyMotion features={domAnimation}>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          align-items: center;
          width: 36rem;
        `}
      >
        <m.video
          css={css`
            user-select: none;
            pointer-events: none;
            object-fit: cover;
            width: 100%;
            height: 70%;
          `}
          variants={fadeInOutVariants}
          loop
          initial="initial"
          animate={controls}
          transition={{
            ...props.transition,
            duration: 0.5,
          }}
          ref={videoRef}
          {...props}
        />
        <div
          css={css`
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
          `}
        >
          <P3
            css={css`
              margin-bottom: 0.5rem;
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
              <button
                key={item.text}
                css={css`
                  background-color: transparent;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  border: none;
                  padding: 0;
                  padding: 0;
                `}
                onClick={() => setSpeed(item.value)}
              >
                <div
                  css={css`
                    background-color: ${speed === item.value
                      ? "#8080FF"
                      : "gray"};
                    border-radius: 9999rem;
                    width: 0.8rem;
                    aspect-ratio: 1/1;
                    border: none;
                    position: relative;
                    &::after {
                      content: "${item.text}";
                      white-space: nowrap;
                      pointer-events: none;
                      position: absolute;
                      left: 50%;
                      transform: translateX(-50%);
                      top: 100%;
                      font-family: "Pretendard";
                      font-size: calc(var(--font-size) * 1.12);
                      line-height: 1.2;
                      text-align: center;
                      font-weight: 700;
                      margin-top: 0.2rem;
                    }
                  `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default PreloadVideo;
