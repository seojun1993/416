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

const EmblaCarousel = <T,>({
  slides,
  options,
  renderItem,
  cssSlide,
}: EmblaCarouselProps<T>) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      delay: 5000,
    }),
  ]);

  const onButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop?.();
  }, []);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );
  return (
    <div css={cssSlide} className="embla" style={{ position: "relative" }}>
      <Viewport className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, index) => (
            <div className="embla__slide" key={index}>
              {renderItem(item)}
            </div>
          ))}
        </div>
        <DotPosition>
          {slides.map((_, index) => (
            <DotButton
              key={index}
              css={css`
                height: 0.95rem;
              `}
              onClick={() => onDotButtonClick(index)}
              isSelected={index === selectedIndex}
            />
          ))}
        </DotPosition>
      </Viewport>
    </div>
  );
};

export default EmblaCarousel;
