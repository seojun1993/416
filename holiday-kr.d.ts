type DayOfWeef = "일" | "월" | "화" | "수" | "목" | "금" | "토";
type SplitedDate = { year: number; month: number; day: number };

function splitDate<T extends SplitedDate>(year: Date): T;
function splitDate<T extends SplitedDate>(
  year: number,
  month: number,
  day: number
): T;

declare module "holiday-kr" {
  /**
   * @default {leapMonth: false}
   * @property {boolean} leapMonth 윤달여부
   * @property {DayOfWeef} "일" | "월" | "화" | "수" | "목" | "금" | "토"
   */
  type HolidayDate = Partial<SplitedDate> & {
    leapMonth: boolean;
    dayOfWeek: DayOfWeef;
  };

  function getSolar(year: Date): HolidayDate;
  function getSolar(year: number, month: number, day: number): HolidayDate;

  function getLunar(year: Date): HolidayDate;
  function getLunar(year: number, month: number, day: number): HolidayDate;
}
