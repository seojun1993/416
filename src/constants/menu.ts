import 메뉴이미지들 from "@/assets/images/menu";
type MenuTitle =
  | "세월호타임라인"
  | "기억명단"
  | "별을통한만남"
  | "단원고416기억교실"
  | "기억과약속의길"
  | "공간안내";

type MenuItem = {
  title: string;
  description: string;
  src: string;
  imagePainter: string;
  href: string;
};

type MenuData = {
  [key in MenuTitle]: MenuItem;
};
export const menuContent: MenuData = {
  단원고416기억교실: {
    title: "단원고 4.16 기억교실",
    description: "단원고 4.16 기억교실을 소개합니다.",
    src: 메뉴이미지들.단원고416기억교실,
    imagePainter: "천천중학교 최시진",
    href: "/memory-class",
  },
  기억명단: {
    title: "기억 명단",
    description: "희생된 261명에 대한 정보를\n반 기준으로 제공하는 화면입니다.",
    src: 메뉴이미지들.기억명단,
    imagePainter: "영덕고등학교 정하은",
    href: "/memory-list",
  },
  별을통한만남: {
    title: "별을 통한 만남",
    description: "별(꿈, 취미, 별명)을 터치하여 희생자를\n만날 수 있습니다.",
    src: 메뉴이미지들.별을통한만남,
    imagePainter: "방포고등학교 정미솔",
    href: "/stars",
  },
  공간안내: {
    title: "공간 안내",
    description: "시설에 대한 안내를 받으실 수 있습니다.",
    src: 메뉴이미지들.공간안내,
    imagePainter: "4.16 민주시민교육원",
    href: "/space-info",
  },
  기억과약속의길: {
    title: "기억과 약속의 길",
    description: "기억과 약속의 길을 걸어보세요.",
    src: 메뉴이미지들.기억과약속의길,
    imagePainter: "대명중학교 박은후",
    href: "/memory-road",
  },
  세월호타임라인: {
    title: "세월호 타임라인",
    description:
      "추모, 세월호 참사 관련 자료 및\n타임라인 등을 제공하는 화면 입니다.",
    src: 메뉴이미지들.세월호타임라인,
    imagePainter: "다솔초등학교 조예란",
    href: "/timeline",
  },
};
