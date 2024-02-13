import { KeywordWithStudents } from "@/types/keyword";
import { UseQueryOptions } from "@tanstack/react-query";

export const getKeywordWithStudents: (
  selectedKeyword: string
) => UseQueryOptions<KeywordWithStudents[]> = (selectedKeyword) => ({
  queryKey: ["keyword", selectedKeyword],
  queryFn: async (key) => {
    const res = await import("@/assets/mocks/keyword_by_students.json");
    return res.data;
  },
});
export const getAllKeywordWithStudents: () => UseQueryOptions<
  KeywordWithStudents[]
> = () => ({
  queryKey: ["keywords"],
  queryFn: async (key) => {
    const res = await import("@/assets/mocks/keyword_by_students.json");
    return res.data;
  },
});
