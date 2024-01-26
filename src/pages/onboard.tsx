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
import { getImagePath, numberWithinRange } from "../libs/utils";
import { Prefetch } from "../libs/plugins/prefetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { Student } from "@/types/student";
import { H4 } from "@/components/ui/text";

const TWEEN_FACTOR = 2.5;

const OnBoard = () => {
  const { data: students } = useQuery(
    getStudentsQuery({
      select(data) {
        return data.filter(
          (student) =>
            new Date(student.birthday).getMonth() === new Date().getMonth()
        );
      },
    })
  );
  const [tweenValues, setTweenValues] = useState<number[]>([]);

  const [id, setId] = useState(() => {
    const id = sessionStorage.getItem("redirect_id");

    return Number(id) ?? 0;
  });

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: id }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
      playOnInit: true,
      stopOnFocusIn: false,
      stopOnInteraction: false,
      stopOnLastSnap: false,
    }),
    Prefetch({
      onSelect(selectedIndex) {
        setId(selectedIndex);
      },
    }),
  ]);

  const studentOnCenter = useMemo(() => {
    return id !== null && students?.[Number(id)];
  }, [id, students]);

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

  useEffect(() => {
    if (emblaApi && id) {
      emblaApi.scrollTo(Number(id));
    }
  }, [id]);
  return (
    <OnBoardShell>
      <Saver>
        <OnBoardMonth>
          <H4>{new Date().getMonth() + 1}월 생일자</H4>
        </OnBoardMonth>
        {studentOnCenter ? (
          <OnboardCompoents.OnBoardTitle title={studentOnCenter.name} />
        ) : null}
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
                      sessionStorage.setItem("redirect_id", id + "");
                    }}
                  />
                );
              }}
            </EmblaCarousel>
          </LazyMotion>
        ) : null}
      </Saver>
    </OnBoardShell>
  );
};

export default OnBoard;

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
        href={`board?id=${item["416_id"]}`}
        image={getImagePath(item.caricature)}
        birth={item.birthday}
        title={item.name}
      />
    </m.div>
  );
}

const OnBoardMonth = styled.div`
  border-color: ${(props) => props.theme.color.accent.foreground};
  border-width: 0.17em;
  border-radius: 9999rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.95em;
  height: 3.2em;
  border-style: solid;
  margin-bottom: 0.6em;
  background-color: ${(props) => props.theme.color.background.card};
`;
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
