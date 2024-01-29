/** @jsxImportSource @emotion/react */
import { Card } from "@/components/common/card";
import { MainShell } from "@/components/common/main-shell";
import EmblaCarousel from "@/components/ui/carousel";
import { H1, H4, P3 } from "@/components/ui/text";
import { getImagePath } from "@/libs/utils";
import { getStudentsFromClass } from "@/queries/student";
import { Student } from "@/types/student";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

import Cover from "@/assets/images/cover.png";
import ImageX from "@/components/ui/image";
import QRCode from "react-qr-code";

const memoryItems = [
  { title: "1반" as const, class: 1 },
  { title: "2반" as const, class: 2 },
  { title: "3반" as const, class: 3 },
  { title: "4반" as const, class: 4 },
  { title: "5반" as const, class: 5 },
  { title: "6반" as const, class: 6 },
  { title: "7반" as const, class: 7 },
  { title: "8반" as const, class: 8 },
  { title: "9반" as const, class: 9 },
  { title: "10반" as const, class: 10 },
  { title: "교무실" as const, class: 99 },
];
const MemoryList = () => {
  const [selected, setSelected] = useState(memoryItems[0]);
  const { data: students } = useQuery(getStudentsFromClass(selected.class));
  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: Number(0) }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);

  const handleReInit = useCallback((ev: EmblaCarouselType) => {
    ev.scrollTo(0);
  }, []);

  useEffect(() => {
    emblaApi?.on("reInit", handleReInit);
    return () => {
      emblaApi?.off("reInit", handleReInit);
    };
  }, []);
  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>기억명단</H1>
      </MemoryHeader>
      <MemoryContent>
        <MemoryContentArticle
          css={css`
            width: 37.24rem;
            justify-content: space-between;
          `}
        >
          <MemoryListNav
            css={css`
              column-gap: 0.96rem;
            `}
          >
            {memoryItems.map((item, index) => (
              <MemoryListButton
                css={css`
                  width: 8.3rem;
                `}
                onClick={() => {
                  setSelected(item);
                  emblaApi?.reInit(OPTIONS);
                }}
                selected={item.class === selected.class}
                key={item.title}
              >
                {item.title}
              </MemoryListButton>
            ))}
          </MemoryListNav>
          <LazyMotion features={domAnimation}>
            <AnimatePresence mode="wait">
              <m.div
                key={selected.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                `}
              >
                <H4>{selected.title}</H4>
                <MemoryClassDescription>
                  명단을 터치하시면 <strong>개인화면</strong>으로 이동합니다.
                </MemoryClassDescription>
                {students ? (
                  <EmblaCarousel
                    carouselType={[emblaRef, emblaApi]}
                    slides={students}
                    options={OPTIONS}
                    cssSlide={css`
                      flex: 1;
                      width: 100%;
                    `}
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
                ) : null}
              </m.div>
            </AnimatePresence>
          </LazyMotion>
        </MemoryContentArticle>
        <MemoryContentArticle
          css={css`
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            flex: 1;
          `}
        >
          <div
            css={css`
              flex: 1;
              height: 100%;
            `}
          >
            <ImageX src={Cover} />
          </div>
          <MoeryQRCode>
            <QRCode value="https://goe416.go.kr/?p=26&page=1&searchTxt=" />

            <P3
              css={css`
                font-weight: 500;
              `}
            >
              해당 QR을 통해
              <br />
              <strong>전체 방명록</strong>을
              <br />
              작성할 수 있습니다.
            </P3>
          </MoeryQRCode>
        </MemoryContentArticle>
      </MemoryContent>
    </MemoryShell>
  );
};

export default MemoryList;

const MoeryQRCode = styled.div`
  padding: 1.2rem 0.6rem;
  background-color: ${(props) => props.theme.color.background.secondary};
  color: ${(props) => props.theme.color.text.main};
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 0.8rem;
`;

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.6rem;
`;

const MemoryContent = styled.div`
  display: flex;
  column-gap: 1rem;
  flex: 1;
  width: 100%;
`;

const MemoryClassDescription = styled(P3)`
  color: ${(props) => props.theme.color.secondary.foreground};
  font-weight: 400;
  margin-bottom: 1.2rem;
  margin-top: 0.6rem;
`;

const MemoryContentArticle = styled.article`
  display: flex;
  flex-direction: column;
`;
const MemoryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;
`;
const MemoryListNav = styled.nav`
  display: flex;
  row-gap: 0.8rem;
  column-gap: 1.54rem;
  flex-wrap: wrap;
`;
const MemoryListButton = styled.button<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.12rem;
  font-weight: 800;
  width: 9.2rem;
  height: 2.6rem;
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border};
  border-width: 0.15rem;
  border-style: solid;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;
  border-color: ${(props) =>
    props.selected ? props.theme.color.yellow : "white"};
  color: ${(props) => (props.selected ? props.theme.color.yellow : "white")};
`;

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
      linkStyle={css`
        width: 10rem;
        height: 12rem;
      `}
      contentHeaderStyle={css`
        font-size: 1.12rem;
      `}
      classDescription={item.class_number}
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
