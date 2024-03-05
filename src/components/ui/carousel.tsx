/** @jsxImportSource @emotion/react */
import {
  PropsWithChildren,
  ReactNode,
  memo,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { EmblaCarouselType, UseEmblaCarouselType } from "embla-carousel-react";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useScroll,
  MotionValue,
  LazyMotion,
  domAnimation,
  useTransform,
  m,
} from "framer-motion";
import { P3 } from "./text";

interface CarouselOption {
  animate?: boolean;
  button?: {
    leftStyle?: SerializedStyles;
    rightStyle?: SerializedStyles;
  };
}
const defaultCarouselOptions = { animate: true };

interface EmblaCarouselProps<T> {
  slides: T[];
  options?: CarouselOption;
  cssSlide?: SerializedStyles;
  carouselType: UseEmblaCarouselType;
  aspect?: number;
  showArrow?: boolean;
  children?: ReactNode | ((item: T, index: number) => ReactNode);
}
const EmblaCarousel = <T,>({
  slides,
  carouselType,
  children,
  cssSlide,
  aspect,
  showArrow = true,
  options = {},
}: EmblaCarouselProps<T>) => {
  const { animate, button: { leftStyle = "", rightStyle = "" } = {} } = {
    ...defaultCarouselOptions,
    ...options,
  };
  const [emblaRef, emblaApi] = carouselType;
  const theme = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useScroll({ container: containerRef });

  const onScroll = (embla: EmblaCarouselType) => {
    scrollX.scrollXProgress.set(embla.scrollProgress());
  };

  useEffect(() => {
    if (animate) {
      emblaApi?.on("scroll", onScroll);
      return () => {
        emblaApi?.off("scroll", onScroll);
      };
    }
  }, [emblaApi]);

  return (
    <div
      ref={ref}
      css={css`
        width: 80dvw;
        ${cssSlide && cssSlide}
        position: relative;
      `}
    >
      <Viewport ref={emblaRef}>
        <LazyMotion features={domAnimation}>
          <Container ref={containerRef}>
            {typeof children === "function"
              ? slides.map((item, index) => (
                  <ScaleChildren
                    enabled={animate}
                    aspect={aspect}
                    index={index}
                    maxLength={slides.length}
                    scrollX={scrollX.scrollXProgress}
                    key={index}
                  >
                    {children(item, index)}
                  </ScaleChildren>
                ))
              : children}
          </Container>
        </LazyMotion>
      </Viewport>
      {showArrow && (
        <>
          <LeftButton
            data-disable-focus-effect="true"
            css={css`
              ${leftStyle}
            `}
            onClick={() => {
              emblaApi?.scrollPrev();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54.482"
              height="96.969"
              viewBox="0 0 54.482 96.969"
            >
              <path
                id="prev_icon"
                d="M-20078.957-17310.031l-40,40,40,40"
                transform="translate(20124.955 17318.516)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
              />
            </svg>
            <P3 css={css``}>이전</P3>
          </LeftButton>
          <RightButton
            data-disable-focus-effect="true"
            onClick={() => {
              emblaApi?.scrollNext();
            }}
            css={css`
              ${rightStyle}
            `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="54.486"
              height="96.969"
              viewBox="0 0 54.486 96.969"
            >
              <path
                id="naxt_icon"
                d="M-20118.957-17310.031l40,40-40,40"
                transform="translate(20127.441 17318.516)"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
              />
            </svg>
            <P3 css={css``}>다음</P3>
          </RightButton>
        </>
      )}
    </div>
  );
};

const ScaleChildren = memo(
  <T,>({
    children,
    index,
    maxLength,
    scrollX,
    enabled,
    aspect = 0.33,
  }: PropsWithChildren<{
    index: number;
    maxLength: number;
    aspect?: number;
    scrollX: MotionValue<number>;
    enabled: boolean;
  }>) => {
    const center = useMemo(() => index / maxLength, []);
    const weight = useMemo(
      () => (((index + 1) % maxLength) / maxLength || 1) - center,
      []
    );
    const t = useTransform(
      scrollX,
      [center - weight, center, center + weight],
      enabled ? [0.9, 1, 0.9] : [1, 1, 1],
      {
        clamp: true,
      }
    );

    return (
      <div
        css={css`
          flex: 0 0 ${aspect * 100}%;
          padding-left: 1.6rem;

          /* margin: 0 auto; */
        `}
      >
        <m.div style={{ scale: t }}>{children}</m.div>
      </div>
    );
  }
);

export default EmblaCarousel;

const LeftButton = styled.button`
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.4rem;
  width: 4rem;
  height: 4.8rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;
const RightButton = styled.button`
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.4rem;
  width: 4rem;
  height: 4.8rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;

const Viewport = styled.div`
  /* display: flex; */
  /* justify-content: center; */
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  padding: 0.76rem 0.2rem;
  height: 100%;
`;

const Container = styled.div`
  backface-visibility: hidden;
  touch-action: pan-y;
  display: flex;
  justify-content: flex-start;
  margin-left: -1.6rem;

  height: 100%;
`;
