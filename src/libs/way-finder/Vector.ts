import { calculateDistance } from "../utils";

export enum NodeType {
  NODE = "NODE",
  PUBLIC = "PUBLIC",
  KIOSK = "KIOSK",
}
export class Vector {
  private readonly x: number;
  private readonly y: number;
  private readonly floor: number;
  public type: NodeType;
  public linkedVectors: Map<Vector, number> = new Map();

  constructor(options: {
    x: number;
    y: number;
    floor: number;
    type: NodeType;
    distance?: number;
  }) {
    const { x, y, floor, type } = options ?? {};
    this.x = x;
    this.y = y;
    this.floor = floor;
    this.type = type;
  }

  getPosition() {
    return { x: this.x, y: this.y };
  }

  addLinkedVector(vector: Vector, distance?: number) {
    this.linkedVectors.set(vector, distance ?? calculateDistance(this, vector));
  }

  get id() {
    return `${this.floor}_${this.x}_${this.y}`;
  }

  getFloor() {
    return this.floor;
  }

  setType(type: NodeType) {
    this.type = type;
  }

  static getVectorId(nodeOptions: { floor: number; x: number; y: number }) {
    const { floor, x, y } = nodeOptions;
    return `${floor}_${x}_${y}`;
  }
}
