import { KeywordWithStudents } from "@/types/keyword";
import { UseQueryOptions } from "@tanstack/react-query";

export const getAllKeywordWithStudents: () => UseQueryOptions<
  KeywordWithStudents[]
> = () => ({
  queryKey: ["keywords"],
  queryFn: async (key) => {
    const res = await import("~/contents/keyword.json");
    res.data.forEach((data) => {
      data.students = JSON.parse(data.students as string) as any;
    });

    return res.data as unknown as KeywordWithStudents[];
  },
});
