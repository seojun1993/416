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
import { getImagePath, numberWithinRange } from "../../libs/utils";
import { Prefetch } from "../../libs/plugins/prefetch";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";

const TWEEN_FACTOR = 4.2;

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
  const [searchParam, setSearchParam] = useSearchParams();

  const id = searchParam.get("centerIndex") ?? 0;
  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: Number(id) }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Autoplay({
      delay: 5000,
      playOnInit: true,
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
    <OnBoardShell>
      <Saver>
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
                  <m.div
                    style={{
                      scale: tweenValues[index],
                    }}
                    css={css`
                      flex: 0 0 33.3333%;
                      margin: 2em auto;
                    `}
                    key={item["416_id"]}
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
                  </m.div>
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
