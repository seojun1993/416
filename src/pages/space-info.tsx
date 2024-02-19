/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import { H1, P3 } from "@/components/ui/text";
import { getKioskContents, getKioskRoute } from "@/queries/kiosk-route";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { useElementSize } from "@/hooks/use-element-size";
import { fadeInOutVariants } from "@/variants";
import { curryingDijkstra } from "@/libs/way-finder/finder";
import { NodeType, Vector } from "@/libs/way-finder/Vector";
import { ClassInfo, PubInfo } from "@/types/kiosk-route";

const memoryItems = [
  { title: "지하 1층(주차장)" as const },
  { title: "1층" as const },
  { title: "2층" as const },
  { title: "3층" as const },
  { title: "4층 (하늘정원)" as const },
];

const SpaceInfo = () => {
  const [selectedMapIdx, setSelectedMapIdx] = useState(1);
  const [selectedPubCode, setSelectedPubCode] = useState("");
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(boxRef.current);
  const pinchRef = useRef<ReactZoomPanPinchContentRef>(null);

  const [{ data: nodesData }, { data: contentsData }] = useQueries({
    queries: [getKioskRoute, getKioskContents("K001")],
  });
  const parsedData = useMemo(() => {
    if (!nodesData || !contentsData) return;

    if (contentsData.HEADER.KIOSK_FLOOR) {
      // contentsData.HEADER.KIOSK_FLOOR.floor => '1F' | '2F' 와 같은 문자열

      const { pos_x: x, pos_y: y } = contentsData.HEADER.KIOSK_FLOOR;
      const kioskNode = nodesData.graph.get(
        Vector.getVectorId({ floor: 2, x, y })
      );
      if (kioskNode) {
        // kioskNode.setType(NodeType.KIOSK);
        nodesData.graph.set(Vector.getVectorId({ floor: 2, x, y }), kioskNode);

        return {
          nodes: nodesData,
          contents: contentsData,
          kioskNode,
          graph: nodesData.graph,
        };
      }
    }
  }, [nodesData, contentsData]);
  const { nodes, contents, graph, kioskNode } = parsedData ?? {};

  const findWay = useMemo(() => {
    if (!kioskNode || !graph) return () => {};
    return curryingDijkstra(kioskNode, graph);
  }, [nodesData, contentsData, graph]);

  const currentPubList = useMemo(() => {
    if (!contents || !nodes) return;
    const floor = contents.MAP_LIST[selectedMapIdx].MAP_INFO.floor;
    const pubList = new Set<string>([]);
    nodes.PUB_LIST.PUB_INFO.forEach((pub) => {
      if (pub.floor === floor) {
        pubList.add(pub.PUB_CODE);
      }
    });
    return [...pubList].map((pubCode) => {
      return contents.PUB_INFO_LIST.find(
        (item) => item.PUB_INFO.PUB_CODE === pubCode
      )!;
    });
  }, [contents, nodes, selectedMapIdx]);

  const findNodes = useMemo(() => {
    const destination = graph?.get("3_805_774");
    if (destination) {
      return findWay(destination);
    }
  }, [findWay]);

  const classMap = useMemo(() => {
    const classList = new Map<number, ClassInfo[]>();
    nodes?.CLASS_LIST.CLASS_INFO.forEach((item) => {
      classList.set(item.floor, [...(classList.get(item.floor) ?? []), item]);
    });

    return classList;
  }, [nodes]);

  const onBlurClick = () => {
    setSelectedPubCode("");
  };
  useLayoutEffect(() => {
    window.addEventListener("click", onBlurClick);
    return () => {
      window.removeEventListener("click", onBlurClick);
    };
  }, []);

  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>공간안내</H1>
      </MemoryHeader>

      <div
        css={css`
          display: flex;
          margin-bottom: 0.8rem;
          column-gap: 0.82rem;
          width: 100%;
        `}
      >
        {memoryItems.map((item, idx) => (
          <MemoryListButton
            key={item.title}
            selected={idx === selectedMapIdx}
            onClick={() => {
              pinchRef.current?.resetTransform(500, "easeOutCubic");
              setSelectedMapIdx(idx);
            }}
          >
            {item.title}
          </MemoryListButton>
        ))}
      </div>
      <MemoryMapBox
        ref={boxRef}
        css={css`
          width: 100%;
          flex-grow: 1;
          overflow: hidden;
        `}
      >
        <TransformWrapper ref={pinchRef}>
          <TransformComponent>
            <div
              css={css`
                position: absolute;
                z-index: 5;
                width: 100%;
                height: 100%;
                left: 50%;
                top: 50%;
              `}
            >
              {contents?.MAP_LIST?.map(({ MAP_INFO }, idx) => {
                const urls = MAP_INFO.MAIN_MAP_URL.split("/");
                const url = `http://192.168.0.143:8416/zcommonfiles/floor/${
                  urls[urls.length - 1]
                }`;

                const currentPubList = nodes?.pubList[MAP_INFO.floor].map(
                  (pub) => ({
                    ...pub,
                    icon: `${import.meta.env.VITE_MAP_SERVER_URL}${
                      contents.PUB_INFO_LIST.find(
                        (p) => p.PUB_INFO.PUB_CODE === pub.PUB_CODE
                      )?.PUB_INFO.PUB_URL
                    }`,
                  })
                );
                return (
                  <MapItem
                    key={MAP_INFO.MAP_NAME}
                    pubList={currentPubList}
                    classList={classMap.get(MAP_INFO.floor)}
                    name={MAP_INFO.MAP_NAME}
                    floor={MAP_INFO.floor}
                    selectedPubCode={selectedPubCode}
                    width={contents?.HEADER.MAP_RESOLUTION.width ?? 0}
                    height={contents?.HEADER.MAP_RESOLUTION.height ?? 0}
                    url={url}
                    index={idx}
                    boxSize={{
                      width: size?.width ?? 0,
                      height: size?.height ?? 0,
                    }}
                    selectedIndex={selectedMapIdx}
                    path={findNodes?.path}
                  />
                );
              })}
            </div>
          </TransformComponent>
        </TransformWrapper>
        <AnimatePresence mode="popLayout">
          <MapPubList
            key={selectedMapIdx}
            variants={{
              ...fadeInOutVariants,
              animate: {
                ...fadeInOutVariants.animate,
                transition: {
                  staggerChildren: 0.08,
                },
              },
              exit: {
                ...fadeInOutVariants.exit,
              },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {currentPubList?.map(({ PUB_INFO }) => (
              <MapPubButton
                key={selectedMapIdx + PUB_INFO.PUB_CODE}
                variants={fadeInOutVariants}
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedPubCode(PUB_INFO.PUB_CODE);
                }}
              >
                <img
                  css={css`
                    height: 100%;
                    border-radius: 9999rem;
                    aspect-ratio: 1/1;
                  `}
                  src={`${import.meta.env.VITE_MAP_SERVER_URL}${
                    PUB_INFO.PUB_URL
                  }`}
                />
                <P3
                  css={css`
                    color: white;
                  `}
                >
                  {PUB_INFO.PUB_NAME}
                </P3>
              </MapPubButton>
            ))}
          </MapPubList>
        </AnimatePresence>
      </MemoryMapBox>
    </MemoryShell>
  );
};

export default SpaceInfo;

function MapItem({
  index,
  selectedIndex,
  boxSize,
  floor,
  height,
  url,
  width,
  path,
  pubList,
  classList,
  selectedPubCode,
}: {
  width: number;
  height: number;
  floor: number;
  boxSize: {
    width: number;
    height: number;
  };
  url: string;
  name: string;
  index: number;
  selectedIndex: number;
  path?: Vector[];
  selectedPubCode?: string;
  classList?: ClassInfo[];
  pubList?: (PubInfo & { icon?: string })[];
}) {
  const [scope, animate] = useAnimate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialMount = useRef(false);

  const direction =
    index - selectedIndex > 0
      ? "BOTTOM"
      : index === selectedIndex
      ? "ACTIVE"
      : "TOP";
  const defaultStyle = {
    scaleX: boxSize.width / width,
    scaleY: boxSize.height / height,
    width: `${width}px`,
    height: `${height}px`,
    left: `${-(width / 2)}px`,
    top: `${-(height / 2)}px`,
  };

  const defaultTransition = {
    damping: 150,
  };
  useLayoutEffect(() => {
    if (initialMount.current) {
      switch (direction) {
        case "ACTIVE":
          animate(
            scope.current,
            { opacity: 1, y: 0, ...defaultStyle },
            defaultTransition
          );
          break;
        case "BOTTOM":
          animate(
            scope.current,
            { y: -height, opacity: 0, ...defaultStyle },
            defaultTransition
          );
          break;
        case "TOP":
          animate(
            scope.current,
            { y: height, opacity: 0, ...defaultStyle },
            defaultTransition
          );
          break;
      }
    }

    initialMount.current = true;
  }, [selectedIndex, index, boxSize]);

  useEffect(() => {
    if (canvasRef.current && path) {
      const currentPath = path.filter((p) => p.getFloor() === floor);
      if (!currentPath.length) return;
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        const dpr = window.devicePixelRatio > 1 ? 2 : 1;

        const canvasWidth = width;
        const canvasHeight = height;
        canvasRef.current.width = canvasWidth * dpr;
        canvasRef.current.height = canvasHeight * dpr;

        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, width, height);
        ctx.beginPath();
        ctx.moveTo(
          currentPath[0].getPosition().x,
          currentPath[0].getPosition().y + 10
        );

        currentPath.slice(1).forEach((node, index) => {
          if (index === currentPath.length - 1) return;
          const nextPosition = currentPath[index + 1].getPosition();
          ctx.lineTo(nextPosition.x, nextPosition.y + 10);
        });
        ctx.lineWidth = 20;
        ctx.strokeStyle = "#FB950A";
        ctx.stroke();
      }
    }
  }, []);
  return (
    <motion.div
      ref={scope}
      initial={
        direction === "ACTIVE"
          ? { y: 0, ...defaultStyle }
          : direction === "BOTTOM"
          ? { y: -height, opacity: 0, ...defaultStyle }
          : { y: height, opacity: 0, ...defaultStyle }
      }
      animate={direction === "ACTIVE" ? { opacity: 1 } : {}}
      transition={defaultTransition}
      css={css`
        width: ${width}px;
        height: ${height}px;
        left: -${width / 2}px;
        top: -${height / 2}px;
        position: absolute;
        pointer-events: none;
      `}
    >
      <div
        css={css`
          position: absolute;
          z-index: 1;
          transform: translate(0px, 0px) scale(1, 1) rotate(0deg);
          width: ${width}px;
          height: ${height}px;
        `}
      >
        <img
          src={url}
          loading="eager"
          css={css`
            width: 100%;
            height: 100%;
            object-fit: contain;
          `}
        />

        {pubList?.map((pub) => (
          <motion.img
            css={css`
              position: absolute;
              top: ${pub.PUB_FLOOR.pos_y + 35}px;
              left: ${pub.PUB_FLOOR.pos_x - 41.5}px;
              width: 60px;
              height: 60px;
            `}
            initial={{ scale: 1 }}
            animate={
              selectedPubCode === pub.PUB_CODE
                ? {
                    scale: 1.5,
                    transition: {
                      repeat: Infinity,
                      repeatType: "mirror",
                      duration: 0.4,
                    },
                  }
                : {}
            }
            src={pub.icon}
            key={pub.PUB_ID}
          />
        ))}
        {classList?.map((cls) => (
          <div
            css={css`
              position: absolute;
              top: ${cls.CLASS_FLOOR.pos_y}px;
              left: ${cls.CLASS_FLOOR.pos_x}px;
              font-size: calc(${cls.FONT_SIZE}px);
              line-height: ${cls.LINE_HEIGHT}px;
              color: ${cls.FONT_COLOR};
            `}
            key={cls.CLASS_NAME}
          >
            {cls.CLASS_NAME}
          </div>
        ))}
      </div>
      <canvas
        ref={canvasRef}
        css={css`
          position: absolute;
          top: 6%;
          width: 100%;
          height: 89%;
        `}
      />
    </motion.div>
  );
}

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-left: 7.6rem;
  padding-right: 7.6rem;
  padding-bottom: 1.6rem;
`;

const MemoryHeader = styled.div`
  text-align: center;
  margin-bottom: 1.6rem;
`;
const MemoryListButton = styled.button<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.12rem;
  font-weight: 800;
  width: 100%;
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

const MemoryMapBox = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.background.card2};
  text-decoration: none;
  border-radius: 0.8rem;
`;

const MapPubList = styled(motion.div)`
  height: 3rem;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  border-top: 0.08rem solid
    ${(props) => (props.theme.themeMode === "light" ? "white" : "#666666")};

  > button + button {
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 0.08rem;
      height: 75%;
      background-color: ${(props) =>
        props.theme.themeMode === "light" ? "white" : "#666666"};
    }
  }
`;
const MapPubButton = styled(motion.button)`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  padding: 0 1.2rem;
  column-gap: 0.4rem;
  border-radius: 9999rem;
`;