/** @jsxImportSource @emotion/react */
import EmblaCarousel from "@/components/ui/carousel";

import { getImagePath } from "@/libs/utils";
import { getStudentsFromSearchQuery } from "@/queries/student";
import { Student } from "@/types/student";
import { useQuery } from "@tanstack/react-query";
import { EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { LazyMotion, domAnimation } from "framer-motion";
import { useMemo } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import { H1, P1 } from "@/components/ui/text";
import { Card } from "@/components/common/card";
import { css } from "@emotion/react";
import { useA11y } from "@/hooks/use-a11y";

const MAX_ITEM_COUNT = 3;

const SearchResult = () => {
  const [searchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  if (!keyword) {
    redirect("/search");
    return <></>;
  }
  const { data: students } = useQuery(getStudentsFromSearchQuery(keyword));
  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: Number(0) }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const SlideCardAspect = useMemo(
    () => Math.min(MAX_ITEM_COUNT, students?.length ?? 0),
    [students]
  );

  useA11y("search_screen_result");

  return (
    <SearchShell>
      <H1>
        <AccentText>'{keyword}'</AccentText>에 대한 검색결과
      </H1>
      <FoundStudentCountBadge>
        총 {students?.length ?? 0}건
      </FoundStudentCountBadge>
      {students ? (
        <LazyMotion features={domAnimation}>
          <EmblaCarousel
            cssSlide={css`
              width: calc((18rem + 1.6rem) * ${SlideCardAspect});
            `}
            showArrow={SlideCardAspect >= MAX_ITEM_COUNT}
            aspect={1 / SlideCardAspect}
            carouselType={[emblaRef, emblaApi]}
            slides={students}
            options={{
              animate: students.length > 2 || (students.length ?? 0) % 2 !== 0,
            }}
          >
            {(item, index) => {
              return (
                <OnBoardItem
                  key={item.id}
                  item={item}
                  index={index}
                  onFirstClick={() => {
                    emblaApi?.scrollTo(index);
                  }}
                  onDoubleClick={() => {
                    // sessionStorage.setItem("redirect_id", id + "");
                  }}
                />
              );
            }}
          </EmblaCarousel>
        </LazyMotion>
      ) : null}
    </SearchShell>
  );
};

export default SearchResult;

function OnBoardItem({
  item,
  onFirstClick,
  onDoubleClick,
  onBlur,
}: {
  item: Student;
  index: number;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}) {
  return (
    <Card
      a11y={item.voicekey}
      // badge={item.title_keyword}
      classDescription={item.class_number_name}
      onFirstClick={onFirstClick}
      onDoubleClick={onDoubleClick}
      onBlur={onBlur}
      href={`/board?id=${item["416_id"]}`}
      image={getImagePath(item.caricature)}
      birth={item.birthday}
      title={item.name}
    />
  );
}

const AccentText = styled.strong`
  color: ${(props) => props.theme.color.accent.foreground};
`;

const FoundStudentCountBadge = styled(P1)`
  color: ${(props) => props.theme.color.badge.text};
  background-color: ${(props) => props.theme.color.switch.enable};
  color: ${(props) => props.theme.color.secondary.foreground};
  margin: 1rem 0 1.4rem 0;
  width: 6rem;
  height: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999rem;
`;

const SearchShell = styled(MainShell)`
  flex: 1;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
`;
