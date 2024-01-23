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
import { Prefetch } from "../../libs/plugins/prefetch";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const OnBoard = () => {
  const { data: students } = useQuery(getStudentsQuery);
  const [searchParam, setSearchParam] = useSearchParams();
  const id = searchParam.get("centerIndex") ?? 0;
  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: Number(id) }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
    }),
    Prefetch({
      onSelect(selectedIndex) {
        searchParam.set("centerIndex", selectedIndex + "");
        setSearchParam(searchParam);
      },
    }),
  ]);

  const studentOnCenter = useMemo(() => {
    return id !== null && students?.[Number(id)];
  }, [id, students]);

  return (
    <OnBoardShell>
      <Saver>
        {studentOnCenter ? (
          <OnboardCompoents.OnBoardTitle title={studentOnCenter.name} />
        ) : null}
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
                    badge={item.title_keyword}
                    onFirstClick={() => {
                      emblaApi?.scrollTo(index);
                    }}
                    onDoubleClick={() => {
                      sessionStorage.setItem("redirect_id", id + "");
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

const OnBoardShell = styled(MainShell)`
  justify-content: space-between;
  overflow: clip;
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
`;
