import { Student } from "@/types/student";
import { UseQueryOptions } from "@tanstack/react-query";
import {
  filterByClassName,
  filterNameContainFromPattern,
  getStudentFromJson,
} from "@/fetcher/student";

type QueryFnOptions<ReturnType> = Pick<
  UseQueryOptions<ReturnType>,
  "enabled" | "select"
>;
type UseQueryOptionsFn<ReturnType, S = QueryFnOptions<ReturnType>> = (
  options?: S
) => UseQueryOptions<ReturnType>;

export const getStudentsQuery: UseQueryOptionsFn<Student[]> = (options) => ({
  ...options,
  queryKey: ["students"],
  queryFn: () => getStudentFromJson(),
});

export const getStudentsFromSearchQuery: UseQueryOptionsFn<
  Student[],
  string
> = (keyword) => ({
  queryKey: ["students", keyword],
  queryFn: () => getStudentFromJson(),
  select: (data) => filterNameContainFromPattern(data, keyword),
  gcTime: Infinity,
  staleTime: Infinity,
});
export const getStudentsFromClass: UseQueryOptionsFn<Student[], number> = (
  className
) => ({
  queryKey: ["students", "class", className],
  queryFn: () => getStudentFromJson(),
  select: (data) => filterByClassName(data, className),
  gcTime: Infinity,
  staleTime: Infinity,
});
