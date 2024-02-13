import { getSolar } from "@/libs/holiday-kr";
import { isContain초성 } from "@/libs/utils";
import { Student } from "@/types/student";

export function findNextBirthdayIndex(data: Student[]) {
  const today = new Date(
    `1997-${(new Date().getMonth() + 1).toFixed().padStart(2, "0")}-${new Date()
      .getDate()
      .toFixed()
      .padStart(2, "0")}`
  );
  let closestBirthday: Date | null = null;
  let closestIndex = -1;

  data.forEach((person, index) => {
    const birthdayThisYear = new Date(
      today.getFullYear(),
      new Date(new Date(person.birthday).setFullYear(1997)).getMonth(),
      new Date(new Date(person.birthday).setFullYear(1997)).getDate(),
      23
    );
    const birthdayNextYear = new Date(
      today.getFullYear() + 1,
      new Date(new Date(person.birthday).setFullYear(1997)).getMonth(),
      new Date(new Date(person.birthday).setFullYear(1997)).getDate()
    );

    // 올해 생일이 이미 지났으면 내년 생일을 사용
    const birthday =
      birthdayThisYear > today ? birthdayThisYear : birthdayNextYear;
    if (
      closestBirthday === null ||
      (birthday < closestBirthday && birthday >= today)
    ) {
      closestBirthday = birthday;
      closestIndex = index;
    }
  });

  return closestIndex;
}

// 3. 정렬 함수 정의
export function sortDatesClosestToToday(a: Student, b: Student) {
  const today = new Date();
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

export const getStudentFromJson = () =>
  fetch("http://192.168.0.143:8416/api/json/select416json.do?gubun=students")
    .then((res) => res.json() as Promise<{ result: boolean; data: Student[] }>)
    .then((res) => {
      const data = res.data.map((student) => {
        student.keywords = JSON.parse(student.keywords as unknown as string);
        student.images = JSON.parse(student.images as unknown as string);
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
    });

export const filterNameContainFromPattern = (
  data: Student[],
  keyword?: string
) =>
  data.filter(
    (student) =>
      keyword &&
      (student.name.includes(keyword) || isContain초성(keyword, student.name))
  );

export const filterByClassName = (data: Student[], classNumber?: number) => {
  const parsed = data
    .filter((student) => student.class === classNumber)
    .sort(sortDatesClosestToToday);

  const idx = findNextBirthdayIndex(parsed);
  const result: Student[] = [];
  for (let i = 0; i < parsed.length; i++) {
    result.push(parsed[(i + idx) % parsed.length]);
  }
  return result;
};
