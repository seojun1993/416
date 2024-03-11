/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import { H1, P3 } from "@/components/ui/text";
import { getKioskContents, getKioskRoute } from "@/queries/kiosk-route";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useSuspenseQueries } from "@tanstack/react-query";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { fadeInOutVariants } from "@/variants";
import { curryingDijkstra } from "@/libs/way-finder/finder";
import { NodeType, Vector } from "@/libs/way-finder/Vector";
import { ClassInfo, PubInfo } from "@/types/kiosk-route";
import { useA11y } from "@/hooks/use-a11y";
import { sendA11yEvent } from "@/libs/utils";
import { useSettingStore } from "@/contexts/setting.store";

const memoryItems = [
  { title: "지하 1층(주차장)" as const },
  { title: "1층" as const },
  { title: "2층" as const },
  { title: "3층" as const },
  { title: "4층 (하늘정원)" as const },
];

const activeMapContext = createContext<{
  activeList: number[];
  destination: Vector | null;
  animationState: boolean;
  mapIndex: number;
  pathList: Vector[];
}>({
  activeList: [],
  destination: null,
  animationState: false,
  mapIndex: 1,
  pathList: [],
});

const SpaceInfo = () => {
  const kioskCode = useSettingStore((state) => state.kioskCode);
  const [selectedMapIdx, setSelectedMapIdx] = useState(1);
  const [selectedPubCode, setSelectedPubCode] = useState("");
  const [foundPath, setFoundPath] = useState<Vector[]>([]);
  const [animationState, setAnimationState] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const pinchRef = useRef<ReactZoomPanPinchContentRef>(null);
  const [{ data: nodesData }, { data: contentsData }] = useSuspenseQueries({
    queries: [getKioskRoute, getKioskContents(kioskCode)],
  });

  const parsedData = useMemo(() => {
    if (!nodesData || !contentsData || !contentsData.KIOSK_INFO) return;

    const {
      floor,
      KIOSK_POS: { pos_x: x, pos_y: y },
    } = contentsData.KIOSK_INFO;
    const kioskNode = nodesData.graph.get(Vector.getVectorId({ floor, x, y }));
    if (kioskNode) {
      kioskNode.setType(NodeType.KIOSK);
      nodesData.graph.set(Vector.getVectorId({ floor, x, y }), kioskNode);

      return {
        nodes: nodesData,
        contents: contentsData,
        kioskNode,
        graph: nodesData.graph,
      };
    }
  }, [nodesData, contentsData]);

  const { nodes, contents, graph, kioskNode } = parsedData ?? {};
  const findWay = useMemo(() => {
    if (!kioskNode || !graph) return () => {};
    return curryingDijkstra(kioskNode, graph);
  }, [nodesData, contentsData, graph]);

  const currentPubList = useMemo(() => {
    if (!contents || !nodes) return;
    const floor = contents.MAP_LIST[selectedMapIdx - 1].MAP_INFO.floor;
    const pubList = new Set<string>([]);
    nodes.PUB_LIST.PUB_INFO.forEach((pub) => {
      pubList.add(pub.PUB_CODE);
    });
    return [...pubList].map((pubCode) => {
      return contents.PUB_INFO_LIST.find(
        (item) => item.PUB_INFO.PUB_CODE === pubCode
      )!;
    });
  }, [contents, nodes, selectedMapIdx]);
  console.log(currentPubList, "currentPubList");
  const wayfind = useCallback(
    (id: string, className: string) => {
      if (!parsedData) return;
      const vector = graph?.get(id);
      if (vector) {
        const found = findWay(vector);
        if (found) {
          setFoundPath(found.path);
          setSelectedMapIdx(parsedData.kioskNode.getFloor());
          setAnimationState(true);
          sendA11yEvent(`${kioskCode}_${className}`);
          pinchRef.current?.resetTransform(500, "easeOutCubic");
        }
      }
    },
    [findWay, graph, parsedData]
  );

  const classMap = useMemo(() => {
    const classList = new Map<number, ClassInfo[]>();
    nodes?.CLASS_LIST.CLASS_INFO.forEach((item) => {
      classList.set(item.floor, [...(classList.get(item.floor) ?? []), item]);
    });

    return classList;
  }, [nodes]);

  const destination = useMemo(
    () => (foundPath ? foundPath[foundPath.length - 1] : null),
    [foundPath]
  );

  const onAnimationEnd = (floor: number) => {
    if (
      animationState &&
      destination !== null &&
      floor !== destination.getFloor()
    ) {
      setSelectedMapIdx(destination.getFloor());
    }
  };

  const activeFloorList = useMemo(() => {
    const activeList = new Set(
      foundPath?.map((path) => path.getFloor()).filter((item) => item)
    );
    return [...activeList];
  }, [foundPath]);

  const onBlurClick = () => {
    setSelectedPubCode("");
  };
  const handleEndPath = () => {
    setAnimationState(false);
  };

  useLayoutEffect(() => {
    if (parsedData) {
      setSelectedMapIdx(parsedData.kioskNode.getFloor());
    }
  }, [parsedData]);
  useLayoutEffect(() => {
    window.addEventListener("click", onBlurClick);
    window.addEventListener("endpath", handleEndPath);
    return () => {
      window.removeEventListener("click", onBlurClick);
      window.removeEventListener("endpath", handleEndPath);
    };
  }, []);

  useA11y({ once: "space_guide", id: "" });
  return (
    <activeMapContext.Provider
      value={{
        activeList: activeFloorList,
        pathList: foundPath,
        destination,
        animationState,
        mapIndex: selectedMapIdx,
      }}
    >
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
              selected={idx + 1 === selectedMapIdx}
              data-a11y-id={`space_guide_0${idx}`}
              onClick={() => {
                pinchRef.current?.resetTransform(500, "easeOutCubic");
                setSelectedMapIdx(idx + 1);
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
          <div
            css={css`
              height: 100%;
              display: flex;
              align-items: center;
            `}
          >
            <div
              css={css`
                width: 3080px;
                height: 1003px;
              `}
            >
              <TransformWrapper ref={pinchRef} maxScale={2}>
                <TransformComponent
                  contentStyle={{
                    width: 3080,
                    height: 1003,
                  }}
                >
                  <div
                    css={css`
                      position: absolute;
                      z-index: 5;
                      width: ${3080}px;
                      height: ${1003}px;
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

                      const mapPubList = nodes?.pubList[MAP_INFO.floor].map(
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
                          pubList={mapPubList}
                          classList={classMap.get(MAP_INFO.floor)}
                          name={MAP_INFO.MAP_NAME}
                          floor={MAP_INFO.floor}
                          selectedPubCode={selectedPubCode}
                          width={3080 ?? 0}
                          height={1003 ?? 0}
                          url={url}
                          kioskNode={kioskNode}
                          index={idx}
                          boxSize={{
                            width:
                              3080 /
                              (contentsData.HEADER.MAP_RESOLUTION.width ?? 1),
                            height:
                              1003 /
                              (contentsData.HEADER.MAP_RESOLUTION.height ?? 1),
                          }}
                          selectedIndex={selectedMapIdx}
                          path={foundPath}
                          wayfind={wayfind}
                          onAnimationEnd={onAnimationEnd}
                        />
                      );
                    })}
                  </div>
                </TransformComponent>
              </TransformWrapper>
            </div>
          </div>
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
              {kioskNode?.getFloor() === selectedMapIdx && (
                <MapPubButton
                  key={selectedMapIdx + "KIOSK_POSITION"}
                  variants={fadeInOutVariants}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="108.121"
                    height="130"
                    viewBox="0 0 108.121 130"
                  >
                    <defs>
                      <filter
                        id="빼기_5"
                        x="0"
                        y="0"
                        width="108.121"
                        height="130"
                        filterUnits="userSpaceOnUse"
                      >
                        <feOffset in="SourceAlpha" />
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feFlood floodOpacity="0.8" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                      </filter>
                    </defs>
                    <g
                      id="그룹_698"
                      data-name="그룹 698"
                      transform="translate(-742.139 -164.998)"
                    >
                      <g
                        transform="matrix(1, 0, 0, 1, 742.14, 165)"
                        filter="url(#빼기_5)"
                      >
                        <path
                          id="빼기_5-2"
                          data-name="빼기 5"
                          d="M39.055,100v0h0A132.69,132.69,0,0,1,27.987,89.3a169.61,169.61,0,0,1-12.873-15.51A104.663,104.663,0,0,1,4.446,56.108C1.5,49.69,0,43.9,0,38.888a38.677,38.677,0,0,1,11.442-27.5,39.139,39.139,0,0,1,55.24,0,38.686,38.686,0,0,1,11.44,27.5c0,5.008-1.424,10.642-4.229,16.743a97.3,97.3,0,0,1-10.3,16.889C55.991,82.779,46.925,92.167,39.057,100Zm.16-87.5A28.143,28.143,0,0,0,19.382,60.529,28.092,28.092,0,1,0,50.137,14.714,27.839,27.839,0,0,0,39.215,12.5Z"
                          transform="translate(15 15)"
                          fill="#fff500"
                        />
                      </g>
                    </g>
                  </svg>
                  <P3
                    css={css`
                      color: white;
                    `}
                  >
                    현위치
                  </P3>
                </MapPubButton>
              )}
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
                    alt={PUB_INFO.PUB_NAME}
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
    </activeMapContext.Provider>
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
  pubList,
  classList,
  kioskNode,
  selectedPubCode,
  wayfind,
  onAnimationEnd,
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
  kioskNode?: Vector;
  selectedIndex: number;
  path?: Vector[];
  selectedPubCode?: string;
  classList?: ClassInfo[];
  pubList?: (PubInfo & { icon?: string })[];
  wayfind: (id: string, className: string) => void;
  onAnimationEnd?: (floor: number) => void;
}) {
  const [scope, animate] = useAnimate();
  const initialMount = useRef(false);

  const direction =
    index + 1 - selectedIndex > 0
      ? "BOTTOM"
      : index + 1 === selectedIndex
      ? "ACTIVE"
      : "TOP";
  const defaultStyle = {
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
        {kioskNode?.getFloor() === floor && (
          <div
            css={css`
              position: absolute;
              left: 50%;
              top: 0;
              /* height: 4rem; */
              top: calc(
                ${kioskNode.getPosition().y}px * ${boxSize.height} - 50px
              );
              left: calc(${kioskNode.getPosition().x}px * ${boxSize.width});
              z-index: 1;
            `}
          >
            <svg
              css={css`
                width: 100%;
                height: 100%;
              `}
              className="bounce-down"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="105.999"
              height="127.093"
              viewBox="0 0 105.999 127.093"
            >
              <defs>
                <filter
                  id="빼기_4"
                  x="0"
                  y="0"
                  width="105.999"
                  height="127.093"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feFlood floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#빼기_4)">
                <path
                  id="빼기_4-2"
                  data-name="빼기 4"
                  d="M15698.323-3952.782h0a127.544,127.544,0,0,1-10.627-10.266,163.879,163.879,0,0,1-12.36-14.891,100.8,100.8,0,0,1-10.24-16.979c-2.832-6.163-4.269-11.726-4.269-16.532a36.962,36.962,0,0,1,2.946-14.532,37.219,37.219,0,0,1,8.036-11.866,37.386,37.386,0,0,1,11.92-8,37.411,37.411,0,0,1,14.6-2.934,37.413,37.413,0,0,1,14.6,2.934,37.4,37.4,0,0,1,11.921,8,37.216,37.216,0,0,1,8.036,11.866,36.96,36.96,0,0,1,2.946,14.532c0,4.806-1.366,10.215-4.06,16.074a93.5,93.5,0,0,1-9.892,16.215c-7.3,9.855-16,18.865-23.549,26.379Zm.149-84a26.7,26.7,0,0,0-10.482,2.123,26.835,26.835,0,0,0-8.559,5.788,26.919,26.919,0,0,0-5.771,8.585,26.9,26.9,0,0,0-2.116,10.513,26.9,26.9,0,0,0,2.116,10.513,26.914,26.914,0,0,0,5.771,8.585,26.83,26.83,0,0,0,8.559,5.788,26.7,26.7,0,0,0,10.482,2.123,26.711,26.711,0,0,0,10.485-2.123,26.816,26.816,0,0,0,8.56-5.788,26.911,26.911,0,0,0,5.772-8.585,26.9,26.9,0,0,0,2.116-10.513,26.9,26.9,0,0,0-2.116-10.513,26.911,26.911,0,0,0-5.772-8.585,26.82,26.82,0,0,0-8.56-5.788A26.711,26.711,0,0,0,15698.473-4036.781Z"
                  transform="translate(-15645.33 4064.28)"
                  fill="#fff500"
                  stroke="rgba(0,0,0,0)"
                  strokeMiterlimit="10"
                  strokeWidth="1"
                />
              </g>
            </svg>
          </div>
        )}
        {pubList?.map((pub) => (
          <motion.img
            css={css`
              position: absolute;
              top: calc(
                ${pub.PUB_FLOOR.pos_y}px * ${boxSize.height} -
                  calc(calc(60px + var(--font-size) * 0.5) / 2)
              );
              left: calc(
                ${pub.PUB_FLOOR.pos_x}px * ${boxSize.width} -
                  calc(calc(60px + var(--font-size) * 0.5) / 2)
              );
              border-radius: 9999rem;
              width: calc(60px + var(--font-size) * 0.5);
              height: calc(60px + var(--font-size) * 0.5);
              aspect-ratio: 1/1;
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
        {classList?.map((cls, index) => {
          return (
            <button
              onClick={() => {
                if (cls.node) {
                  wayfind(cls.node.id, cls.CLASS_NAME);
                }
              }}
              data-prevent-scroll="true"
              tabIndex={direction === "ACTIVE" ? 0 : -1}
              css={css`
                background-color: transparent;
                border: none;
                z-index: 10;
                position: absolute;
                transform: translateX(-50%) translateY(-50%);
                top: calc(${cls.CLASS_FLOOR.pos_y}px * ${boxSize.height});
                left: calc(${cls.CLASS_FLOOR.pos_x}px * ${boxSize.width});
                font-size: calc(
                  ${cls.FONT_SIZE}px +
                    calc(
                      var(--font-size) * ${(boxSize.width + boxSize.height) / 2}
                    )
                );
                font-weight: bold;
                color: ${cls.FONT_COLOR};
                pointer-events: all;
              `}
              key={cls.CLASS_NAME}
            >
              {cls.CLASS_NAME}
            </button>
          );
        })}
        <AnimatePresence mode="sync">
          {
            <Path
              floor={floor}
              boxSize={boxSize}
              onAnimationComplete={() => onAnimationEnd?.(floor)}
            />
          }
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Path({
  boxSize,
  floor,
  onAnimationComplete,
}: {
  boxSize: {
    width: number;
    height: number;
  };
  floor: number;
  // scaleY: number;
  onAnimationComplete?: () => void;
}) {
  const { activeList, destination, animationState, mapIndex, pathList } =
    useContext(activeMapContext);
  const currentPath = useMemo(
    () => pathList?.filter((p) => p.getFloor() === floor),
    [pathList]
  );
  const active = useMemo(() => activeList.includes(floor), [activeList, floor]);
  const id = useId();
  const dist = useMemo(() => {
    if (!currentPath?.length) return "";
    let d = `M${currentPath[0].getPosition().x * boxSize.width},${
      currentPath[0].getPosition().y * boxSize.height
    }`;
    for (let i = 1; i < currentPath.length; i++) {
      const position = currentPath[i].getPosition();
      d += `L${position.x * boxSize.width},${position.y * boxSize.height}`;
    }
    return d;
  }, [currentPath]);

  const [ref, animate] = useAnimate<SVGSVGElement>();

  useEffect(() => {
    const startAnimation = async () => {
      if (
        active &&
        currentPath &&
        currentPath?.length > 1 &&
        floor === mapIndex
      ) {
        await animate(
          ref.current,
          {
            strokeDasharray: 350,
            strokeDashoffset: 300,
          },
          {
            duration: 3,
            ease: "linear",
            onComplete() {
              if (active) {
                if (destination?.getFloor() === floor) {
                  dispatchEvent(new CustomEvent("endpath"));
                }
                onAnimationComplete?.();
              }
            },
          }
        );
      } else {
        ref.current.style.strokeDasharray = "300";
        ref.current.style.strokeDashoffset = "300";
      }
    };
    startAnimation();
  }, [mapIndex, active, currentPath, animationState]);

  return (
    <svg
      ref={ref}
      key={(currentPath?.join("") ?? id) + destination?.id}
      strokeDasharray={300}
      strokeDashoffset={300}
      css={css`
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      `}
    >
      <path
        markerEnd="url(#arrowhead)"
        d={dist}
        stroke="#FB950A"
        fill="none"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeWidth={20}
        pathLength={40}
      />
    </svg>
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
  font-size: calc(var(--font-size) * 1.12);
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
