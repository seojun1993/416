import { KioskRouteInfoResponse } from "@/types/kiosk-route-info";
import { KioskRouteNodeResponse } from "@/types/kiosk-route-nodes";
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
  return (parser.parse(xml) as KioskRouteNodeResponse).KIOSK;
};

export const fetchKioskRouteInfo = async () => {
  const parser = new XMLParser({
    parseAttributeValue: true,
    attributeNamePrefix: "",
    textNodeName: "value",
    ignoreAttributes: false,
    ignoreDeclaration: true,
  });
  const url = new URL(import.meta.env.VITE_MAP_SERVER_URL);
  http: url.pathname = "/user/xml/kiosk_route.do";
  url.searchParams.set("brn_code", "416");
  const xml = await fetch(url).then((response) => response.text());
  return (parser.parse(xml) as KioskRouteInfoResponse).KIOSK;
};
