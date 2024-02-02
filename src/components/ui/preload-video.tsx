/** @jsxImportSource @emotion/react */
import { HTMLMotionProps, useAnimation } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { m, LazyMotion, domAnimation } from "framer-motion";
import { fadeInOutVariants } from "@/variants";
import { useSettingStore } from "@/contexts/setting.store";
import { css } from "@emotion/react";
import { P3 } from "./text";
interface PreloadVideoProps extends HTMLMotionProps<"video"> {}

const VideoSpeeds = [
  {
    text: "x0.75",
    value: 0.9,
  },
  {
    text: "x1",
    value: 1,
  },
  {
    text: "x1.2",
    value: 1.1,
  },
  {
    text: "x1.5",
    value: 1.4,
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
  useLayoutEffect(() => {
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
  useLayoutEffect(() => {
    if (isPlaying && videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);
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
              & button + button {
                position: relative;
                &::before {
                  content: "";
                  position: absolute;
                  top: 50%;
                  transform: translateY(-50%);
                  left: -375%;
                  width: 3rem;
                  background-color: gray;
                  height: 4px;
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
