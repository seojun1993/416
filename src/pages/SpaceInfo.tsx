import { H1, P3 } from "@/components/ui/text";
import { getKioskContents, getKioskRoute } from "@/queries/kiosk-route";
import { css } from "@emotion/react";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";
import { useElementSize } from "@/hooks/use-element-size";
import { fadeInOutVariants } from "@/variants";
import { dijkstra } from "@/libs/way-finder/finder";
import {
  MemoryShell,
  MemoryHeader,
  memoryItems,
  MemoryListButton,
  MemoryMapBox,
  Map,
  MapPubList,
  MapPubButton,
} from "./space-info";

export const SpaceInfo = () => {
  const [selectedMapIdx, setSelectedMapIdx] = useState(1);
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(boxRef.current);
  const pinchRef = useRef<ReactZoomPanPinchContentRef>(null);

  const [{ data: nodesData }, { data: contentsData }] = useQueries({
    queries: [getKioskRoute, getKioskContents("K001")],
  });
  const parsedData = useMemo(() => {
    if (!nodesData || !contentsData) return;

    const data = {
      nodes: nodesData,
      contents: contentsData,
    };
    return data;
  }, [nodesData, contentsData]);

  const { nodes, contents } = parsedData ?? {};

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
  useEffect(() => {
    if (nodesData?.nodes) {
      dijkstra(nodesData.nodes, "NODE_2_554_229", "NODE_2_266_505");
    }
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
                return (
                  <Map
                    key={MAP_INFO.MAP_NAME}
                    name={MAP_INFO.MAP_NAME}
                    width={contents?.HEADER.MAP_RESOLUTION.width ?? 0}
                    height={contents?.HEADER.MAP_RESOLUTION.height ?? 0}
                    url={url}
                    index={idx}
                    boxWidth={size?.width ?? 0}
                    selectedIndex={selectedMapIdx}
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
