export interface KioskRouteInfoResponse {
  KIOSK: KioskRouteInfo;
}

export interface KioskRouteInfo {
  HEADER: Header;
  MAP_LIST: MapList[];
  CLASS_LIST: ClassList[];
  PUB_INFO_LIST: PubInfoList[];
}

export interface Header {
  MAKE_TIME: number;
  RET_CODE: string;
  BRN_CODE: number;
  KIOSK_DIRECT: number;
  LANGUAGE: string;
  STORE_DEFAULT_FONT: number;
  STORE_DEFAULT_COLOR: string;
  MAP_RESOLUTION: MapResolution;
  PUB_ICON_RESOLUTION: PubIconResolution;
}

export interface MapResolution {
  width: number;
  height: number;
}

export interface PubIconResolution {
  width: number;
  height: number;
}

export interface MapList {
  MAP_INFO: MapInfo;
}

export interface MapInfo {
  MAP_NAME: string;
  MAIN_MAP_URL: string;
  floor: number;
  direction: string;
}

export interface ClassList {
  CLASS_INFO: ClassInfo;
}

export interface ClassInfo {
  CLASS_POS: ClassPos;
  CLASS_NAME: string;
  classIdx: number;
  classCode: number;
}

export interface ClassPos {
  pos_x: string;
  pos_y: string;
  gate_pos_x: string;
  gate_pos_y: string;
  floor: number;
}

export interface PubInfoList {
  PUB_INFO: PubInfo;
}

export interface PubInfo {
  PUB_CODE: string;
  PUB_NAME: string;
  PUB_URL: string;
}
