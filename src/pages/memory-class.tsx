/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import ImageX from "@/components/ui/image";
import { H1, P3 } from "@/components/ui/text";
import styled from "@emotion/styled";
import { ReactNode, useState } from "react";
import Img from "@/assets/img.png";
import { AnimatePresence, motion } from "framer-motion";
const memoryItems = [
  { title: "복원 이전" as const },
  { title: "1반" as const },
  { title: "2반" as const },
  { title: "3반" as const },
  { title: "4반" as const },
  { title: "5반" as const },
  { title: "6반" as const },
  { title: "7반" as const },
  { title: "8반" as const },
  { title: "9반" as const },
  { title: "10반" as const },
  { title: "교무실" as const },
];

const MemoryClass = () => {
  const [selected, setSelected] = useState(0);
  const Description = memorySummaryComponents[memoryItems[selected].title];
  return (
    <MemoryShell>
      <MemoryHeader>
        <H1>단원고 4.16기억교실</H1>
        <MemoryClassNav>
          {memoryItems.map((item, index) => (
            <MemoryClassButton
              onClick={() => setSelected(index)}
              selected={index === selected}
              key={item.title}
            >
              {item.title}
            </MemoryClassButton>
          ))}
        </MemoryClassNav>
      </MemoryHeader>
      <AnimatePresence mode="wait">
        <MemoryClassContent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={memoryItems[selected].title}
        >
          <MemoryClassContentImage>
            <ImageX src={Img} />
          </MemoryClassContentImage>
          {Description}
        </MemoryClassContent>
      </AnimatePresence>
    </MemoryShell>
  );
};

export default MemoryClass;

const MemoryClassNav = styled.nav`
  display: flex;
  row-gap: 0.8rem;
  column-gap: 1.54rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
`;
const MemoryClassButton = styled.button<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.12rem;
  font-weight: 800;
  width: 9.2rem;
  height: 2.6rem;
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border};
  border-width: 0.15rem;
  border-style: solid;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;
  border-color: ${(props) =>
    props.selected ? props.theme.color.yellow : "white"};
  color: ${(props) => (props.selected ? props.theme.color.yellow : "white")};
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
  padding-bottom: 2rem;
  & + div {
    padding-top: 2rem;
    border-top: 0.08rem solid rgba(255, 255, 255, 0.5);
  }
`;

const MemoryClassContentDescription = styled.article`
  overflow-y: scroll;
`;

const DescriptionContent = styled(P3)`
  color: white;
  text-align: start;
  font-weight: 400;
`;

const DescriptionTitle = styled.h1`
  font-size: calc(var(--font-size) * 1.4);
  font-family: "Pretendard";
  color: ${(props) => props.theme.color.yellow};
  line-height: 1;
`;
const MemoryClassContentImage = styled.div`
  width: 19.36rem;
  padding: 0.4rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.8rem;
  flex-shrink: 0;
`;
const MemoryClassContent = styled(motion.div)`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  height: 18.32rem;
`;

const MemoryHeader = styled.div`
  text-align: center;
`;

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.6rem;
  justify-content: space-between;
`;
const memorySummaryComponents: {
  [key in (typeof memoryItems)[number]["title"]]: ReactNode;
} = {
  "복원 이전": (
    <MemoryClassContentDescription>
      <DescriptionWrapper>
        <DescriptionTitle>단원고 4.16기억교실 이전,복원 경과</DescriptionTitle>
        <DescriptionContent>
          {`2016. 5. 9. <4.16안전교육 시설 건립을 위한 협약> 체결
협약기관 4.16세월호참사가족협의회, 경기도교육청, 경기도청, 경기도의회, 안산시, 안산교육지원청, 단원고등학교(7개 기관)`}
        </DescriptionContent>
      </DescriptionWrapper>
      <DescriptionWrapper>
        <DescriptionTitle>최초이전</DescriptionTitle>
        <DescriptionContent>
          <strong>단원고 - 구 안산교육지원청 별관</strong>
          <br />
          2016. 8. 20 ~ 2016. 8. 21
          <br />
          1층 기억교실 4실(2-1반 ~ 2-4반)
          <br />
          2층 기억교실 6실(2-5반 ~ 2-10반), 기억교무실
          <br />
          <br />
          2016. 11. 21 ~
          <br />
          기억교실 개방
        </DescriptionContent>
      </DescriptionWrapper>
      <DescriptionWrapper>
        <DescriptionTitle>임시이전</DescriptionTitle>
        <DescriptionContent>
          <strong>구 안산교육지원청 별관 - 구 안산교육지원청 본관</strong>
          <br />
          2018. 9. 15 ~ 2018. 9. 16
          <br />
          2층 기억교실 6실(2-1반 ~ 2-6반)
          <br />
          3층 기억교실 4실(2-7반 ~ 2-10반), 기억교무실
          <br />
          <br />
          2018. 8. 17
          <br />
          기억교실 재개방
        </DescriptionContent>
      </DescriptionWrapper>
      <DescriptionWrapper>
        <DescriptionTitle>복원이전</DescriptionTitle>
        <DescriptionContent>
          <strong>구 안산교육지원청 본관 - 4.16민주시민교육원 기억관</strong>
          <br />
          2020. 12. 14
          <br />
          2층 기억교실 4실(2-7반 ~ 2-10반), 기억교무실
          <br />
          3층 기억교실 6실(2-1반 ~ 2-6반)
          <br />
          <br />
          2021. 4. 12
          <br />
          <strong>기억교실 정식 오픈</strong>
        </DescriptionContent>
      </DescriptionWrapper>
    </MemoryClassContentDescription>
  ),
  "1반": (
    <MemoryClassContentDescription>
      <DescriptionContent>
        2학년 1반은 여학생반입니다. 37명의 학생이 수학여행을 떠나 18명의 학생이
        희생되고, 19명의 학생이 돌아왔습니다. 1반은 단원고 10개 반 중 가장 많은
        학생이 살아 돌아온 반입니다. 오늘 교실에서 보실 책상 중 빈 책상은
        살아돌아온 아이들의 책상이고, 물건이 놓인 책상은 돌아오지 못한 아이들의
        책상입니다. 놓여있는 물품들은 보고 만져도 되지만 모두 실제 물품이니
        소중하게 지켜주세요.
        <br /> 살며시 의자에 앉아, 기억노트에 메시지를 작성해주세요. 또, 책상
        우측에 있는 QR코드를 통해 아이들과 선생님들의 이야기를 더 보실 수
        있습니다.
        <br />
        <br /> 세월호 참사 당시 텅 비어 버린 단원고 2학년 교실에는 아이들이 쓰던
        공책과 필통. 그리고 시민들이 책상 위에 남긴 메시지와 하얀 국화꽃이
        피어나고 있었습니다. 수학여행 간 아이들의 무사 귀환을 간절히 기다리던
        부모들은 아들딸의 책상과 의자를 끌어안아야 했습니다.
        <br /> 평범한 고등학생들의 일상이 담겨있던 10개의 교실은 그날 이후,
        세월호 참사의 현장이자 증거가 되었습니다. ‘보고싶고 사랑한다’는 말들이
        빼곡히 적혀 있는 칠판, ‘빨리 돌아오라’는 포스트잇으로 도배된 창문,
        말갛게 웃고 있는 아이들의 사진과 꽃, 편지, 간식들이 수북이 쌓인 책상.
        <br />
        시간이 멈춘 교실에는 아이들의 온기를 품은 듯한 햇볕이 위로처럼 내려앉아
        있었습니다.
        <br /> 1반 교실에는 아이들이 직접 만들어서 사용한 달력이 복도쪽 벽에
        걸려있습니다. 그림을 그리고 하나하나 색종이를 오려서 정성스럽게 만든
        달력에는 학교 일정과 친구들의 생일이 또박또박 적혀 있습니다. 특히 가장
        큰 글씨로 적힌 ‘수학여행’ 글자를 보면, 아이들이 얼마나 그 시간을 설레는
        마음으로 기다렸을지가 느껴집니다.
        <br /> 뒤쪽 게시판에는 반 아이들의 생일을 캐릭터 보드게임판으로 귀엽게
        만들어 놓은 판넬이 눈에 띕니다. 색종이로 섬세하게 오려서 만든 리락쿠마,
        루피, 올라프 등의 캐릭터를 보며, 좋아하는 것들이 차고 넘쳤던 1반
        아이들의 취향을 떠올려봅니다.
        <br />
        <br />
        또, 1반 사물함 위 꽃무늬 시트지에서 당시 학교 친구들과 유니나 선생님의
        제자들이 남긴 메시지를 볼 수 있습니다. 제발 돌아와 달라는 애원, 대학
        합격했다는 소식, 꿈에 나와달라는 부탁, 사랑한다는 말들이 안타깝게 내려
        앉아있습니다.
        <br /> 이곳에 함께 모여 그림을 그리고 종이를 자르며, 설레는 마음으로
        교실을 장식하던 18명의 소녀들을 떠올려 봅니다. 1분단부터 차례대로 눈을
        마주쳐 주세요.
        <br />
        <br />
        정의로운 시선으로 자기 몫을 아낌없이 나누는 박성빈
        <br />
        커다란 눈망울의 엉뚱한 정리요정 김수진
        <br />
        귀여운 잔소리 가득한 편지로 가족을 웃게 하는 우소영
        <br />
        어떤 일이든 당차게 척척 해내는 막내 김영경
        <br />
        일본어 교사를 꿈꾸는 카툰 습작생 김현정
        <br />
        좋아하는 것이 분명해 자기 삶의 주인공이 되고 싶은 김예은
        <br />
        세상에서 엄마를 가장 좋아하던 수학 천재 조은화
        <br />
        집안일을 기쁘게 도맡아 하던 따뜻한 고해인
        <br />
        뛰어난 손재주로 가족을 위해 요리하는 김민희 그림 그리기를 좋아하는
        자유로운 영혼의 김주아
        <br />
        아빠를 우주 끝까지 사랑한다고 말하는 김민지
        <br />
        명랑하고 다정하던 속 깊은 넷째딸 문지성
        <br />
        다정한 미소로 유치원 교사를 꿈꾸는 정가현
        <br />
        소수의 마음도 살필 줄 알았던 세심한 리더 유미지
        <br />
        내면의 흥으로 남자 아이돌 춤도 거뜬히 소화하는 이수연
        <br />
        씩씩하고 큰 목소리로 주변을 행복하게 만드는 김수경
        <br />
        자기 몫의 세상을 당당하게 펼쳐나가는 이연화
        <br />
        카메라에 담긴 세상을 정성껏 편집하는 한고운
        <br />
        세상에 단 한 사람밖에 없는 유일한 딸, 친구, 언니, 동생, 제자였던
        아이들의 존재를 기억해봅니다.
        <br />
        다음 안내는 좌측 2반 교실 버튼을 눌러주시고,
        <br />
        돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
      </DescriptionContent>
    </MemoryClassContentDescription>
  ),
  "2반": <></>,
  "3반": <></>,
  "4반": <></>,
  "5반": <></>,
  "6반": <></>,
  "7반": <></>,
  "8반": <></>,
  "9반": <></>,
  "10반": <></>,
  교무실: <></>,
};
