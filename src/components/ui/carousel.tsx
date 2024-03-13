/** @jsxImportSource @emotion/react */
import {
  ComponentPropsWithoutRef,
  ComponentRef,
  PropsWithChildren,
  ReactNode,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EmblaCarouselType, UseEmblaCarouselType } from "embla-carousel-react";
import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import {
  useScroll,
  MotionValue,
  LazyMotion,
  domAnimation,
  useTransform,
  m,
} from "framer-motion";
import { H4, P3 } from "./text";

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
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useScroll({ container: containerRef });
  const [selectedIndex, setSelectedIndex] = useState(
    emblaApi?.selectedScrollSnap() ?? 0
  );

  const onScroll = (embla: EmblaCarouselType) => {
    scrollX.scrollXProgress.set(embla.scrollProgress());
  };

  useEffect(() => {
    setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0);
    console.log(console.log(emblaApi?.selectedScrollSnap()));
    if (animate) {
      emblaApi?.on("scroll", onScroll);
      emblaApi?.on("select", () => {
        setSelectedIndex(emblaApi?.selectedScrollSnap() ?? 0);
      });
      return () => {
        emblaApi?.off("scroll", onScroll);
      };
    }
  }, [emblaApi]);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        ref={ref}
        css={css`
          width: 80dvw;
          ${cssSlide && cssSlide}
        `}
      >
        <Viewport ref={emblaRef}>
          <LazyMotion features={domAnimation}>
            <Container ref={containerRef}>
              {typeof children === "function"
                ? slides.map((item, index) => (
                    <ScaleChildren
                      onFocus={() => {
                        emblaApi?.scrollTo(index);
                      }}
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
      </div>
      {showArrow && (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            column-gap: 1rem;
          `}
        >
          <LeftButton
            data-disable-focus-effect="true"
            data-a11y-id="이전"
            css={css`
              ${leftStyle}
            `}
            onClick={() => {
              emblaApi?.scrollPrev();
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
            </svg>

            <P3 css={css``}>이전</P3>
          </LeftButton>
          <H4>
            <b>{selectedIndex + 1}</b>&nbsp; /&nbsp;{slides.length}
          </H4>
          <RightButton
            data-disable-focus-effect="true"
            data-a11y-id="다음"
            onClick={() => {
              emblaApi?.scrollNext();
            }}
            css={css`
              ${rightStyle}
            `}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="10"
              />
            </svg>

            <P3 css={css``}>다음</P3>
          </RightButton>
        </div>
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
    ...rest
  }: PropsWithChildren<{
    index: number;
    maxLength: number;
    aspect?: number;
    scrollX: MotionValue<number>;
    enabled: boolean;
  }> &
    ComponentPropsWithoutRef<"div">) => {
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
        {...rest}
      >
        <m.div style={{ scale: t }}>{children}</m.div>
      </div>
    );
  }
);

export default EmblaCarousel;

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
