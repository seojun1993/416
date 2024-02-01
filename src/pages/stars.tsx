/** @jsxImportSource @emotion/react */
import { Card } from "@/components/common/card";
import { MainShell } from "@/components/common/main-shell";
import StarCloud from "@/components/pages/stars/cloud";
import EmblaCarousel from "@/components/ui/carousel";
import { H1 } from "@/components/ui/text";
import { Prefetch } from "@/libs/plugins/prefetch";
import { getImagePath } from "@/libs/utils";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useMemo } from "react";

const Stars = () => {
  const { data: students } = useQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );
  const theme = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    Prefetch({
      onSelect(selectedIndex) {},
    }),
  ]);

  const SlideCardAspect = useMemo(
    () => Math.min(5, students?.length ?? 0),
    [students]
  );

  return (
    <MemoryShell
      css={css`
        flex-direction: column;
        row-gap: 1.6rem;
        padding-bottom: 2rem;
      `}
    >
      <MemoryHeader>
        <span
          css={css`
            color: ${theme.color.yellow};
          `}
        >
          별
        </span>
        을 터치하여 희생자를 만나보세요
      </MemoryHeader>
      <StarsSpace
        css={css`
          padding: 1.34rem 0;
          flex-grow: 1;
          width: 100%;
          overflow: hidden;
          overflow-x: scroll;
        `}
      >
        <StarCloud />
      </StarsSpace>
      {students ? (
        <EmblaCarousel
          aspect={1 / SlideCardAspect}
          cssSlide={css`
            width: 100%;
            display: flex;
            align-items: flex-end;
            padding-left: 10.6rem;
            padding-right: 10.6rem;
            height: 570px;
          `}
          carouselType={[emblaRef, emblaApi]}
          slides={students}
          options={{ animate: false }}
        >
          {(item, index) => {
            return (
              <Card
                linkStyle={css`
                  aspect-ratio: 10 / 12.3;
                `}
                badge={item.title_keyword}
                classDescription={item.class_number}
                onFirstClick={() => {
                  emblaApi?.scrollTo(index);
                }}
                href={`board?id=${item["416_id"]}`}
                image={getImagePath(item.caricature)}
                birth={item.birthday}
                title={item.name}
              />
            );
          }}
        </EmblaCarousel>
      ) : null}
    </MemoryShell>
  );
};

export default Stars;
const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.6rem;
`;
const MemoryHeader = styled(H1)`
  text-align: center;
`;

const StarsSpace = styled.div`
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border};
  border-width: 0.15rem;
  border-style: solid;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;
`;
