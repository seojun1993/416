/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import OnboardCompoents from "@/components/pages/onboard";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { getImagePath, sendA11yEvent } from "../libs/utils";
import { Prefetch } from "../libs/plugins/prefetch";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";
import { Student } from "@/types/student";
import { H4 } from "@/components/ui/text";
import { Card } from "@/components/common/card";
import { css } from "@emotion/react";
import { useSettingStore } from "@/contexts/setting.store";
import { useA11y } from "@/hooks/use-a11y";
import PreloadVideo from "@/components/ui/preload-video";

const Birthday = () => {
  const { data: students } = useSuspenseQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );

  const signActive = useSettingStore((state) => state.signActivate);
  const [id, setId] = useState(() => {
    const id = sessionStorage.getItem("redirect_id");
    if (id) {
      sessionStorage.removeItem("redirect_id");
    }
    return Number(id) ?? 0;
  });

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: id }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Prefetch({
      onSelect(selectedIndex) {
        setId(selectedIndex);
        const target = students?.[selectedIndex];
        if (target) {
          sendA11yEvent(target.voicekey);
        }
      },
    }),
  ]);

  const studentOnCenter = useMemo(() => {
    const target = students?.[Number(id)];

    return id !== null && target;
  }, [id, students]);

  useEffect(() => {
    if (emblaApi && id) {
      emblaApi.scrollTo(Number(id));
    }
  }, [id]);

  useA11y("birthday");

  return (
    <OnBoardShell>
      <LazyMotion features={domAnimation}>
        <Saver>
          <OnBoardMonth>
            <H4>{new Date().getMonth() + 1}월 생일자</H4>
          </OnBoardMonth>
          {studentOnCenter ? (
            <OnboardCompoents.OnBoardTitle title={studentOnCenter.name} />
          ) : null}
          {students ? (
            <EmblaCarousel
              cssSlide={css`
                width: 60dvw;
                display: flex;
                align-items: center;
              `}
              carouselType={[emblaRef, emblaApi]}
              slides={students}
              options={{
                button: {
                  leftStyle: css`
                    left: -1rem;
                  `,
                  rightStyle: css`
                    right: -1rem;
                  `,
                },
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
                      sessionStorage.setItem("redirect_id", id + "");
                    }}
                  />
                );
              }}
            </EmblaCarousel>
          ) : null}
        </Saver>
        <AnimatePresence mode="wait">
          <div
            css={css`
              width: 36rem;
              display: flex;
            `}
          >
            <PreloadVideo
              key="video"
              src={"/videos/birthday.webm"}
              autoPlay
              muted
            ></PreloadVideo>
          </div>
        </AnimatePresence>
      </LazyMotion>
    </OnBoardShell>
  );
};

interface BirthProps {
  students?: Student[];
}

export default Birthday;

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
      badge={item.title_keyword}
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

const OnBoardBirthdayCard = styled.div`
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border},
    inset 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.inner};
  border: 0.15rem solid white;
  text-decoration: none;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.8rem;
  /* > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.64rem;
    color: white;
    p {
      font-size: calc(var(--font-size) * 1.4);
    }
  } */
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
  flex: 1 1 100%;
`;
