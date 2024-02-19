import {
  fetchKioskRouteContents,
  fetchKioskRouteNodes,
} from "@/fetcher/kiosk-route";
import { Graph } from "@/libs/way-finder/finder";
import { KioskContents } from "@/types/kiosk-contents";
import { KioskRouteResponse, PubInfo } from "@/types/kiosk-route";
import { UseQueryOptions } from "@tanstack/react-query";

export const getKioskRoute: UseQueryOptions<
  KioskRouteResponse["KIOSK"] & {
    graph: Graph;
    pubList: { [key: number]: PubInfo[] };
  }
> = {
  queryKey: ["kioskRoute", "nodes"],
  queryFn: fetchKioskRouteNodes,
};
export const getKioskContents = (
  kioskCode: string
): UseQueryOptions<
  KioskContents,
  Error,
  KioskContents,
  ["kioskRoute", "contents", string]
> => ({
  queryKey: ["kioskRoute", "contents", kioskCode],
  queryFn: ({ queryKey }) => {
    return fetchKioskRouteContents(queryKey[2]);
  },
});
