import { MainShell } from "@/components/common/main-shell";
import { H1 } from "@/components/ui/text";
import { getKioskRouteInfo, getKioskRouteNodes } from "@/queries/kiosk-route";
import styled from "@emotion/styled";
import { useQueries } from "@tanstack/react-query";
import React, { useMemo } from "react";

const SpaceInfo = () => {
  const [{ data: info }, { data: nodes }] = useQueries({
    queries: [getKioskRouteInfo, getKioskRouteNodes],
  });
  const parsedMapData = useMemo(() => {
    if (!info || !nodes) return;
    const data = {
      ...nodes,
      HEADER: {
        ...nodes.HEADER,
        ...info.HEADER,
      },
      MAP_LIST: info.MAP_LIST.map(({ MAP_INFO }) => {
        return {
          ...MAP_INFO,
          MAIN_MAP_URL: MAP_INFO.MAIN_MAP_URL.replace("//zcommon", "/zcommon"),
          MAP_NAME: MAP_INFO.MAP_NAME.trim(),
        };
      }),
    };
    return data;
  }, [info, nodes]);

  console.log(parsedMapData);
  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>공간안내</H1>
      </MemoryHeader>
    </MemoryShell>
  );
};

export default SpaceInfo;

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
