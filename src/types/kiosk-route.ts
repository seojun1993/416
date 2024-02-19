export interface KioskRouteResponse {
  KIOSK: KioskRoute;
}

export interface KioskRoute {
  HEADER: Header;
  CLASS_LIST: ClassList;
  PUB_LIST: PubList;
  NODE_LIST: NodeList;
  SHAPE_LIST: string;
  PARK_LIST: string;
}

export interface Header {
  RET_CODE: string;
  VERSION: number;
}

export interface ClassList {
  CLASS_INFO: ClassInfo[];
}

export interface ClassInfo {
  CLASS_FLOOR: ClassFloor;
  CLASS_NAME: string;
  FONT_SIZE: number;
  FONT_COLOR: string;
  LINE_HEIGHT: number;
  GATE_POS_X: number;
  GATE_POS_Y: number;
  classIdx: number;
  floor: number;
  dp_type: string;
  search_type: string;
}

export interface ClassFloor {
  value: number;
  pos_x: number;
  pos_y: number;
  b_code: string;
}

export interface PubList {
  PUB_INFO: PubInfo[];
}

export interface PubInfo {
  PUB_ID: string;
  PUB_CODE: string;
  PUB_FLOOR: PubFloor;
  sect: string;
  status: string;
  area: string;
  floor: any;
}

export interface PubFloor {
  value: number;
  pos_x: number;
  pos_y: number;
  b_code: string;
}

export interface NodeList {
  NODE_INFO: NodeInfo[];
}

export interface NodeInfo {
  floor: number;
  b_code: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  direction: number;
  stime0: number;
  etime0: number;
  stime1: number;
  etime1: number;
  stime2: number;
  etime2: number;
}
