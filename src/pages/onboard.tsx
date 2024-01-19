/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import avatar1 from "@/assets/images/avatar/img.png";

import OnboardCompoents from "@/components/pages/onboard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { css } from "@emotion/react";

import { getLunar } from "holiday-kr";

const SLIDES = [
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
  { text: "1" },
];

const OnBoard = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const selectedName = useRef();
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
    }),
  ]);

  const d = getLunar(new Date("2025-02-29"));
  console.log(d);
  // console.log(new Date(`${d.year}-${d.month}-${d.day}`));

  return (
    <OnBoardShell>
      <Saver>
        <OnboardCompoents.OnBoardTitle />
        <EmblaCarousel
          carouselType={[emblaRef, emblaApi]}
          slides={SLIDES}
          options={OPTIONS}
        >
          {(item, index) => {
            return (
              <div
                css={css`
                  flex: 0 0 33.3333%;
                  margin: 2em auto;
                `}
                key={index}
              >
                <OnboardCompoents.Card
                  onFirstClick={() => {
                    emblaApi?.scrollTo(index);
                  }}
                  href="board?name=김예은"
                  image={avatar1}
                  birth="97.05.00"
                  title="고해인"
                />
              </div>
            );
          }}
        </EmblaCarousel>
      </Saver>
    </OnBoardShell>
  );
};

export default OnBoard;

const CarouselCardContent = styled.div`
  margin: 1.8rem 1.6rem;
  column-gap: 1.8rem;
  display: flex;
  justify-content: center;
`;

const OnBoardShell = styled(MainShell)`
  justify-content: space-between;
  overflow: clip;
  /* padding-left: 0; */
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
  /* &::after {
    right: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 15%;
    background: ${(props) =>
    `linear-gradient(to right, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
  &::before {
    left: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 15%;
    z-index: 1;
    background: ${(props) =>
    `linear-gradient(to left, transparent, ${props.theme.color.primary.foreground} 90%)`};
  } */
`;
