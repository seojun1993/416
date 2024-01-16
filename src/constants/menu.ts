import 메뉴이미지들 from "@/assets/images/menu";
type MenuTitle =
  | "기억공간"
  | "기억명단"
  | "꿈을통한검색"
  | "단원고416기억교실"
  | "기억과약속의길"
  | "공간안내";

type MenuItem = {
  title: string;
  description: string;
  src: string;
  imagePainter: string;
};

type MenuData = {
  [key in MenuTitle]: MenuItem;
};
export const menuContent: MenuData = {
  기억공간: {
    title: "기억 공간",
    description:
      "추모, 세월호 참사 관련 자료 및 타임라인 등을 제공하는 화면 입니다.",
    src: 메뉴이미지들.기억공간,
    imagePainter: "다솔초등학교 조예란",
  },
  기억명단: {
    title: "기억 명단",
    description: "희생된 261명에 대한 정보를 반 기준으로 제공하는 화면입니다.",
    src: 메뉴이미지들.기억명단,
    imagePainter: "영덕고등학교 정하은",
  },
  꿈을통한검색: {
    title: "꿈을 통한 검색",
    description: "워드클라우드를 통해 꿈을 찾아보세요",
    src: 메뉴이미지들.꿈을통한검색,
    imagePainter: "방포고등학교 정미솔",
  },
  단원고416기억교실: {
    title: "단원고 4.16 기억교실",
    description: "단원고 4.16 기억교실을 소개합니다.",
    src: 메뉴이미지들.단원고416기억교실,
    imagePainter: "천천중학교 최시진",
  },
  기억과약속의길: {
    title: "기억과 약속의 길",
    description: "순례길을 걸어보세요",
    src: 메뉴이미지들.기억과약속의길,
    imagePainter: "대명중학교 박은후",
  },
  공간안내: {
    title: "공간 안내",
    description:
      "메뉴에 대한 설명이 들어갑니다. 메뉴에 대한 설명이 들어갑니다.",
    src: 메뉴이미지들.공간안내,
    imagePainter: "4.16 민주시민교육원",
  },
};
