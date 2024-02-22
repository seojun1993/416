import { Vector } from "./Vector";
export function calculateDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}
export function findClosestVector(
  vectors: Vector[],
  targetX: number,
  targetY: number,
  targetFloor: number
): Vector | null {
  let closestVector: Vector | null = null;
  let minimumDistance: number = Infinity;

  for (const vector of vectors) {
    if (vector.getFloor() === targetFloor) {
      const distance = calculateDistance(
        targetX,
        targetY,
        vector.getPosition().x,
        vector.getPosition().y
      );
      if (distance < minimumDistance) {
        minimumDistance = distance;
        closestVector = vector;
      }
    }
  }

  return closestVector;
}
