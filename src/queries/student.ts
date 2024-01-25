import { Student } from "@/types/student";
import { UseQueryOptions } from "@tanstack/react-query";
import { getSolar } from "../../libs/holiday-kr";

type QueryFnOptions<ReturnType> = Pick<
  UseQueryOptions<ReturnType>,
  "enabled" | "select"
>;

// 2. 오늘 날짜 계산
const today = new Date();

// 3. 정렬 함수 정의
function sortDatesClosestToToday(a: Student, b: Student) {
  const dateA = new Date(a.birthday).setFullYear(1997);
  const dateB = new Date(b.birthday).setFullYear(1997);

  // 년도 무시하고 월, 일만 고려

  // 오늘 날짜와의 차이 (과거면 양수, 미래면 음수)
  const diffA = dateA - today.setFullYear(1997);
  const diffB = dateB - today.setFullYear(1997);

  // 둘 다 과거이거나 둘 다 미래인 경우
  if ((diffA >= 0 && diffB >= 0) || (diffA < 0 && diffB < 0)) {
    if (diffA === diffB) {
      return a.name.localeCompare(b.name); // 이름으로 정렬
    }
    return diffA - diffB; // 날짜 차이로 정렬
  }

  // 하나는 과거, 다른 하나는 미래인 경우
  return diffA < diffB ? 1 : -1;
}
type UseQueryOptionsFn<ReturnType> = (
  options?: QueryFnOptions<ReturnType>
) => UseQueryOptions<ReturnType>;

export const getStudentsQuery: UseQueryOptionsFn<Student[]> = (options) => ({
  ...options,
  queryKey: ["students"],
  queryFn: () =>
    import("@/assets/mocks/students.json").then((res) => {
      const data = res.data.map((student) => {
        const birthday = student.is_lunar_birth
          ? // 음력은 생일년도 기준 날짜를 당해년도의 음력날짜와 매핑해야함
            getSolar(
              new Date(
                new Date(student.birthday).setFullYear(new Date().getFullYear())
              )
            )
          : student.birthday;
        return {
          ...student,
          birthday,
        };
      }) as Student[];
      const newSortedData = data.sort((a, b) => sortDatesClosestToToday(a, b));
      return newSortedData;
    }),
});
