import { lunarMonthTable } from "./table";

type DayOfWeef = "일" | "월" | "화" | "수" | "목" | "금" | "토";
type SplitedDate = { year: number; month: number; day: number };

/**
 * @default {leapMonth: false}
 * @property {boolean} leapMonth 윤달여부
 * @property {DayOfWeef} "일" | "월" | "화" | "수" | "목" | "금" | "토"
 */
type HolidayDate = Partial<SplitedDate> & {
  leapMonth: boolean;
  dayOfWeek?: DayOfWeef;
};

/**
 * 입력한 음력 날짜로 양력 날짜 반환
 * isLeapMonth : 입력한 음력 날짜가 윤달인가?
 */
// function getSolar(year: Date): HolidayDate;
// function getSolar(year: number, month: number, day: number): HolidayDate;
// function getSolar(year, month, day, isLeapMonth) {
//   var date = splitDate(year, month, day);
//   var o = calcLunar(date.year, date.month, date.day, 2, isLeapMonth ? 1 : 0);
//   o.dayOfWeek = getDayOfWeek(o);
//   return o;
// }

export function getSolar(year: Date): string;
export function getSolar(year: number, month: number, day: number): string;
export function getSolar(
  year: Date | number,
  month?: number,
  day?: number,
  isLeapMonth?: boolean
) {
  const date =
    year instanceof Date ? splitDate(year) : splitDate(year, month!, day!);

  const o: HolidayDate = calcLunar(
    date.year,
    date.month,
    date.day,
    2,
    isLeapMonth ? 1 : 0
  );
  o.dayOfWeek = getDayOfWeek(date);
  return `${String(o.year).padStart(2, "0")}-${String(o.month).padStart(
    2,
    "0"
  )}-${String(o.day).padStart(2, "0")}`;
}

export function splitDate<T extends SplitedDate>(year: Date): T;
export function splitDate<T extends SplitedDate>(
  year: number,
  month: number,
  day: number
): T;
export function splitDate(year: Date | number, month?: number, day?: number) {
  if (year instanceof Date) {
    month = year.getMonth() + 1;
    day = year.getDate();
    year = year.getFullYear();
  }
  return { year: year, month: month, day: day };
}

export function getDayOfWeek(date: SplitedDate) {
  var d = new Date(date.year, date.month - 1, date.day);
  switch (d.getDay()) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
  }
}

/* 양력 <-> 음력 변환 함수
 * type : 1 - 양력 -> 음력
 *        2 - 음력 -> 양력
 * leapmonth : 0 - 평달
 *             1 - 윤달 (type = 2 일때만 유효)
 */
export function calcLunar(
  year: number,
  month: number,
  day: number,
  type: number,
  leapmonth: number
) {
  var solYear, solMonth, solDay;
  var lunYear, lunMonth, lunDay;
  var lunLeapMonth, lunMonthDay;
  var i, lunIndex;
  var solMonthDay = [31, 0, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (year < 1800 || year > 2101) {
    throw "1800년부터 2101년까지만 확인 가능합니다.";
  }
  if (year >= 2080) {
    /* 기준일자 양력 2080년 1월 1일 (음력 2079년 12월 10일) */
    solYear = 2080;
    solMonth = 1;
    solDay = 1;
    lunYear = 2079;
    lunMonth = 12;
    lunDay = 10;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2080 년 2월 28일 */
    lunMonthDay = 30; /* 2079년 12월 */
  } else if (year >= 2060) {
    /* 기준일자 양력 2060년 1월 1일 (음력 2059년 11월 28일) */
    solYear = 2060;
    solMonth = 1;
    solDay = 1;
    lunYear = 2059;
    lunMonth = 11;
    lunDay = 28;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2060 년 2월 28일 */
    lunMonthDay = 30; /* 2059년 11월 */
  } else if (year >= 2040) {
    /* 기준일자 양력 2040년 1월 1일 (음력 2039년 11월 17일) */
    solYear = 2040;
    solMonth = 1;
    solDay = 1;
    lunYear = 2039;
    lunMonth = 11;
    lunDay = 17;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2040 년 2월 28일 */
    lunMonthDay = 29; /* 2039년 11월 */
  } else if (year >= 2020) {
    /* 기준일자 양력 2020년 1월 1일 (음력 2019년 12월 7일) */
    solYear = 2020;
    solMonth = 1;
    solDay = 1;
    lunYear = 2019;
    lunMonth = 12;
    lunDay = 7;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2020 년 2월 28일 */
    lunMonthDay = 30; /* 2019년 12월 */
  } else if (year >= 2000) {
    /* 기준일자 양력 2000년 1월 1일 (음력 1999년 11월 25일) */
    solYear = 2000;
    solMonth = 1;
    solDay = 1;
    lunYear = 1999;
    lunMonth = 11;
    lunDay = 25;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 2000 년 2월 28일 */
    lunMonthDay = 30; /* 1999년 11월 */
  } else if (year >= 1980) {
    /* 기준일자 양력 1980년 1월 1일 (음력 1979년 11월 14일) */
    solYear = 1980;
    solMonth = 1;
    solDay = 1;
    lunYear = 1979;
    lunMonth = 11;
    lunDay = 14;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1980 년 2월 28일 */
    lunMonthDay = 30; /* 1979년 11월 */
  } else if (year >= 1960) {
    /* 기준일자 양력 1960년 1월 1일 (음력 1959년 12월 3일) */
    solYear = 1960;
    solMonth = 1;
    solDay = 1;
    lunYear = 1959;
    lunMonth = 12;
    lunDay = 3;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1960 년 2월 28일 */
    lunMonthDay = 29; /* 1959년 12월 */
  } else if (year >= 1940) {
    /* 기준일자 양력 1940년 1월 1일 (음력 1939년 11월 22일) */
    solYear = 1940;
    solMonth = 1;
    solDay = 1;
    lunYear = 1939;
    lunMonth = 11;
    lunDay = 22;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1940 년 2월 28일 */
    lunMonthDay = 29; /* 1939년 11월 */
  } else if (year >= 1920) {
    /* 기준일자 양력 1920년 1월 1일 (음력 1919년 11월 11일) */
    solYear = 1920;
    solMonth = 1;
    solDay = 1;
    lunYear = 1919;
    lunMonth = 11;
    lunDay = 11;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1920 년 2월 28일 */
    lunMonthDay = 30; /* 1919년 11월 */
  } else if (year >= 1900) {
    /* 기준일자 양력 1900년 1월 1일 (음력 1899년 12월 1일) */
    solYear = 1900;
    solMonth = 1;
    solDay = 1;
    lunYear = 1899;
    lunMonth = 12;
    lunDay = 1;
    lunLeapMonth = 0;
    solMonthDay[1] = 28; /* 1900 년 2월 28일 */
    lunMonthDay = 30; /* 1899년 12월 */
  } else if (year >= 1880) {
    /* 기준일자 양력 1880년 1월 1일 (음력 1879년 11월 20일) */
    solYear = 1880;
    solMonth = 1;
    solDay = 1;
    lunYear = 1879;
    lunMonth = 11;
    lunDay = 20;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1880 년 2월 28일 */
    lunMonthDay = 30; /* 1879년 11월 */
  } else if (year >= 1860) {
    /* 기준일자 양력 1860년 1월 1일 (음력 1859년 12월 9일) */
    solYear = 1860;
    solMonth = 1;
    solDay = 1;
    lunYear = 1859;
    lunMonth = 12;
    lunDay = 9;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1860 년 2월 28일 */
    lunMonthDay = 30; /* 1859년 12월 */
  } else if (year >= 1840) {
    /* 기준일자 양력 1840년 1월 1일 (음력 1839년 11월 27일) */
    solYear = 1840;
    solMonth = 1;
    solDay = 1;
    lunYear = 1839;
    lunMonth = 11;
    lunDay = 27;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1840 년 2월 28일 */
    lunMonthDay = 30; /* 1839년 11월 */
  } else if (year >= 1820) {
    /* 기준일자 양력 1820년 1월 1일 (음력 1819년 11월 16일) */
    solYear = 1820;
    solMonth = 1;
    solDay = 1;
    lunYear = 1819;
    lunMonth = 11;
    lunDay = 16;
    lunLeapMonth = 0;
    solMonthDay[1] = 29; /* 1820 년 2월 28일 */
    lunMonthDay = 30; /* 1819년 11월 */
  } else if (year >= 1800) {
    /* 기준일자 양력 1800년 1월 1일 (음력 1799년 12월 7일) */
    solYear = 1800;
    solMonth = 1;
    solDay = 1;
    lunYear = 1799;
    lunMonth = 12;
    lunDay = 7;
    lunLeapMonth = 0;
    solMonthDay[1] = 28; /* 1800 년 2월 28일 */
    lunMonthDay = 30; /* 1799년 12월 */
  }

  lunIndex = lunYear! - 1799;

  while (true) {
    if (type == 1 && year == solYear && month == solMonth && day == solDay) {
      return {
        year: lunYear,
        month: lunMonth,
        day: lunDay,
        leapMonth: lunLeapMonth == 1,
      };
    } else if (
      type == 2 &&
      year == lunYear &&
      month == lunMonth &&
      day == lunDay &&
      leapmonth == lunLeapMonth
    ) {
      return { year: solYear, month: solMonth, day: solDay, leapMonth: false };
    }

    /* add a day of solar calendar */
    if (solMonth == 12 && solDay == 31) {
      solYear!++;
      solMonth = 1;
      solDay = 1;

      /* set monthDay of Feb */
      if (solYear! % 400 == 0) solMonthDay[1] = 29;
      else if (solYear! % 100 == 0) solMonthDay[1] = 28;
      else if (solYear! % 4 == 0) solMonthDay[1] = 29;
      else solMonthDay[1] = 28;
    } else if (solMonthDay[solMonth! - 1] == solDay) {
      solMonth!++;
      solDay = 1;
    } else solDay!++;

    /* add a day of lunar calendar */
    if (
      lunMonth == 12 &&
      ((lunarMonthTable[lunIndex][lunMonth - 1] == 1 && lunDay == 29) ||
        (lunarMonthTable[lunIndex][lunMonth - 1] == 2 && lunDay == 30))
    ) {
      lunYear!++;
      lunMonth = 1;
      lunDay = 1;

      if (lunYear! > 2101) {
        throw "입력하신 날 또는 달이 없습니다. 다시 한번 확인하시기 바랍니다.";
      }

      lunIndex = lunYear! - 1799;

      if (lunarMonthTable[lunIndex][lunMonth - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth - 1] == 2) lunMonthDay = 30;
    } else if (lunDay == lunMonthDay) {
      if (lunarMonthTable[lunIndex][lunMonth! - 1] >= 3 && lunLeapMonth == 0) {
        lunDay = 1;
        lunLeapMonth = 1;
      } else {
        lunMonth!++;
        lunDay = 1;
        lunLeapMonth = 0;
      }

      if (lunarMonthTable[lunIndex][lunMonth! - 1] == 1) lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth! - 1] == 2) lunMonthDay = 30;
      else if (lunarMonthTable[lunIndex][lunMonth! - 1] == 3) lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth! - 1] == 4 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 29;
      else if (
        lunarMonthTable[lunIndex][lunMonth! - 1] == 4 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth! - 1] == 5 &&
        lunLeapMonth == 0
      )
        lunMonthDay = 30;
      else if (
        lunarMonthTable[lunIndex][lunMonth! - 1] == 5 &&
        lunLeapMonth == 1
      )
        lunMonthDay = 29;
      else if (lunarMonthTable[lunIndex][lunMonth! - 1] == 6) lunMonthDay = 30;
    } else lunDay!++;
  }
}
