import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import avatar1 from "@/assets/images/avatar/img.png";

import OnboardCompoents from "@/components/pages/onboard";

const SLIDES = [{ text: "1" }, { text: "1" }, { text: "1" }];

const OnBoard = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <OnBoardShell>
      <Saver>
        <OnboardCompoents.OnBoardTitle />
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          renderItem={(item) => (
            <CarouselCardContent>
              <OnboardCompoents.Card
                href="board?name=김예은"
                image={avatar1}
                birth="97.05.00"
                title="고해인"
              />
              <OnboardCompoents.Card
                image={avatar1}
                birth={new Date("1997-09-01")}
                title="김민지"
              />
              <OnboardCompoents.Card
                image={avatar1}
                birth="97.04.00"
                title="김민희"
              />
            </CarouselCardContent>
          )}
        />
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
