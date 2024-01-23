/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";

import OnboardCompoents from "@/components/pages/onboard";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { getStudentsQuery } from "@/queries/student";
import { getImagePath } from "../../libs/utils";
import { EmblaCarouselType } from "embla-carousel";

const OnBoard = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  const { data: students } = useQuery(getStudentsQuery);
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
    }),
    (function () {
      let emblaApi: EmblaCarouselType;
      let nodes: HTMLElement[];

      function onSlideInView() {
        const idxs = emblaApi.slidesInView();
        const idxList = [
          idxs[0] - 2,
          idxs[0] - 1,
          ...idxs,
          idxs[idxs.length - 1] + 1,
          idxs[idxs.length - 1] + 2,
        ];
        idxList.forEach((idx) => {
          const img = nodes?.[idx]?.querySelector("img");
          if (img) {
            if (img.getAttribute("loading") === "lazy") {
              img.removeAttribute("loading");
            }
          }
        });
      }
      return {
        init(embla, OptionsHandler) {
          emblaApi = embla;
          nodes = emblaApi.slideNodes();
          emblaApi.on("slidesInView", onSlideInView);
        },
        name: "virtual",
        options: {},
        destroy() {
          emblaApi.off("slidesInView", onSlideInView);
        },
      };
    })(),
  ]);

  return (
    <OnBoardShell>
      <Saver>
        <OnboardCompoents.OnBoardTitle title="고해인" />
        {students ? (
          <EmblaCarousel
            carouselType={[emblaRef, emblaApi]}
            slides={students}
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
                    href={`board?id=${item["416_id"]}`}
                    image={getImagePath(item.caricature)}
                    birth={item.birthday}
                    title={item.name}
                  />
                </div>
              );
            }}
          </EmblaCarousel>
        ) : null}
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
