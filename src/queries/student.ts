import { Student } from "@/types/student";
import { UseQueryOptions } from "@tanstack/react-query";

export const getStudentsQuery: UseQueryOptions<Student[]> = {
  queryKey: ["students"],
  queryFn: () =>
    import("@/assets/mocks/students.json").then((res) => res.data as Student[]),
};
