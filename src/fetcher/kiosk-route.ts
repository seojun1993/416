import { NodeType, Vector } from "@/libs/way-finder/Vector";
import { Graph } from "@/libs/way-finder/finder";
import { findClosestVector } from "@/libs/way-finder/utils";
import { KioskContents } from "@/types/kiosk-contents";
import { KioskRouteResponse, PubInfo } from "@/types/kiosk-route";
import { XMLParser } from "fast-xml-parser";

export const fetchKioskRouteNodes = async () => {
  const parser = new XMLParser({
    parseAttributeValue: true,
    attributeNamePrefix: "",
    textNodeName: "value",
    ignoreAttributes: false,
    ignoreDeclaration: true,
  });
  const url = new URL(import.meta.env.VITE_MAP_SERVER_URL);
  url.pathname = "/zcommonfiles/route/kiosk_route_0.2.xml";
  const xml = await fetch(url).then((response) => response.text());
  const response = (parser.parse(xml) as KioskRouteResponse).KIOSK;
  const graph: Graph = new Map<string, Vector>();
  response.NODE_LIST.NODE_INFO.forEach((node) => {
    const vector =
      graph.get(
        Vector.getVectorId({
          floor: node.floor,
          x: node.x1,
          y: node.y1,
        })
      ) ??
      new Vector({
        x: node.x1,
        y: node.y1,
        floor: node.floor,
        type: NodeType.NODE,
      });
    const destVector =
      graph.get(
        Vector.getVectorId({
          floor: node.floor,
          x: node.x2,
          y: node.y2,
        })
      ) ??
      new Vector({
        x: node.x2,
        y: node.y2,
        floor: node.floor,
        type: NodeType.NODE,
      });

    vector.addLinkedVector(destVector);
    destVector.addLinkedVector(vector);

    graph.set(vector.id, vector);
    graph.set(destVector.id, destVector);
  });

  const pubList: { [key: number]: PubInfo[] } = {};
  const pubMap = new Map<string, PubInfo[]>();
  const graphValueToList = [...graph.values()];
  response.PUB_LIST.PUB_INFO.forEach((pub) => {
    pubMap.set(pub.area, [...(pubMap.get(pub.area) ?? []), pub]);
    if (!pubList[pub.PUB_FLOOR.value]) {
      pubList[pub.PUB_FLOOR.value] = [];
    }
    pubList[pub.PUB_FLOOR.value].push(pub);
  });
  response.CLASS_LIST.CLASS_INFO.forEach((cls) => {
    const classNode = findClosestVector(
      graphValueToList,
      cls.CLASS_FLOOR.pos_x,
      cls.CLASS_FLOOR.pos_y,
      cls.CLASS_FLOOR.value
    );
    if (classNode) {
      cls.node = classNode;
    }
  });
  pubMap.forEach((pubList, key) => {
    pubList.forEach((pub) => {
      const foundVector = findClosestVector(
        graphValueToList,
        pub.PUB_FLOOR.pos_x,
        pub.PUB_FLOOR.pos_y,
        pub.PUB_FLOOR.value
      );
      if (foundVector) {
        foundVector.setType(NodeType.PUBLIC);
        if (["P01"].includes(pub.PUB_CODE)) {
          pubList.forEach((childPub) => {
            if (childPub.PUB_ID === pub.PUB_ID && pub.area !== childPub.area)
              return;

            const foundChildVector = findClosestVector(
              graphValueToList,
              childPub.PUB_FLOOR.pos_x,
              childPub.PUB_FLOOR.pos_y,
              childPub.PUB_FLOOR.value
            );

            if (foundChildVector) {
              foundChildVector.setType(NodeType.PUBLIC);
              foundVector.addLinkedVector(foundChildVector, 1);
            }
          });
        }

        graph.set(foundVector.id, foundVector);
      }
    });
  });
  return { ...response, pubList, graph };
};

export const fetchKioskRouteContents = async (kioskCode = "K001") => {
  const parser = new XMLParser({
    parseAttributeValue: true,
    attributeNamePrefix: "",
    textNodeName: "value",
    ignoreAttributes: false,
    ignoreDeclaration: true,
  });
  const url = new URL(window.location.origin);
  url.pathname = "/xml/kiosk_contents.xml";
  const xml = await fetch(url).then((response) => response.text());
  const response = parser.parse(xml).KIOSK as KioskContents;
  response.KIOSK_LIST.forEach((kioskCode) => {
    kioskCode.KIOSK_INFO.KIOSK_CODE = kioskCode.KIOSK_INFO.KIOSK_CODE.trim();
  });
  const kiosk = response.KIOSK_LIST.find(
    (kiosk) => kiosk.KIOSK_INFO.KIOSK_CODE === kioskCode
  );

  response.KIOSK_INFO = kiosk?.KIOSK_INFO;
  response.HEADER.KIOSK_FLOOR = {
    ...response.HEADER.KIOSK_FLOOR,
    ...(response.KIOSK_LIST.find(
      (kiosk) => kiosk.KIOSK_INFO.KIOSK_CODE === kioskCode
    )?.KIOSK_INFO.KIOSK_POS ?? {}),
  };

  response.MAP_LIST.forEach((map) => {
    map.MAP_INFO.MAP_NAME = map.MAP_INFO.MAP_NAME.trim();
  });
  response.PUB_INFO_LIST.forEach((pub) => {
    pub.PUB_INFO.PUB_CODE = pub.PUB_INFO.PUB_CODE.trim();
    pub.PUB_INFO.PUB_NAME = pub.PUB_INFO.PUB_NAME.trim();
  });
  return response;
};
