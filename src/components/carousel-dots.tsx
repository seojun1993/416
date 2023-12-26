/** @jsxImportSource @emotion/react */
import { EmblaCarouselType } from "embla-carousel-react";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { HTMLMotionProps, motion, useAnimation } from "framer-motion";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      if (onButtonClick) onButtonClick(emblaApi);
    },
    [emblaApi, onButtonClick]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

interface DotButtonProps extends PropsWithChildren<HTMLMotionProps<"button">> {
  isSelected?: boolean;
}

const Buttons = styled(motion.button)`
  border-radius: 9999px;
  border: none;
  & + button {
    margin-left: 0.5rem;
  }
`;

export const DotButton = (props: DotButtonProps) => {
  const { children, isSelected, ...restProps } = props;
  const controls = useAnimation();
  const theme = useTheme();
  useEffect(() => {
    controls.start(isSelected ? "selected" : "initial");
  }, [isSelected]);
  return (
    <Buttons
      className="underline"
      type="button"
      animate={controls}
      variants={{
        selected: {
          backgroundColor: theme.color.button.active,
        },
        initial: {
          backgroundColor: theme.color.secondary.foreground,
        },
      }}
      {...restProps}
    >
      {children}
    </Buttons>
  );
};
