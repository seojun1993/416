import { KeywordWithStudents } from "@/types/keyword";
import { UseQueryOptions } from "@tanstack/react-query";

export const getAllKeywordWithStudents: () => UseQueryOptions<
  KeywordWithStudents[]
> = () => ({
  queryKey: ["keywords"],
  queryFn: async (key) => {
    const res = await fetch(
      "http://192.168.0.143:8416/api/json/select416json.do?gubun=keyword"
    ).then(
      (res) =>
        res.json() as Promise<{
          result: boolean;
          data: { name: string; students: unknown }[];
        }>
    );
    res.data.forEach((data) => {
      data.students = JSON.parse(
        data.students as string
      ) as KeywordWithStudents["students"][];
    });

    return res.data as KeywordWithStudents[];
  },
});
