import { Student } from "@/types/student";
import {
  filterByClassName,
  filterNameContainFromPattern,
  findNextBirthdayIndex,
  getStudentFromJson,
  sortDatesClosestToToday,
} from "@/fetcher/student";
import { UseQueryOptionsFn } from "@/types/query";

async function sortStudentByTodayMonth() {
  const data = (await getStudentFromJson())
    .filter(
      (student) =>
        new Date(student.birthday).getMonth() === new Date().getMonth()
    )
    .sort(sortDatesClosestToToday);

  const idx = findNextBirthdayIndex(data);
  const result: Student[] = [];

  for (let i = 0; i < data.length; i++) {
    result.push(data[(i + idx) % data.length]);
  }
  return result;
}

export const getStudentsQuery: UseQueryOptionsFn<Student[]> = (options) => ({
  ...options,
  queryKey: ["students"],
  queryFn: () => getStudentFromJson(),
});

export const getFilteredStudentsByMonthQuery: UseQueryOptionsFn<
  Student[],
  number
> = (todayMonth) => ({
  queryKey: ["students", todayMonth],
  queryFn: () => sortStudentByTodayMonth(),
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
  queryFn: async () => filterByClassName(await getStudentFromJson(), className),
  gcTime: Infinity,
  staleTime: Infinity,
});
