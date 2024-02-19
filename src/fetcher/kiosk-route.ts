import { NodeType, Vector } from "@/libs/way-finder/Vector";
import { Graph } from "@/libs/way-finder/finder";
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
  response.PUB_LIST.PUB_INFO.forEach((pub) => {
    pubMap.set(pub.area, [...(pubMap.get(pub.area) ?? []), pub]);
    if (!pubList[pub.PUB_FLOOR.value]) {
      pubList[pub.PUB_FLOOR.value] = [];
    }
    pubList[pub.PUB_FLOOR.value].push(pub);
  });
  pubMap.forEach((pubList, key) => {
    pubList.forEach((pub) => {
      const id = Vector.getVectorId({
        floor: pub.PUB_FLOOR.value,
        x: pub.PUB_FLOOR.pos_x,
        y: pub.PUB_FLOOR.pos_y,
      });
      const foundVector = graph.get(id);
      if (foundVector) {
        foundVector.setType(NodeType.PUBLIC);
        pubList.forEach((childPub) => {
          const childId = Vector.getVectorId({
            floor: childPub.PUB_FLOOR.value,
            x: childPub.PUB_FLOOR.pos_x,
            y: childPub.PUB_FLOOR.pos_y,
          });
          if (childId === id) return;
          const foundChildVector = graph.get(childId);
          if (foundChildVector) {
            foundChildVector.setType(NodeType.PUBLIC);
            foundVector.addLinkedVector(foundChildVector, 1);
          }
        });
        graph.set(id, foundVector);
      }
    });
  });

  console.log(response);
  console.log(graph);
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
  const url = new URL(import.meta.env.VITE_MAP_SERVER_URL);
  url.pathname = "/user/xml/kiosk_contents.do";
  url.searchParams.set("kiosk_code", kioskCode);
  const xml = await fetch(url).then((response) => response.text());
  const response = parser.parse(xml).KIOSK as KioskContents;
  const posMap = new Map();
  // FIXME
  posMap.set("1F", {
    pos_x: 1187,
    pos_y: 527,
  });
  response.HEADER.KIOSK_FLOOR = {
    ...response.HEADER.KIOSK_FLOOR,
    ...(posMap.get(response.HEADER.KIOSK_FLOOR.floor) ?? {}),
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
