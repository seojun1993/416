/** @jsxImportSource @emotion/react */
import EmblaCarousel from "@/components/ui/carousel";

import { getImagePath, numberWithinRange } from "@/libs/utils";
import { getStudentsFromSearchQuery } from "@/queries/student";
import { Student } from "@/types/student";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import OnboardCompoents from "@/components/pages/onboard";
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import { H1, P1, P3 } from "@/components/ui/text";
import { Theme } from "@/contexts/setting.store";
const TWEEN_FACTOR = 2.5;

const SearchResult = () => {
  const [searchParam] = useSearchParams();
  const keyword = searchParam.get("keyword");
  if (!keyword) {
    redirect("/search");
    return <></>;
  }
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const { data: students } = useQuery(getStudentsFromSearchQuery(keyword));
  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: Number(0) }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  // const studentOnCenter = useMemo(() => {
  //   return id !== null && students?.[Number(id)];
  // }, [id, students]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      const tweenValue = 1 - Math.abs(diffToTarget * TWEEN_FACTOR);
      return numberWithinRange(tweenValue, 0, 1);
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;

    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);

    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);
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
            carouselType={[emblaRef, emblaApi]}
            slides={students}
            options={OPTIONS}
          >
            {(item, index) => {
              return (
                <OnBoardItem
                  key={item.id}
                  scale={tweenValues[index]}
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
  scale: initialScale,
  onFirstClick,
  onDoubleClick,
  onBlur,
}: {
  item: Student;
  index: number;
  scale: number;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}) {
  return (
    <m.div
      css={css`
        flex: 0 0 33.3333%;
        margin: 1em auto;
      `}
      key={item["416_id"]}
    >
      <OnboardCompoents.Card
        scale={initialScale}
        badge={item.title_keyword}
        classDescription={item.class_number}
        onFirstClick={onFirstClick}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
        href={`/board?id=${item["416_id"]}`}
        image={getImagePath(item.caricature)}
        birth={item.birthday}
        title={item.name}
      />
    </m.div>
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
