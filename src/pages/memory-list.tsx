/** @jsxImportSource @emotion/react */
import { Card } from "@/components/common/card";
import { MainShell } from "@/components/common/main-shell";
import EmblaCarousel from "@/components/ui/carousel";
import { H1, H4, H5, P2, P3 } from "@/components/ui/text";
import { getImagePath, sendA11yEvent } from "@/libs/utils";
import { getStudentsFromClass } from "@/queries/student";
import { Student } from "@/types/student";
import { SerializedStyles, css } from "@emotion/react";
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
import { useA11y } from "@/hooks/use-a11y";
import { Prefetch } from "@/libs/plugins/prefetch";
import { Link } from "react-router-dom";
import ImageX from "@/components/ui/image";
import { useCheckClick } from "@/hooks/use-check-click";

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

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Prefetch({
      onSelect(selectedIndex) {
        const target = students?.[selectedIndex];
        if (target) {
          sendA11yEvent(target.voicekey);
        }
      },
    }),
  ]);
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

  useA11y("memory_list");
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
                  padding-top: 1rem;
                `}
              >
                <H4>{selected.title}</H4>
                <MemoryClassDescription>
                  명단을 터치하시면 <strong>개인화면</strong>으로 이동합니다.
                </MemoryClassDescription>
                {students ? (
                  <div
                    css={css`
                      width: 100%;
                    `}
                  >
                    <EmblaCarousel
                      carouselType={[emblaRef, emblaApi]}
                      slides={students}
                      cssSlide={css`
                        flex: 1;
                        width: 90%;
                        margin: 0 auto;
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
                  </div>
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
          <MemoryQRCode data-disable-focus-effect="true" data-a11y-id="QR_ALL">
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
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
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
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
          column-gap: 1rem;
        `}
      >
        <LeftButton
          data-disable-focus-effect="true"
          data-a11y-id="이전"
          onClick={() => {
            if (columnVirtualizer.range?.endIndex) {
              moveScrollToIndex(columnVirtualizer.range.endIndex - 1);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36.07"
            height="64.141"
            viewBox="0 0 36.07 64.141"
          >
            <path
              id="naxt_icon"
              d="M-20094.957-17310.031l-24,25,24,25"
              transform="translate(20123.957 17317.102)"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="10"
            />
          </svg>

          <P3 css={css``}>이전</P3>
        </LeftButton>
        <H4>
          <b>{(columnVirtualizer.range?.startIndex ?? 0) + 1}</b>&nbsp; /&nbsp;
          {albums?.length ?? 0}
        </H4>
        <RightButton
          data-disable-focus-effect="true"
          data-a11y-id="다음"
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
            width="36.07"
            height="64.141"
            viewBox="0 0 36.07 64.141"
          >
            <path
              id="naxt_icon"
              d="M-20118.957-17310.031l24,25-24,25"
              transform="translate(20126.027 17317.102)"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="10"
            />
          </svg>

          <P3 css={css``}>다음</P3>
        </RightButton>
      </div>
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
      <button
        key={item.key}
        data-disable-focus-effect="true"
        data-a11y-id="graduation_IMG"
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
        <TransformWrapper ref={panRef} maxScale={2}>
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
      </button>
    );
  }
);

const LeftButton = styled.button`
  border-radius: 0.4rem;
  width: 5.2rem;
  height: 2.6rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  column-gap: 0.3rem;
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;
const RightButton = styled.button`
  border-radius: 0.4rem;
  width: 5.2rem;
  height: 2.6rem;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  border: none;
  column-gap: 0.3rem;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;

const MemoryQRCode = styled.button`
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
  color: white;
  font-weight: 400;
  margin-top: 0.6rem;
  strong {
    color: ${(props) =>
      props.theme.themeMode === "light" ? "white" : props.theme.color.yellow};
  }
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
  font-size: calc(var(--font-size) * 1.12);
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
    <SmallCard
      a11y={item.voicekey}
      linkStyle={css`
        width: 10rem;
        height: 12rem;
      `}
      // contentHeaderStyle={css`
      //   font-size: 1.12rem;
      // `}
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

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  classDescription: string;
  badge?: string;
  href?: string;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
  linkStyle?: SerializedStyles;
  contentHeaderStyle?: SerializedStyles;
  a11y?: string;
}
export const SmallCard = memo(
  ({
    birth,
    image,
    badge,
    classDescription,
    a11y,
    title,
    href,
    linkStyle,
    contentHeaderStyle,
    onBlur,
    onFirstClick,
    onDoubleClick,
  }: CardProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const getBirthText = useCallback((birth: Date) => {
      const month = birth.getMonth() + 1;
      const date = birth.getDate();
      return `${(month + "").padStart(2, "0")}.${(date + "").padStart(2, "0")}`;
      // return `${(month + "").padStart(2, "0")}월 ${(date + "").padStart(
      //   2,
      //   "0"
      // )}일`;
    }, []);
    const birthText = getBirthText(
      birth instanceof Date ? birth : new Date(birth)
    );
    useCheckClick({
      ref,
      onFirstClick,
      onDoubleClick,
      onBlur,
    });

    return (
      <CardLink
        data-a11y-id={a11y}
        to={window.location.href}
        ref={ref}
        css={css`
          aspect-ratio: 25/32;
          ${linkStyle && linkStyle}
        `}
      >
        <CardAvatar src={image}>
          {badge && <CardBadge>{badge}</CardBadge>}
        </CardAvatar>
        <CardContent>
          <CardClassNumber>
            <P3>{classDescription}</P3>
          </CardClassNumber>
          <CardContentHeader contentHeaderStyle={contentHeaderStyle}>
            <span>{title}</span>
            <span>{birthText}</span>
          </CardContentHeader>
        </CardContent>
      </CardLink>
    );
  }
);

const CardClassNumber = styled.div`
  padding: 0.3rem 0;
  background-color: ${(props) => props.theme.color.card.class};
`;

const CardLink = styled(Link)`
  width: 9.2rem;
  height: 100%;
  outline: 1px solid #eeeeee;
  border-radius: 0.7em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.background.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  column-gap: 0.8rem;
  text-decoration: none;
  margin: 0 auto;
  color: ${(props) => props.theme.color.text.main};

  & > div + div {
    border-top: 0.13dvw solid #999999;
  }
`;

const CardBadge = styled(P2)`
  white-space: nowrap;
  position: absolute;
  top: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 2rem;
  border-radius: 9999rem;
  border: 0.16rem solid ${(props) => props.theme.color.badge.border};
  background-color: ${(props) => props.theme.color.badge.background};
  color: ${(props) => props.theme.color.badge.text};
`;

const CardAvatar = styled(ImageX)`
  background-color: #fff;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  height: 30%;
`;

const CardContentHeader = styled(H5)<{ contentHeaderStyle?: SerializedStyles }>`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  padding-bottom: 0.5rem;
  margin-top: 0.2rem;
  color: ${(props) => props.theme.color.text.main};
  ${(props) => props.contentHeaderStyle && props.contentHeaderStyle}
  > span:first-of-type {
    display: inline-flex;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 0.14em;
      flex: 1;
      background-color: ${(props) => props.theme.color.accent.foreground};

      border-radius: 1rem;
      margin: 0.2rem 0.5rem;
    }
  }
`;
