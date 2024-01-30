import { UseQueryOptions } from "@tanstack/react-query";

export type QueryFnOptions<ReturnType> = Pick<
  UseQueryOptions<ReturnType>,
  "enabled" | "select"
>;
export type UseQueryOptionsFn<ReturnType, S = QueryFnOptions<ReturnType>> = (
  options?: S
) => UseQueryOptions<ReturnType>;
