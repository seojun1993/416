// 음력 데이터 (평달 - 작은달 :1,  큰달:2 )
// (윤달이 있는 달 - 평달이 작고 윤달도 작으면 :3 , 평달이 작고 윤달이 크면 : 4)
// (윤달이 있는 달 - 평달이 크고 윤달이 작으면 :5,  평달과 윤달이 모두 크면 : 6)
export const lunarMonthTable = [
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1801 */,
  [1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 3, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 3, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 5, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 5, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 1811 */,
  [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 5, 2, 1, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 5, 2, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2] /* 1821 */,
  [2, 1, 5, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2] /* 1831 */,
  [1, 2, 1, 2, 1, 1, 2, 1, 5, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 5, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 4, 1, 1, 2, 1, 2, 1, 2, 2, 1] /* 1841 */,
  [2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 4, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 5, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2] /* 1851 */,
  [2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 5, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 6, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2] /* 1861 */,
  [2, 1, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 4, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 5, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1, 2] /* 1871 */,
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 4, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 4, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1] /* 1881 */,
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 3, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2] /* 1891 */,
  [1, 1, 2, 1, 1, 5, 2, 2, 1, 2, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 5, 1, 2, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 5, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1] /* 1901 */,
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 3, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 4, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2] /* 1911 */,
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 5, 1, 2, 1, 2, 1, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 3, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 5, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2] /* 1921 */,
  [2, 1, 2, 2, 3, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 5, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 5, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 1, 1, 5, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 1931 */,
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 6, 1, 2, 1, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 4, 1, 1, 2, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 4, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 4, 1, 1, 2, 1, 2, 1] /* 1941 */,
  [2, 1, 2, 2, 1, 2, 2, 1, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 5, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 3, 2, 1, 2, 1, 2],
  [1, 2, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2] /* 1951 */,
  [1, 2, 1, 2, 4, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [2, 1, 4, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2] /* 1961 */,
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 2],
  [1, 2, 5, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1, 2] /* 1971 */,
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 5, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 6, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2] /* 1981 */,
  [2, 1, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 2, 1, 1, 2, 1, 1, 5, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 1, 2, 5, 2, 2, 1, 2, 1, 2],
  [1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 5, 1, 2, 2, 1, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2] /* 1991 */,
  [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 5, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 5, 2, 1, 1, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1],
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2] /* 2001 */,
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 5, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 1, 5, 2, 2, 1, 2, 2],
  [1, 1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 2, 1, 1, 5, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1] /* 2011 */,
  [2, 1, 2, 5, 2, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 5, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 2, 1, 4, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2],
  [2, 1, 2, 5, 2, 1, 1, 2, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1] /* 2021 */,
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 5, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 1, 1, 5, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 2, 1, 5, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 1, 2, 2, 1, 1, 2, 1, 1, 2, 2],
  [1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 5, 2, 1, 2, 2, 1, 2, 1, 2, 1] /* 2031 */,
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 5, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 4, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 1],
  [2, 1, 2, 2, 1, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2] /* 2041 */,
  [1, 5, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2],
  [2, 1, 2, 1, 1, 2, 3, 2, 1, 2, 2, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [2, 1, 2, 2, 4, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2, 1],
  [1, 2, 4, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 2] /* 2051 */,
  [1, 2, 1, 1, 2, 1, 1, 5, 2, 2, 2, 2],
  [1, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 2],
  [1, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 4, 1, 1, 2, 1, 2, 1],
  [2, 2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 2, 1, 2, 1, 2, 2, 1, 1, 2, 1],
  [2, 1, 2, 4, 2, 1, 2, 1, 2, 2, 1, 1],
  [2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1],
  [2, 2, 3, 2, 1, 1, 2, 1, 2, 2, 2, 1] /* 2061 */,
  [2, 2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 3, 2, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2],
  [1, 2, 1, 2, 5, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 5, 1, 2, 1, 2, 2, 2, 1, 2],
  [2, 1, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2],
  [2, 1, 2, 1, 2, 1, 1, 5, 2, 1, 2, 2] /* 2071 */,
  [2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2],
  [2, 1, 2, 2, 1, 2, 1, 1, 2, 1, 2, 1],
  [2, 1, 2, 2, 1, 5, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 2, 1, 2, 1, 2, 2, 1, 2, 1],
  [2, 1, 2, 3, 2, 1, 2, 2, 2, 1, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [2, 1, 5, 2, 1, 1, 2, 1, 2, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2] /* 2081 */,
  [1, 2, 2, 2, 1, 2, 3, 2, 1, 1, 2, 2],
  [1, 2, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1],
  [2, 1, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 6, 1, 2, 2, 1, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1],
  [2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2],
  [1, 2, 1, 5, 1, 2, 1, 1, 2, 2, 2, 1],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1],
  [2, 2, 2, 1, 2, 1, 1, 5, 1, 2, 2, 1],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1] /* 2091 */,
  [2, 2, 1, 2, 2, 1, 2, 1, 2, 1, 2, 1],
  [1, 2, 2, 1, 2, 4, 2, 1, 2, 1, 2, 1],
  [2, 1, 1, 2, 1, 2, 2, 1, 2, 2, 1, 2],
  [1, 2, 1, 1, 2, 1, 2, 1, 2, 2, 2, 1],
  [2, 1, 2, 3, 2, 1, 1, 2, 2, 2, 1, 2],
  [2, 1, 2, 1, 1, 2, 1, 1, 2, 2, 1, 2],
  [2, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 5, 2, 2, 1, 1, 2, 1, 1, 2, 1, 2],
  [2, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1],
  [2, 2, 1, 2, 2, 1, 5, 2, 1, 1, 2, 1],
];

export const holidayTable = [
  ["신정", 1, 1, 1],
  //  ["설 전날", 12, 0, 2],
  ["설날", 1, 1, 2],
  ["설 다음날", 1, 2, 2],
  ["3·1절", 3, 1, 1],
  ["석가탄신일", 4, 8, 2],
  ["어린이날", 5, 5, 1],
  ["현충일", 6, 6, 1],
  ["광복절", 8, 15, 1],
  ["추석 전날", 8, 14, 2],
  ["추석", 8, 15, 2],
  ["추석 다음날", 8, 16, 2],
  ["개천절", 10, 3, 1],
  ["한글날", 10, 9, 1],
  ["성탄절", 12, 25, 1],
];
