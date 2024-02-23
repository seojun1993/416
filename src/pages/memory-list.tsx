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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import QRCode from "react-qr-code";
import { getAlbums } from "@/queries/album";

import { VirtualItem, useVirtualizer } from "@tanstack/react-virtual";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

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

  const visualizerRef = useRef<{
    moveScrollToIndex: (index: number, classNumber?: number) => void;
  }>(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS);
  const handleReInit = (ev: EmblaCarouselType) => {
    ev.scrollTo(0);
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("reInit", handleReInit);
      return () => {
        emblaApi.off("reInit", handleReInit);
      };
    }
  }, [emblaApi, selected.class]);
  useEffect(() => {
    return () => {
      emblaApi?.destroy();
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
                  visualizerRef.current?.moveScrollToIndex(0, item.class);
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
                    cssSlide={css`
                      flex: 1;
                      width: 90%;
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
          <AlbumVisualizer ref={visualizerRef} />
          <MemoryQRCode>
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
          </MemoryQRCode>
        </MemoryContentArticle>
      </MemoryContent>
    </MemoryShell>
  );
};

const AlbumVisualizer = forwardRef<{
  moveScrollToIndex: (index: number, classNumber?: number) => void;
}>(({}, ref) => {
  const queryClient = useQueryClient();
  const parentRef = useRef<HTMLDivElement>(null);
  const { data: albums } = useQuery(getAlbums());
  const [parentWidth, setParentWidth] = useState(0);

  const columnVirtualizer = useVirtualizer({
    horizontal: true,
    count: albums?.length ?? 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => parentWidth,
    overscan: 5,
  });

  const handleResize = useCallback(() => {
    if (!parentRef.current) return;
    setParentWidth(parentRef.current.clientWidth);
  }, []);

  const moveScrollToIndex = (index: number, classNumber?: number) => {
    if (columnVirtualizer) {
      const foundAlbumByClass =
        typeof classNumber === "number"
          ? albums?.findIndex(
              (album) => album.class === classNumber && album.order === 1
            )
          : index;
      columnVirtualizer.scrollToIndex(
        foundAlbumByClass ?? index,

        foundAlbumByClass
          ? {}
          : {
              behavior: "smooth",
            }
      );
      dispatchEvent(new CustomEvent("onPageChange"));
    }
  };
  useImperativeHandle(ref, () => ({
    moveScrollToIndex,
  }));

  useLayoutEffect(() => {
    handleResize();
    if (parentRef.current) {
      const ref = parentRef.current;
      ref.addEventListener("resize", handleResize);
      return () => {
        queryClient.removeQueries({ queryKey: getAlbums().queryKey });
        ref.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return (
    <div
      css={css`
        position: relative;
        flex: 1;
        height: 100%;
        margin-right: 2rem;
      `}
    >
      <div
        ref={parentRef}
        css={css`
          height: 100%;
          border-radius: 1rem;
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
          &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera*/
          }
          overflow: hidden;
        `}
      >
        <div
          css={css`
            width: ${columnVirtualizer.getTotalSize()}px;
            position: relative;
            display: flex;
            height: 100%;
          `}
        >
          {columnVirtualizer
            .getVirtualItems()
            .map(
              (album) =>
                albums?.[album.index] && (
                  <MemoryAlbum
                    key={album.key}
                    item={album}
                    parentWidth={parentWidth}
                    src={getImagePath(albums[album.index].url)}
                  />
                )
            )}
        </div>
      </div>
      <LeftButton
        onClick={() => {
          if (columnVirtualizer.range?.endIndex) {
            moveScrollToIndex(columnVirtualizer.range.endIndex - 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54.482"
          height="96.969"
          viewBox="0 0 54.482 96.969"
        >
          <path
            id="prev_icon"
            d="M-20078.957-17310.031l-40,40,40,40"
            transform="translate(20124.955 17318.516)"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="12"
          />
        </svg>
      </LeftButton>
      <RightButton
        onClick={() => {
          if (
            columnVirtualizer.range &&
            albums &&
            columnVirtualizer.range?.endIndex < albums?.length
          ) {
            moveScrollToIndex(columnVirtualizer.range.endIndex + 1);
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="54.486"
          height="96.969"
          viewBox="0 0 54.486 96.969"
        >
          <path
            id="naxt_icon"
            d="M-20118.957-17310.031l40,40-40,40"
            transform="translate(20127.441 17318.516)"
            fill="none"
            stroke="currentcolor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="12"
          />
        </svg>
      </RightButton>
    </div>
  );
});

export default MemoryList;

const MemoryAlbum = memo(
  ({
    item,
    src,
    parentWidth,
  }: {
    item: VirtualItem;
    src: string;
    parentWidth: number;
  }) => {
    const panRef = useRef<ReactZoomPanPinchContentRef>(null);
    const handlePageChange = () => {
      panRef.current?.resetTransform();
    };

    useEffect(() => {
      window.addEventListener("onPageChange", handlePageChange);

      return () => {
        window.removeEventListener("onPageChange", handlePageChange);
      };
    }, []);
    return (
      <div
        key={item.key}
        style={{
          transform: `translateX(${item.start}px)`,
        }}
        css={css`
          width: ${parentWidth}px;
          scroll-snap-align: start;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
        `}
      >
        <TransformWrapper ref={panRef}>
          <TransformComponent contentStyle={{ width: "100%" }}>
            <img
              css={css`
                width: 100%;
                height: 100%;
              `}
              src={src}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
    );
  }
);

const LeftButton = styled.button`
  position: absolute;
  left: calc(0% - 2rem);
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;
const RightButton = styled.button`
  position: absolute;
  right: calc(0% - 2rem);
  top: 50%;
  transform: translateY(-50%);
  border-radius: 9999rem;
  width: 4rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: white;
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
`;
const MemoryQRCode = styled.div`
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
  column-gap: 2rem;
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
