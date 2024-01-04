/** @jsxImportSource @emotion/react */
import { ReactNode, useCallback } from "react";
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType,
} from "embla-carousel-react";
import { DotButton, useDotButton } from "./carousel-dots";
import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import Autoplay from "embla-carousel-autoplay";

interface EmblaCarouselProps<T> {
  slides: T[];
  options?: EmblaOptionsType;
  renderItem: (item: T) => ReactNode;
  cssSlide?: SerializedStyles;
}

const Viewport = styled.div`
  position: relative;
`;

const DotPosition = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Container = styled.div`
  backface-visibility: hidden;
  touch-action: pan-y;
  display: flex;
  justify-content: flex-start;
`;

const EmblaCarousel = <T,>({
  slides,
  options,
  renderItem,
  cssSlide,
}: EmblaCarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 2000,
    }),
  ]);

  return (
    <div css={cssSlide} style={{ position: "relative" }}>
      <Viewport ref={emblaRef}>
        <Container>
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              {renderItem(item)}
            </div>
          ))}
        </Container>
        <LeftButton>
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
              stroke="#fb950a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
            />
          </svg>
        </LeftButton>
        <RightButton>
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
              stroke="#fb950a"
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
