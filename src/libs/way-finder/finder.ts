import { Vector } from "./Vector";

export type Graph = Map<string, Vector>;
export const curryingDijkstra = (startVector: Vector, graph: Graph) => {
  return (
    destinationVector: Vector,
    options?: {
      graph?: Graph;
      startVector?: Vector;
    }
  ) =>
    dijkstra(
      options?.graph ?? graph,
      options?.startVector?.id ?? startVector.id,
      destinationVector.id
    );
};

export function dijkstra(
  graph: Graph,
  startId: string,
  endId: string
): { path: Vector[]; totalDistance: number } {
  const graphKeys = [...graph.keys()];
  if (!graphKeys.length) return { path: [], totalDistance: 0 };
  const distances: { [key: string]: number } = {};
  const prev: { [key: string]: string | null } = {};
  const visited: Set<string> = new Set();
  const queue: string[] = graphKeys;
  // 초기화
  for (const id of queue) {
    distances[id] = id === startId ? 0 : Infinity;
    prev[id] = null;
  }

  while (queue.length > 0) {
    queue.sort((a, b) => distances[a] - distances[b]);
    const currentNodeId = queue.shift();
    if (currentNodeId === undefined) break;
    if (currentNodeId === endId) break;

    visited.add(currentNodeId);
    const currentNode = graph.get(currentNodeId);

    currentNode?.linkedVectors.forEach((distance, neighborVector) => {
      if (!visited.has(neighborVector.id)) {
        const totalDistance = distance + distances[currentNodeId];
        if (totalDistance < distances[neighborVector.id]) {
          distances[neighborVector.id] = totalDistance;
          prev[neighborVector.id] = currentNodeId;
        }
      }
    });
  }

  const path: Vector[] = [];
  let totalDistance = 0;
  let currentId: string | null = endId;
  while (currentId !== null && currentId !== startId) {
    if (!graph.get(currentId)) break;
    path.unshift(graph.get(currentId)!);

    const prevId: string = prev[currentId] ?? "";
    if (prevId !== null) {
      totalDistance +=
        graph.get(currentId)!.linkedVectors.get(graph.get(prevId)!) || 0;
    }
    currentId = prevId;
  }
  if (startId !== endId) {
    // 시작점과 종료점이 다를 경우 시작점 추가
    path.unshift(graph.get(startId)!);
  }

  return { path, totalDistance };
}
