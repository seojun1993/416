/** @jsxImportSource @emotion/react */
import { ReactNode } from "react";
import { EmblaOptionsType, UseEmblaCarouselType } from "embla-carousel-react";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";

interface EmblaCarouselProps<T> {
  slides: T[];
  options?: EmblaOptionsType;
  cssSlide?: SerializedStyles;
  carouselType: UseEmblaCarouselType;
  children?: ReactNode | ((item: T, index: number) => ReactNode);
}
const EmblaCarousel = <T,>({
  slides,
  carouselType,
  cssSlide,
  children,
}: EmblaCarouselProps<T>) => {
  const [emblaRef, emblaApi] = carouselType;
  const theme = useTheme();
  return (
    <div css={cssSlide}>
      <Viewport ref={emblaRef}>
        <Container>
          {typeof children === "function" ? slides.map(children) : children}
        </Container>
        <LeftButton
          css={css`
            &:active {
              background-color: ${theme.color.accent.foreground};
            }
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
        </LeftButton>
        <RightButton
          onClick={() => {
            emblaApi?.scrollNext();
          }}
          css={css`
            &:active {
              background-color: ${theme.color.accent.foreground};
            }
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
              stroke="currentcolor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </RightButton>
      </Viewport>
    </div>
  );
};

export default EmblaCarousel;

const LeftButton = styled.button`
  position: absolute;
  left: 0%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;
const RightButton = styled.button`
  position: absolute;
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;

const Viewport = styled.div`
  width: 80dvw;
  overflow: hidden;
  position: relative;
`;

const Container = styled.div`
  backface-visibility: hidden;
  touch-action: pan-y;
  display: flex;
  justify-content: flex-start;
`;
