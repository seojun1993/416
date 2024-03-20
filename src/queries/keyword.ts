import { KeywordWithStudents } from "@/types/keyword";
import { UseQueryOptions } from "@tanstack/react-query";

export interface KeywordJson {
  result: boolean;
  data: KeywordResponse[];
}

export interface KeywordResponse {
  name: string;
  students: string;
}

export const getAllKeywordWithStudents: () => UseQueryOptions<
  KeywordWithStudents[]
> = () => ({
  queryKey: ["keywords"],
  queryFn: async (key) => {
    const res = (await fetch("/contents/keyword.json").then((res) =>
      res.json()
    )) as KeywordJson;
    console.log(res);
    res.data.forEach((data) => {
      data.students = JSON.parse(data.students as string) as any;
    });

    return res.data as unknown as KeywordWithStudents[];
  },
});
