import {
  fetchKioskRouteInfo,
  fetchKioskRouteNodes,
} from "@/fetcher/kiosk-route";
import { KioskRouteInfoResponse } from "@/types/kiosk-route-info";
import { KioskRouteNodeResponse } from "@/types/kiosk-route-nodes";
import { UseQueryOptions } from "@tanstack/react-query";

export const getKioskRouteNodes: UseQueryOptions<
  KioskRouteNodeResponse["KIOSK"]
> = {
  queryKey: ["kioskRoute", "nodes"],
  queryFn: fetchKioskRouteNodes,
};
export const getKioskRouteInfo: UseQueryOptions<
  KioskRouteInfoResponse["KIOSK"]
> = {
  queryKey: ["kioskRoute", "info"],
  queryFn: fetchKioskRouteInfo,
};
