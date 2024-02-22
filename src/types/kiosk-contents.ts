export interface KioskContents {
  HEADER: Header;
  KIOSK_LIST: KioskList[];
  MAP_LIST: MapList[];
  CLASS_LIST: ClassList[];
  PUB_INFO_LIST: PubInfoList[];
  KIOSK_INFO?: KioskList["KIOSK_INFO"];
}

export interface Header {
  MAKE_TIME: number;
  RET_CODE: string;
  BRN_ID: number;
  BRN_CODE: number;
  KIOSK_ID: number;
  KIOSK_CODE: string;
  KIOSK_SECT: string;
  KIOSK_MAP: string;
  KIOSK_NAME: string;
  KIOSK_FLOOR: KioskFloor;
  URL_STATUS: string;
  URL_REPORT: string;
  URL_SENSOR: string;
  CLEAR_TIME: number;
  URL_NOTICE: string;
  MAP_RESOLUTION: MapResolution;
  PUB_ICON_RESOLUTION: PubIconResolution;
}

export interface KioskFloor {
  pos_x: number;
  pos_y: number;
  floor: string;
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

export interface KioskList {
  KIOSK_INFO: KioskInfo;
}

export interface KioskInfo {
  KIOSK_CODE: string;
  KIOSK_POS: KioskPos;
  kioskId: number;
  floor: number;
}

export interface KioskPos {
  pos_x: number;
  pos_y: number;
}
