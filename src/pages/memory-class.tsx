/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import ImageX from "@/components/ui/image";
import { H1, P3 } from "@/components/ui/text";
import styled from "@emotion/styled";
import { ComponentType, useEffect, useState } from "react";
import classImg from "@/assets/images/classinfo";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  motion,
  useAnimate,
} from "framer-motion";
import { css } from "@emotion/react";
import { useSettingStore } from "@/contexts/setting.store";
import PreloadVideo from "@/components/ui/preload-video";
import { classSign } from "@/assets/videos";
import { useA11y } from "@/hooks/use-a11y";

const memoryItems = [
  { title: "기억교실 연혁" as const, sign: classSign.history, a11y: "c_time" },
  { title: "1반" as const, sign: classSign.class1, a11y: "c_01" },
  { title: "2반" as const, sign: classSign.class2, a11y: "c_02" },
  { title: "3반" as const, sign: classSign.class3, a11y: "c_03" },
  { title: "4반" as const, sign: classSign.class4, a11y: "c_04" },
  { title: "5반" as const, sign: classSign.class5, a11y: "c_05" },
  { title: "6반" as const, sign: classSign.class6, a11y: "c_06" },
  { title: "7반" as const, sign: classSign.class7, a11y: "c_07" },
  { title: "8반" as const, sign: classSign.class8, a11y: "c_08" },
  { title: "9반" as const, sign: classSign.class9, a11y: "c_09" },
  { title: "10반" as const, sign: classSign.class10, a11y: "c_10" },
  { title: "교무실" as const, sign: classSign.teacher, a11y: "c_11" },
];

const MemoryClass = () => {
  const [selected, setSelected] = useState(0);
  const { signActivate, zoom } = useSettingStore(({ signActivate, zoom }) => ({
    signActivate,
    zoom,
  }));
  const [delaySignActive, setDelaySignActive] = useState(signActivate);
  const Description = memorySummaryComponents[memoryItems[selected].title];
  const [signRef, animate] = useAnimate();
  const videoSrc = memoryItems[selected].sign;
  useEffect(() => {
    async function toggleActive() {
      if (!signActivate && signRef.current) {
        await animate(
          signRef.current,
          {
            opacity: 0,
          },
          {
            duration: 0.5,
          }
        );
      }
      setDelaySignActive(signActivate);
    }
    toggleActive();
  }, [signActivate]);

  useA11y("class");
  return (
    <MemoryShell>
      <motion.div
        layout
        data-isopen={signActivate}
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
          transform-origin: right;
          padding-bottom: 2rem;
          &[data-isOpen="true"] {
            width: 100%;
          }
        `}
        transition={{
          type: "tween",
          ease: "linear",
        }}
      >
        <MemoryHeader>
          <H1>단원고 4.16기억교실</H1>
          <MemoryClassNav>
            {memoryItems.map((item, index) => (
              <MemoryClassButton
                data-a11y-id={item.a11y}
                layoutId={item.title}
                onClick={() => setSelected(index)}
                selected={index === selected}
                key={item.title}
              >
                {item.title}
              </MemoryClassButton>
            ))}
          </MemoryClassNav>
        </MemoryHeader>
        <LazyMotion features={domAnimation}>
          <AnimatePresence mode="wait">
            <MemoryClassContent
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={memoryItems[selected].title}
            >
              <MemoryClassContentImage
                css={css`
                  transform: scale(${zoom});
                `}
              >
                <MemoryClassImg src={classImg[selected]} />
              </MemoryClassContentImage>
              <Description />
            </MemoryClassContent>
          </AnimatePresence>
        </LazyMotion>
      </motion.div>
      {delaySignActive && videoSrc && (
        <motion.div
          key={videoSrc}
          ref={signRef}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              delay: 0.5,
            },
          }}
          transition={{
            type: "tween",
            ease: "linear",
          }}
          css={css`
            /* width: 36rem; */
            flex: 0 0 20rem;
            display: flex;
            flex-direction: column;
            height: 100%;
          `}
        >
          <PreloadVideo
            key={videoSrc}
            src={videoSrc}
            autoPlay
            muted
          ></PreloadVideo>
        </motion.div>
      )}
    </MemoryShell>
  );
};

export default MemoryClass;
const MemoryClassImg = styled(ImageX)`
  img {
    border-radius: 0.6rem;
    object-fit: cover;
  }
`;

const MemoryClassNav = styled.nav`
  display: flex;
  row-gap: 0.8rem;
  column-gap: 1.54rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
`;
const MemoryClassButton = styled(motion.button)<{ selected: boolean }>`
  font-family: "NanumSquareRoundOTF";
  font-size: calc(var(--font-size) * 1.12);
  font-weight: 800;
  width: 11rem;
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
  width: 100%;
  padding-right: 1rem;
  margin-left: 1rem;
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
const MemoryClassContent = styled(m.div)`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  height: 18.32rem;
`;

const MemoryHeader = styled.div`
  text-align: center;
`;

const MemoryShell = styled(MainShell)`
  /* flex-direction: column; */
  align-items: center;
  /* padding-bottom: 1.6rem; */
  column-gap: 1.2rem;
  justify-content: space-between;
`;
const memorySummaryComponents: {
  [key in (typeof memoryItems)[number]["title"]]: ComponentType;
} = {
  "기억교실 연혁": () => {
    useA11y("class_time");
    return (
      <MemoryClassContentDescription>
        <DescriptionWrapper>
          <DescriptionTitle>
            단원고 4.16기억교실 이전,복원 경과
          </DescriptionTitle>
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
    );
  },
  "1반": () => {
    useA11y("class_01");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          1반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 1반은 여학생반입니다. 37명의 학생이 수학여행을 떠나 18명의
          학생이 희생되고, 19명의 학생이 돌아왔습니다. 1반은 단원고 10개 반 중
          가장 많은 학생이 살아 돌아온 반입니다. 오늘 교실에서 보실 책상 중 빈
          책상은 살아돌아온 아이들의 책상이고, 물건이 놓인 책상은 돌아오지 못한
          아이들의 책상입니다. 놓여있는 물품들은 보고 만져도 되지만 모두 실제
          물품이니 소중하게 지켜주세요.
          <br /> 살며시 의자에 앉아, 기억노트에 메시지를 작성해주세요. 또, 책상
          우측에 있는 QR코드를 통해 아이들과 선생님들의 이야기를 더 보실 수
          있습니다. 세월호 참사 당시 텅 비어 버린 단원고 2학년 교실에는 아이들이
          쓰던 공책과 필통. 그리고 시민들이 책상 위에 남긴 메시지와 하얀
          국화꽃이 피어나고 있었습니다. 수학여행 간 아이들의 무사 귀환을 간절히
          기다리던 부모들은 아들딸의 책상과 의자를 끌어안아야 했습니다.
          <br /> 평범한 고등학생들의 일상이 담겨있던 10개의 교실은 그날 이후,
          세월호 참사의 현장이자 증거가 되었습니다. ‘보고싶고 사랑한다’는 말들이
          빼곡히 적혀 있는 칠판, ‘빨리 돌아오라’는 포스트잇으로 도배된 창문,
          말갛게 웃고 있는 아이들의 사진과 꽃, 편지, 간식들이 수북이 쌓인 책상.
          <br />
          시간이 멈춘 교실에는 아이들의 온기를 품은 듯한 햇볕이 위로처럼
          내려앉아 있었습니다.
          <br /> 1반 교실에는 아이들이 직접 만들어서 사용한 달력이 복도쪽 벽에
          걸려있습니다. 그림을 그리고 하나하나 색종이를 오려서 정성스럽게 만든
          달력에는 학교 일정과 친구들의 생일이 또박또박 적혀 있습니다. 특히 가장
          큰 글씨로 적힌 ‘수학여행’ 글자를 보면, 아이들이 얼마나 그 시간을
          설레는 마음으로 기다렸을지가 느껴집니다.
          <br /> 뒤쪽 게시판에는 반 아이들의 생일을 캐릭터 보드게임판으로 귀엽게
          만들어 놓은 판넬이 눈에 띕니다. 색종이로 섬세하게 오려서 만든
          리락쿠마, 루피, 올라프 등의 캐릭터를 보며, 좋아하는 것들이 차고 넘쳤던
          1반 아이들의 취향을 떠올려봅니다.
          <br />
          또, 1반 사물함 위 꽃무늬 시트지에서 당시 학교 친구들과 유니나 선생님의
          제자들이 남긴 메시지를 볼 수 있습니다. 제발 돌아와 달라는 애원, 대학
          합격했다는 소식, 꿈에 나와달라는 부탁, 사랑한다는 말들이 안타깝게 내려
          앉아있습니다.
          <br /> 이곳에 함께 모여 그림을 그리고 종이를 자르며, 설레는 마음으로
          교실을 장식하던 18명의 소녀들을 떠올려 봅니다. 1분단부터 차례대로 눈을
          마주쳐 주세요.
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
          <br />
          다음 안내는 좌측 2반 교실 버튼을 눌러주시고,
          <br />
          돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "2반": () => {
    useA11y("class_02");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          2반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 2반은 여학생반입니다.
          <br />
          36명의 학생이 수학여행을 떠나(배를 탄) 25명의 학생이 희생되고, 11명의
          학생이 돌아왔습니다.
          <br />
          참사 발생 2년 후. 단원고 4.16기억교실은 단원고등학교의 정상화를 위해
          원래 학교를 떠나 축소된 공간으로 임시 이전하게 되었습니다.
          <br />
          교실 이전을 앞두고 유가족들은 책상 위 아이의 유품을 손수 상자에
          담았습니다. 아이들의 체취와 숨결이 머물던 단원고 2학년 교실은 그렇게
          사라지게 되었습니다.
          <br />
          세월호 참사의 현장이자 흔적이었던 교실을 새로운 교육을 위한 현장으로
          만들기 위한 유가족과 시민들의 노력으로 세 번의 이사 끝에 현재의
          4.16민주시민교육원 기억관에 터를 잡게 되었습니다.
          <br />
          아이들이 쓰던 교실을 완벽하게 복원하기 위해 4.16기억저장소는 책걸상은
          물론 단원고의 창문틀, 문틀, 몰딩 등 하나하나까지 그대로 옮겨와 현재는
          예전 단원고 시절의 모습을 온전히 되찾았습니다.
          <br />
          교실 뒤쪽 게시판을 보면 2반 친구들의 정겨운 단체사진을 크게 프린트한
          판넬이 눈에 띕니다. 손가락으로 브이를 그리고, 꽃받침을 하며 카메라를
          바라보는 아이들의 눈동자에는 2학년 생활에 대한 기대와 설렘이
          어려있습니다.
          <br />
          사진 안에 ‘서로를 존중하는 완소2반’이란 글자를 보면, 소중하고 귀하기만
          했던 아이들과 빛나던 한 시절이 스쳐 지나갑니다. 담임 전수영 선생님은
          교실 뒤에 ‘칭찬합시다’ 게시판을 만들어 아이들이 반을 위해 배려했던
          내용을 적도록 했습니다.
          <br />
          책걸상과 사물함에 이름표를 붙인 아이들을 칭찬하고, 재활용 분리수거를
          했던 아이와 교실 문단속을 했던 아이를 칭찬한 이력이 남아있습니다.
          아이들은 이 게시판을 통해 서로를 배려하는 방법을 배웠을 것입니다.
          <br />
          따뜻하고 엉뚱하고 반짝이는 유머가 넘치던 2반 25명 아이들의 이름과
          얼굴을 떠올려 봅니다.
          <br />
          춤추고 노래하며 주변을 무장해제 시키는 박혜선
          <br />
          따뜻하고 깊은 마음으로 카메라를 메고 달리는 김수정
          <br />
          선하고 순수한 마음을 가진 봄날의 햇살 양온유
          <br />
          인내심과 승부욕으로 미래를 연출하는 PD 박정은
          <br />뭘 하든 최선을 다해야 직성이 풀리는 미래의 역사학자 남수빈
          <br />
          자연스러운 유머와 웃음으로 주변을 반짝이게 하는 남지현
          <br />
          아이들을 보면 행복해지던, 장갑처럼 따뜻한 사람 윤민지
          <br />
          엄마아빠 생일에 미역국까지 끓여주던 살림꾼 강수정
          <br />
          디즈니 만화를 좋아하는 우아한 4차원 소녀 길채원
          <br />
          수화통역사로 필요한 사람에게 힘이 되고 싶은 조서우
          <br />
          춤도 공부도 기도도 매일 최선을 다하는 전하영
          <br />
          그림 그리기를 좋아해 아름다운 옷을 만들고 싶은 김민지
          <br />
          친구 같던 엄마와 긴 편지로 사랑을 나누는 정지아
          <br />책 읽고 상상하기를 즐기는 몰입의 장인 김주희
          <br />
          축구 보는 것을 좋아하고 달리기를 잘하는 강우영
          <br />매 순간 다가오던 것들을 기쁘게 즐기는 한세영
          <br />
          역사와 신화를 좋아하는 남다른 패션감각의 소유자 허유림
          <br />
          애교 많은 미래의 메이크업아티스트 이혜경
          <br />
          뭐든 알아서 척척 움직이는 선량하고 속 깊은 김지윤
          <br />
          많은 사람과 나누는 삶을 꿈꾸는 자기관리의 여왕 박주희
          <br />
          활발하고 털털한 성격으로 경찰을 꿈꾸는 윤솔
          <br />책 읽는 것을 좋아하고, 소설 쓰는 것을 좋아하는 당당한 아이
          송지나
          <br />
          만화가를 꿈꾸며 일본 유학까지 계획한 김소정
          <br />
          춤과 노래를 즐기며 유치원 교사를 꿈꾸는 허다윤
          <br />
          예쁜 손글씨로 빵 이름을 쓰며 제과제빵을 배우는 오유정
          <br />
          아이들 한 명 한 명의 꿈과 이야기들을 오래 기억해봅니다. <br />
          <br />
          다음 안내는 좌측 3반 교실 버튼을 눌러주시고, <br />
          돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "3반": () => {
    useA11y("class_03");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          3반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 3반은 여학생반입니다. 34명의 학생이 수학여행을 떠나 26명의
          학생이 희생되고, 8명의 학생이 돌아왔습니다.
          <br />
          벚꽃이 피던 4월에 아이들은 흥겹게 어우러져서 함께 사진을 찍고 춤을
          추면서 봄날의 교정을 노래했습니다.
          <br />
          책상에 놓여있는 사진 속에서 아이들은 마치 어제 이 교실에서 노래를
          흥얼거리던 것처럼 명랑하고 해맑게 카메라를 바라보고 브이를 그립니다.
          똑같은 교복을 입었지만 취한 자세는 모두 제각각입니다. 누워있는 아이,
          친구 등에 업힌 아이, 바닥에 주저앉아있는 아이들이 벚꽃보다 더 밝고
          다채롭게 빛납니다. 장난꾸러기와 끼쟁이들이 많아서 경쾌하던 3반
          교실에는 이제 아이들의 수다와 웃음소리 대신 긴 침묵과 깊은 그리움, 갈
          곳 잃은 수백 개의 이야기만이 남아 있습니다.
          <br />
          교실 뒤쪽 게시판에는 3반 친구들이 담임 김초원 선생님을 위해 준비했던
          편지선물이 줄줄이 사탕처럼 매달려 있습니다. 마침 4월16일이 생일이었던
          김초원 선생님을 생각하며 아이들은 2014년 당일 자정에 깜짝 생일파티를
          준비했습니다. 케이크도 직접 만들고, 선생님께 잘 어울릴 액세서리도 미리
          골라두고, 두근두근한 마음으로 서프라이즈 파티를 기다렸을 아이들 모습이
          그려집니다.
          <br />
          원래 반 아이들이 마음을 담아 정성껏 쓴 이 편지꾸러미는 배 안에서
          전달할 예정이었습니다. 하지만 편지를 교실에 남겨 둔 채 수학여행을
          떠나게 되었고, 그렇게 남아 있는 34개의 편지들은 오래 담아두고 기억할
          이야기로 교실에 영원히 남았습니다.
          <br />
          이날 밤 선실에서 3반 아이들은 케이크를 들고 있는 담임선생님과 함께
          단체 사진을 남겼습니다. 김초원 선생님은 감동을 받아 빨개진 눈으로 활짝
          웃고 있고, 아이들은 3반의 트레이드마크 같은 피스 포즈를 취하며 잊지
          못할 수학여행 추억에 만족한 얼굴입니다.
          <br />
          이 교실에서 시끌벅적하게 깜짝 생일파티를 준비하며 한껏 신나 있었을 3반
          아이들의 얼굴을 떠올려 봅니다.
          <br />
          아빠와 친구처럼 지내며 패션디자이너를 꿈꾸는 박채연
          <br />
          누구를 만나든 당당하고 친절한 동글동글 동글이 김도언
          <br />
          일본의 역사 왜곡을 알리고 싶어 역사교사를 꿈꾸는 전영수
          <br />
          개구쟁이 표정으로 자유롭고 용감한 음악을 만드는 김시연
          <br />
          뮤지컬 배우를 꿈꾸며 후회 없이 최선을 다해 사는 유예은
          <br />
          좋아 하는 것, 중요한 것, 해야 할 것들을 똑부러지게 해내는 김담비
          <br />
          친구들을 아우르던 의리 있는 리더 유혜원
          <br />
          터프한 행동 속에 따뜻한 마음을 품은 장주이
          <br />
          엄마와 밤새 수다 떠는 것과 그림 그리기를 좋아하는 황지현
          <br />
          털털한 성격으로 많은 친구들의 사랑을 받는 최수희
          <br />
          자기 할 일을 척척 해내는 든든한 딸 박지우
          <br />
          겉도 속도 하얀 눈사람 같은 김수경
          <br />
          예쁜 것들을 좋아했지만 작은 체구로 뭐든 잘 먹는 최윤민
          <br />
          호기심이 많아서 배움에 두려움 없는 김지인
          <br />
          독학으로 배운 그림으로 사람들을 놀라게 하는 박지윤
          <br />
          감각있는 장식품과 액세서리를 직접 만드는 금손 김주은
          <br />
          용감하고 활달한 성격으로 무대 위의 모습을 꿈꾸는 정예진
          <br />
          알뜰살뜰 동생을 챙기던 속 깊은 큰딸 박영란
          <br />
          군인이 되고 싶은 주황색 덕후 이지민
          <br />
          빛나는 재능으로 우아한 구두를 디자인하는 박예슬
          <br />
          장학금으로 기쁘게 부모님 여행을 보내드린 신승희
          <br />
          연기자를 꿈꾸는 야무지고 사랑스러운 큰딸 김빛나라
          <br />
          강한 의지로 공부하며 당당하게 빛을 발하는 김소연
          <br />
          추리물을 즐겨보며 타인을 돕는 경찰관이 되고 싶은 백지숙
          <br />
          남자아이돌을 좋아하는 사려 깊은 막내 김영은
          <br />
          산책을 좋아하고 글짓기를 잘하는 한은지
          <br />
          각자의 개성과 목소리로 교실을 꽉 채운 26명 아이들의 꿈과 삶을 오래
          기억해 봅니다.
          <br />
          <br />
          다음 안내는 4반 앞에서 진행됩니다.
          <br />
          다음 안내는 좌측 4반 교실 버튼을 눌러주시고,
          <br />
          돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "4반": () => {
    useA11y("class_04");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          4반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 4반은 남학생반입니다.
          <br />
          37명의 학생이 수학여행을 떠나 28명의 학생이 희생되고 9명의 학생이
          돌아왔습니다.
          <br />
          2014년 4월 16일 오전 8시 49분, 세월호가 왼쪽으로 45도 기울어집니다.
          <br />
          배가 45도로 기울면 복원이 어려우므로 빠르게 퇴선 조치를 해야 합니다.
          <br />
          세월호 4층 좌우에는 탈출을 위한 비상대기 갑판이 있었지만 배 안에서는
          ‘위험하니 현재 자리에서 대기하라’는 방송이 나왔습니다.
          <br />
          특히 ‘단원고 학생들은 절대로 움직이지 말라’고까지 했습니다. 결국,
          아이들은 뒤늦게 육지로 올라왔고 가족들이 아이들을 만난 장소는
          ‘팽목항’이었습니다.
          <br />
          팽목항은 세월호 침몰 소식을 들은 국민들이 한 마음으로 달려와 간절한
          바람을 보냈던 곳입니다.
          <br />
          2014년 4월 16일부터 세월호가 인양되기 시작한 2017년 3월까지 이 곳에는
          미수습자 가족들이 머무르고 있었습니다. 인양 이후에는 목포로 옮겨가게
          되어 팽목항의 텐트나 가건물은 철거되었지만, 컨테이너 박스에 꾸려진
          <br />
          ‘팽목 기억관’이 시민들이 찾을 수 있는 분향소이자 기억관의 역할을 하고
          있습니다.
          <br />
          친구들과 서로 의지하며 가만히 있으라는 방송을 듣고 기다리던 2학년 4반
          아이들의 이름을 불러봅니다.
          <br />
          ‘안 먹으면 안 돼지’라는 상호까지 준비한 미래의 고깃집 사장 안준혁
          <br />
          축구만큼 역사 공부에 푹 빠진 김정현
          <br />
          언제든 좋아하는 일이 생길 거라며 꿈 찾기에 바쁜 김웅기
          <br />
          검사였다 변호사였다 이제는 가수가 되고 싶은 꿈부자 임경빈
          <br />
          ‘굴곡 없이 행복하게 살기’라는 인생목표를 세운 임요한
          <br />
          아버지와 함께 하는 농구를 즐기는 김동혁
          <br />
          퇴근하는 아빠를 포옹으로 맞이하는 애교쟁이 정차웅
          <br />
          신맛 짠맛을 기가 막히게 구분하는 타고난 맛 감별사 강혁
          <br />
          형을 너무 좋아해 형 따라 무엇이든 배우는 동생 김범수
          <br />
          체육관에서 땀 흘리며 운동하는 것이 좋은 권오천
          <br />
          라면을 좋아하고 잘 끓여서 별명도 ‘진라면’인 진우혁
          <br />
          여덟 시에 보는 벚꽃이 가장 아름답다는 작가 지망생 최성호
          <br />
          나 혼자 세계여행을 비롯해 버킷리스트가 꽉 찬 박수현
          <br />
          친구들이 인정한 만화가, 그림 실력으로 음악밴드 멤버가 된 홍순영
          <br />
          드럼도 배우고 합기도 수련도 하는 몸 튼튼 마음 튼튼 한정무
          <br />
          운동도 음악도 공부도 골고루 잘하는 김호연
          <br />
          마술사가 되고 싶어 먼 길 오가며 연습하는 김용진
          <br />
          록밴드 ‘GreenDay’처럼 소울 있는 노래를 만들고 싶은 강승묵
          <br />
          수영선수 시절 다져진 몸매로 모델을 준비하는 슬라바
          <br />
          책 읽기와 글쓰기를 좋아하는 작가지망생 김윤수
          <br />
          스케치북과 연필만 있으면 OK, 그림 그리는 게 제일 좋은 빈하용
          <br />
          족발, 피자, 통닭, 먹고 싶은 것이 많은 만큼 마음 씀씀이도 넉넉한 강신욱
          <br />
          농구를 즐기는 중국어 능력자 안형준
          <br />
          토마토 파스타를 맛있게 만드는 박정훈
          <br />
          자동차 디자이너가 되기 위해 열심히 그림 그리는 정휘범
          <br />
          아빠를 꼭 빼닮은 멋쟁이 패셔니스타 장진용
          <br />
          아픈 엄마를 위해 요리를 배우러 다니는 김건우
          <br />
          필리핀 무술 칼리 아르니스 사범이 되고 싶은 김대희
          <br />
          배움과 성장을 즐기는 2학년 4반 스물여덟 명의 친구들을 기억합니다.
          <br />
          <br />
          다음 안내는 좌측 5반 교실 버튼을 눌러주시고,
          <br />
          돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "5반": () => {
    useA11y("class_05");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          5반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 5반은 남학생반입니다.
          <br />
          36명의 학생이 수학여행을 떠나 27명의 학생이 희생되고 9명의 학생이
          돌아왔습니다.
          <br />
          <br />
          5반에는 뇌종양으로 인해 수학여행을 가지 못한 한 아이가 있습니다.
          <br />
          수학여행을 떠나기 전, 5반 담임 선생님과 친구들은 큰 수술을 견뎌낸 이
          아이를 찾아가 “함께 못 가 미안하고,
          <br />
          완쾌되기를 빈다”는 말을 전했습니다.
          <br />
          며칠 후, 친구들이 수학여행에서 돌아오지 못했다는 소식을 들어야 했던 이
          아이는 한동안 말을 잃었고, 이듬해,
          <br />
          늘 그리워했던 친구들 곁으로 떠났습니다.
          <br />
          2학년 5반 교실에는 없는 것이 하나 있습니다.
          <br />
          바로, 커튼입니다.
          <br />
          2학년 5반과 6반은 특별활동교실이었기 때문에 다른 반 교실과 달리 복도
          쪽 창이 작고 커튼 대신 암막 블라인드가 설치되어 있습니다.
          <br />
          또한 2학년 5반 교실을 둘러보면 ‘모두가 주인 되는 2학년 5반’ 게시물과,
          ‘2학년 5반의 학급규칙’ 판넬을 발견할 수 있는데요.
          <br />
          반장, 부반장, 서기, 총무와 같은 기본적인 역할 뿐만 아니라 학급에
          필요한 다양한 역할이 세심하게 나눠져 있습니다.
          <br />
          이런 약속들을 만들기 위해 머리를 맞대고 회의했을 2학년 5반 아이들의
          모습을 하나하나 떠올려 봅니다.
          <br />
          헤어디자이너를 꿈꾸며 엄마의 머리를 손질해 준 이홍승
          <br />
          달콤하고 부드러운 빵을 친구들과 나눌 줄 아는 천인호
          <br />
          친구들 사이에서 ‘의리’하면 떠오르는 아이 이창현
          <br />
          그림 그리기에 남다른 재주가 있는 애교 많은 동생 인태범
          <br />
          부드럽고 온화한 성격에 운동까지 잘하는 반전매력 이진환
          <br />
          세계를 누비는 관광가이드가 되고 싶은 만화왕 이석준
          <br />
          역사에 관심이 많고 볼링부원으로 활동한 김성현
          <br />
          멋지게 옷을 입을 줄 아는 향긋한 바리스타 박준민
          <br />
          경호원이 되겠다는 목표에 한 걸음씩 다가가는 문중식
          <br />
          ‘평화와 정의를 실현하는 삶을 살고 싶다’는 좌우명의 박성호
          <br />
          리더십 있고 운동을 좋아하는 작은 김건우
          <br />
          친구 같은 엄마를 살뜰히 챙기며 청년 복지사를 꿈꾼 정이삭
          <br />
          자신의 미래를 스스로 준비하던 용기 있는 김한별
          <br />
          정 많고 반듯해 가는 길에 많은 사람의 배웅을 받은 최민석
          <br />
          손으로 조립하는 것을 잘 하고 동물을 좋아하는 김인호
          <br />
          친구들의 고민상담사이자 합기도에 푹 빠진 김진광
          <br />
          독학으로 피아노를 익힌 음악 천재 김도현
          <br />
          무언가 고장 나면 뚝딱 고치는 해결사 큰 김건우
          <br />
          ‘노력하며 살자!’라는 목표를 가진 김민석
          <br />
          넘치는 끼와 명랑함이 트레이드마크인 서동진
          <br />
          다이아몬드 태몽으로 세상에 온 빛나는 남자 최남혁
          <br />
          자신을 믿어주는 엄마의 사랑을 동생들에게도 보여준 조성원
          <br />
          모두에게 다정해 주변에서 인기 짱인 박홍래
          <br />
          수요일 아침마다 2학년 5반을 깔끔하게 정리했을 박진리
          <br />
          곰인형 네 개에 사랑하는 가족의 별명을 붙여준 오준영
          <br />
          운동신경이 뛰어나고 배려가 몸에 배어있는 김민성
          <br />
          친구들을 모아 새벽에 재미난 일들을 벌이는 김완준
          <br />
          아이들의 이름을, 세상에 머무르던 날들을 기억하겠습니다.
          <br />
          <br />
          다음 안내는 좌측 6반 교실 버튼을 눌러주시고,
          <br />
          돌아가려면 좌측 하단 메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "6반": () => {
    useA11y("class_06");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          6반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 6반은 남학생반입니다.
          <br />
          38명의 학생이 수학여행을 떠나 25명의 학생이 희생되고 13명의 학생이
          돌아왔습니다.
          <br />
          6반에는 침몰하는 세월호 안에서 “배가 가라앉고 있다”고 119에 최초로
          신고한 아이가 있습니다.
          <br />
          당시 소방본부는 신고전화를 해경과 연결해 상황을 공유했는데 해경은
          신고자가 탑승객이라고 했음에도 반복적으로 위도와 경도를 물었습니다.
          <br />
          또한 근처에 있던 유조선과 인근 어민들의 대기에도 불구하고 선원도,
          해경도, 그 누구도 탑승객들에게 뛰어내리라는 명령을 하지 않았습니다.
          <br />
          6반은 끝내 가족의 품으로 돌아오지 못한, 미수습자가 된 두 아이가 있는
          반이기도 합니다.
          <br />
          1분단 맨 앞줄의 박영인 학생과 2분단 맨 뒷줄의 남현철 학생입니다.
          <br />
          부모님들은 영인이가 갖고 싶어 했던 축구화, 현철이가 즐겨 연주하던
          기타를 팽목항에 갖다 놓으며 간절하게 기다렸지만 두 아이는 인양된
          세월호에서도 발견되지 않았습니다.
          <br />
          세월호가 인양된 후, 6반이 있던 4층 선수 부분에서 영인이의 교복 상의가
          발견되었지만 결국 유해는 찾지 못했습니다.
          <br />
          가족들은 2017년 11월 20일, 참사 발생 1,315일만에 편지와 유품을 모아 두
          아이를 하늘로 보내주었습니다.
          <br />
          이 교실에 서서, 수학여행에서 돌아오면 하고 싶은 일이 많았을 2학년 6반
          25명의 친구를 떠올려 봅니다.
          <br />
          축구, 야구는 물론 다양한 운동을 좋아하는 볼링부원 박영인 <br />
          &lt;사랑하는 그대여&gt;라는 따뜻한 노래를 남긴 이다운
          <br />
          선한 미소와 밝은 기운으로 주변 사람을 무장해제 시켜버린 이영만
          <br />
          그래픽 디자이너를 꿈꾸며 깎은 몽당연필의 주인 이건계
          <br />
          무대 위라면 무엇이든 될 수 있는 연극부원 김동협
          <br />
          좋아하는 일에는 온 힘을 다할 줄 아는 패션 디자이너 이장환
          <br />
          말과 글, 책을 사랑해 국어 교사가 되고 싶은 신호성
          <br />
          그림을 잘 그려 실내 건축 디자이너라는 꿈이 생긴 김승혁
          <br />
          법관이 되어 평등한 세상을 위한 나만의 역할을 하고 싶은 홍종영
          <br />
          도움이 필요한 사람에게 꼭 손을 내밀곤 하는 가족 바라기 정원석
          <br />
          교실 앞자리에서 빛나는 눈으로 수업에 집중했을 김동영
          <br />
          엄마가 처음으로 쓴 손편지와 함께 생일에 수학여행을 떠난 전현탁
          <br />
          헤어 디자이너를 꿈꾸며 자기 머리를 직접 손질한 김승환
          <br />
          기타 연주, 글쓰기를 좋아하고 멋지게 해내는 남현철
          <br />
          공인 2단의 검도실력을 뽐내는 멋진 경호원을 꿈꾼 최덕하
          <br />
          세계 곳곳에 있을 내 모습을 상상하며 외교관을 꿈꾼 서재능
          <br />
          운동이 취미이자 특기인, 영원한 누나들의 ‘황만두’, 황민우
          <br />
          영어를 재미있어하는 온 가족의 라면요리사 박새도
          <br />
          사랑하는 가족들을 위해 시작한 요리가 꿈으로 발전한 이태민
          <br />
          예쁜 짓만 골라하는 아들이자 동생이자 친구인 권순범
          <br />
          웃음도 장난기도 많아 가족과 친구들을 웃게 만들어준 김승태
          <br />
          회계사라는 꿈을 향해 공부에 열의가 생긴 이세현
          <br />
          성공한 사업가가 되어 엄마에게 펜션을 선물하고 싶은 김민규
          <br />
          많은 곳을 여행하며 많은 경험을 해 ‘멋지게’ 살고 싶은 구태민
          <br />
          엄마의 든든한 버팀목이자 알아주는 축구 마니아 선우진
          <br />한 명 한 명이 품은 이야기들, 우리에게 남긴 질문들을 잊지
          않겠습니다.
          <br />
          <br />
          다음 안내는 좌측 7반 교실 버튼을 눌러주시고, 돌아가려면 좌측 하단 메뉴
          버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "7반": () => {
    useA11y("class_07");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          7반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 7반은 남학생반입니다.
          <br />
          33명의 학생이 수학여행을 떠나 32명의 학생이 희생되고 단 한 명의 학생이
          돌아왔습니다.
          <br />
          7반은 가장 많은 학생이 희생된 반이고, 세월호에서 마지막으로 탈출한
          학생이 있는 반입니다.
          <br />
          이 학생조차 해경이 구한 것이 아니라 스스로 탈출해 살았던 것입니다.
          <br />
          2학년 7반 교실의 시계는 우리가 기억해야 하는 사람들과 계속 관심을
          가져야 하는 이야기들을 온 몸으로 나타내고 있습니다.
          <br />
          단원고4.16기억교실 각 반에 있는 시계는 시간의 흐름에 따라 자연스럽게
          멈춘 것도 있고, 7반의 시계처럼 교실을 찾아온 이들에게 말을 거는 것도
          있습니다.
          <br />
          그 해, 교내 환경미화 심사 최우수 학급이기도 했던 2학년 7반, 깨끗한
          교실을 만들고 싶어 정성을 다해준 아이들을 위해 7반 교실은 32명의
          아이들을 꼭 기억해 달라고 말합니다.
          <br />
          <br />
          공부에 쓸 학용품을 꼼꼼히 고르며 과학 선생님의 꿈을 키워간 이근형
          <br />
          가족들에게는 애기였지만 사실은 의젓하고 어른스러운 이민우
          <br />
          태권도를 잘 하고, 형과 둘도 없는 친구처럼 지낸 김성빈
          <br />
          커다란 손으로 할 줄 아는 것이 많은 팔방미인 박성복
          <br />
          기타를 독학해 가족 앞에서 연주해 준 ‘오이 오빠’ 김상호
          <br />
          피아노 연주로 가족과 친구들을 행복하게 만들어준 김정민
          <br />
          세상에서 가장 강한 남자가 되기 위해 땀 흘리는 박인배
          <br />
          &lt;Let it go&gt;를 좋아하고 엉뚱한 말로 웃음을 줄 줄 아는 김수빈
          <br />
          여동생을 너그럽게 살피고 로봇을 꼼꼼히 조립할 줄 아는 정동수
          <br />
          엄마 품과 엄마 냄새를 좋아해 전막내라고 불린 전찬호
          <br />
          운동을 좋아하고 리더십 있는 성격으로 경찰이 되고 싶은 심장영
          <br />
          21명의 친구들과 뜨겁고 빛나는 우정을 주고받은 양철민
          <br />
          무뚝뚝한 듯해도 다정하고, 투박한 듯해도 섬세한 성격의 안중근
          <br />
          성대모사는 기본, 익살과 재치를 두루 갖춘 웃음 제조기 이진형
          <br />
          흥도, 끼도, 꿈도 넘치는, 친구들의 수학선생님 김민수
          <br />
          모두가 감탄하는 맛의 떡볶이를 뚝딱 만들어 내는 요리사 손찬우
          <br />
          항상 밝아 칭찬이 절로 나왔던 두 누나의 막내 동생 김기수
          <br />
          여리고 약한 것을 잘 돌보고 단발머리가 멋지게 어울리는 최현주
          <br />
          엄마에게 딸 같은 아들이 되어 준 꿈 많은 소년 이준우
          <br />
          다정한 아들, 살가운 제자, 유쾌한 친구, 한다면 하는 나강민
          <br />
          수학, 과학에 특출난 재능이 있고 보라색을 좋아하는 국승현
          <br />
          환자를 웃게 만드는 명랑한 간호사가 되기로 결심한 오영석
          <br />
          털털한 성격으로 친구들을 앞에서 이끌곤 하는 김건호
          <br />
          특전사의 꿈을 기르며 몸도 마음도 단단해진 이강명
          <br />
          성적도 오르고 친구들과도 즐거워 학교생활을 좋아한 서현섭
          <br />
          마음먹은 대로! 자신과의 약속은 지키고야 마는 곽수인
          <br />
          축구도 공부도 뛰어난 반장이자 집안의 든든한 맏이 이수빈
          <br />
          육군사관학교에 들어가 사랑하는 가족을 지킬 꿈을 꾼 박현섭
          <br />
          하얀 물뱀 태몽으로 엄마에게 온, 파충류 전문 학자를 꿈꾼 허재강
          <br />
          늘 깔끔하고 세련되게 자신을 꾸밀 줄 아는 멋쟁이 성민재
          <br />
          친구들의 컴퓨터 해결사, 프로게이머를 꿈꾸는 게임왕 송강현
          <br />
          아빠의 사랑 속에서 쑥쑥 자라 패션모델이라는 꿈을 가진 이정인
          <br />이 교실에 남은 아이들의 손길과 시간을 가슴에 새기겠습니다.
          <br />
          <br />
          다음 안내는 좌측 8반 교실 버튼을 눌러주시고, 돌아가려면 좌측 하단 메뉴
          버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "8반": () => {
    useA11y("class_08");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          8반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 8반은 남학생반입니다.
          <br />
          31명의 학생이 수학여행을 떠나 29명의 학생이 희생되고 두 명의 학생이
          돌아왔습니다.
          <br />
          2학년 8반 아이들이 교실 달력에 ‘수, 학, 여, 행’ 네 글자를 적어 놓을 때
          마음이 어땠을지를 생각하면 절대로 일어나서는 안 되는 일이었습니다.
          <br />
          이과반은 문과반에 비해 인원수가 적은 편입니다.
          <br />
          2014년 단원고등학교 2학년 이과반 남학생들은 2개 반 64명 중 단 3명만이
          우리 곁으로 돌아왔습니다.
          <br />
          시간이 흐를 수록 지워지고 잊혀지는 시간 속에서 우리가 할 수 있는 일은
          보다 구체적으로 이 교실에 남은 삶의 흔적들을 떠올려 보는 일일
          것입니다.
          <br />
          꿈과 목표가 정해질 때면 게시판에 스스로의 다짐을 새겼을 2학년 8반
          아이들의 모습을 상상해 보면서 말입니다.
          <br />
          부모님의 속옷 서랍에 깜짝 선물을 넣어두는 다정한 아들 임건우
          <br />
          컴퓨터와 기계에 관심이 많지만 마음은 늘 사람을 향하는 박시찬
          <br />
          과일과 채소를 유난히 좋아하는 담백하고 신선한 소년 전현우
          <br />
          포기하지 않고 애니메이션을 창조하겠다는 꿈을 키운 박수찬
          <br />
          용돈을 차곡차곡 모아 부모님의 기념일을 챙겨드린 김창헌
          <br />
          주일이면 친구들과 모여 축구하기를 좋아하는 이승현
          <br />
          스스로 컴퓨터를 고칠 수 있지만 엄마에게는 영원한 ‘아기’, 이승민
          <br />
          공군사관학교 출신 파일럿이 되고 싶어 차근차근 나아간 홍승준
          <br />
          여러 분야에 관심이 많은 취미부자, 붙임성 좋은 개구쟁이 이재욱
          <br />
          분해하고 다시 조립하는 모든 것을 단 하루 만에 해내는 김영창
          <br />
          수학여행 가기 전, 맘에 드는 옷과 운동화를 장만해 설렌 백승현
          <br />
          맛있는 것을 먹으러 다닐 때 행복한 미래의 요리사 제세호
          <br />
          체구는 작지만 다부진 손으로 만능 엔지니어를 꿈꾼 고우재
          <br />
          창의적으로 자유롭게! ‘구글’에서 일하는 프로그래머가 꿈인 김재영
          <br />
          직접 만든 자동차를 타고 여행하며 노래 부르고 있을 안주현
          <br />
          깔끔하고, 꼼꼼하고, 옳다고 믿는 것에는 항상 꼿꼿한 김대현
          <br />
          늦둥이로 태어나 엄마 사랑이 각별한 태권보이 조봉석
          <br />
          다친 엄마에게 손수 약을 발라준 ‘우리 집 다람쥐’ 김동현
          <br />
          “열심히 살자!”는 좌우명을 책상에 새기고 마음에 새긴 최수빈
          <br />
          책과 게임에 푹 빠져드는 자신만의 시간이 소중한 지상준
          <br />
          어른이 되면 시베리아 횡단열차를 타고 여행하고 싶은 최진혁
          <br />
          엄마에게 필요한 걸 선물할 줄 아는 일편단심 축구사랑 임현진
          <br />
          겸손하고 듬직하고 친절해 동생이 닮고 싶은 형, 김제훈
          <br />
          “할 수 있어, 힘내!”라는 말로 주변을 환하게 만드는 장준형
          <br />
          감동적인 연극, 영화, 드라마를 만드는 연출가가 되고픈 최정수
          <br />
          매주 토요일 저녁, 가족과의 삼겹살 파티 약속을 잘 지킨 이호진
          <br />
          부드럽고 조용한 카리스마로 로봇동아리 회장을 맡은 박선균
          <br />
          손재주가 뛰어나고 엄마 밥을 제일 좋아하는 ‘삼식이’ 김선우
          <br />
          엄마의 마음을 위로해준 소울푸드, 참치동그랑땡 전문가 조찬민
          <br />
          이 교실에서 피어났을 소년들의 다채로운 꿈과 고민들을 마음에 담아
          가겠습니다.
          <br />
          <br />
          다음 안내는 좌측 9반 교실 버튼을 눌러주시고, 돌아가려면 좌측 하단 메뉴
          버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "9반": () => {
    useA11y("class_09");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          9반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 9반은 여학생반입니다.
          <br />
          22명의 학생이 수학여행을 떠나 20명의 학생이 희생되고 두 명의 학생이
          돌아왔습니다.
          <br />
          세월호 선체조사위원회의 보고서는 세월호 참사를 이렇게 기록합니다.
          <br />
          **지킬 것들을 제대로 지켰다면, 세월호는 그렇게 출항하지 않았을
          것입니다.**
          <br />
          **묶을 것들을 제대로 묶었다면, 세월호는 그렇게 넘어지지 않았을
          것입니다.**
          <br />
          **닫을 것들을 제대로 닫았다면, 세월호는 그렇게 가라앉지 않았을
          것입니다.**
          <br />
          교실 칠판 옆 게시판을 봐주세요.
          <br />
          아이들이 함께 쓰는 공간을 잘 유지하기 위한 역할분담표를
          붙여놓았습니다.
          <br />
          칠판, 복도, 교실, 음악실 청소.
          <br />
          분리수거, 쓰레기통 관리까지 할 일을 꼼꼼히 나누었습니다.
          <br />
          작은 역할이지만 맡은 일을 제대로 해내는 교실 풍경이 그려집니다.
          <br />
          육지에서, 바다에서, 배에서, 어른들이 맡은 일을 제때 제대로 하지
          않았기에 우리 곁을 떠나간 2학년 9반 아이들의 이름을 불러봅니다.
          <br />
          전 세계 어려운 사람들을 찾아 돕는 일을 하고 싶은 이수진 고양이
          다윤이가 새끼 낳던 날, 그 곁을 지켜준 고양이 언니 정다혜
          <br />
          네 잎 클로버를 키우는 소녀 권민경
          <br />
          못 이룬 엄마의 꿈을 대신 이뤄주겠다는 엄마바라기 조은정
          <br />
          중국 안산시에서 나고 자라 중학생 때 한국 안산시에 온 친구 배향매
          <br />
          중국 나고 자란 곳 안산, 중학생 때 이사온 한국도 안산. 배향매
          <br />
          <br />
          수의사를 꿈꿨지만 이제는 뮤지컬 배우가 되고 싶은 편다인
          <br />
          기타도 연극도, 하고 싶은 일이 생기면 조용히 타오르는 불꽃 오경미
          <br />
          배 만드는 사람이 되고 싶어서 서점을 돌며 조선공 책을 찾는 김혜선
          <br />
          아빠의 흰머리를 염색하고 엄마 얼굴에 팩을 해주는 다정한 임세희
          <br />
          ‘목표를 세우면 그 목표가 나를 이끈다’며 계획표도 꼼꼼히 짜는 이보미
          <br />
          아빠를 닮아 키가 크고 축구 보는 것을 좋아하는 최진아
          <br />
          베스트 프렌즈 다섯 명의 우정에 ‘포에버’라는 이름을 지은 진윤희
          <br />
          놀기도 잘하고 공부도 잘하는 당찬 공주 이한솔
          <br />
          언제나 엄마 사랑, 엄마에게 러브레터를 보내는 김민정
          <br />
          수학여행에서 돌아와 공부에 집중할 거라며 책상을 깔끔히 정리한 김초예
          <br />
          가족들의 스파게티 담당 요리사 고하영
          <br />
          최고의 한의사가 되는 인생 로드맵을 세우는 김해화
          <br />
          수학여행 다녀와 제빵학원 다닐 계획에 설레는 정다빈
          <br />
          10년 모은 용돈 800만원을 집 살 때 보탠 통 큰 딸 박예지
          <br />
          아픈 사람 낫게 해주는 ‘황금손’ 약사가 되고 싶은 김아라
          <br />
          미안하고 그리운 2학년 9반 스무 명 친구들을 기억합니다.
          <br />
          <br />
          다음 안내는 좌측 10반 교실 버튼을 눌러주시고, 돌아가려면 좌측 하단
          메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  "10반": () => {
    useA11y("class_10");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          10반 교실 안내
        </DescriptionTitle>
        <DescriptionContent>
          2학년 10반은 여학생반입니다.
          <br />
          21명의 학생이 수학여행을 떠나 20명의 학생이 희생되고 한 명의 학생이
          돌아왔습니다.
          <br />
          교실의 칠판을 가만히 보아주세요.
          <br />
          ‘두 달 전에 왔을 때는 여기 칠판이 가득 찼었는데 오늘 와보니 칠판이
          너무 허전하네요’라는 글이 보입니다.
          <br />
          ‘우리가 분필을 들고 있는 한 세월호는 지워지지 않는다’
          <br />
          칠판 아래에 다짐처럼 적은 한 문장이 오래 눈길을 끕니다.
          <br />
          세월호가 침몰하던 그 날 그 바다를 보며 우리는 슬퍼하고 분노했습니다.
          <br />
          다시는 이런 희생이 생기지 않도록 우리 교육이 살아나길 바랍니다.
          <br />
          아픔 속에서 희망이 피어나는 세상을 기다립니다.
          <br />
          2014년 4월 16일의 약속을 기억하며 2학년 10반 아이들의 이름을
          불러봅니다.
          <br />
          띠동갑 동생을 돌보다 유치원 선생님이 되고 싶어진 이소진
          <br />
          ‘안산에서 주희 모르면 간첩’, 친구 많고 인기 많은 김주희
          <br />
          할 줄 아는 게 수학밖에 없으니 장래 희망도 수학 선생님이라는 이다혜
          <br />
          친구들 치마도 척척 고쳐주고 한 번 본 춤은 바로 따라 추는 재주꾼 이해주
          <br />
          아빠의 줄무늬 셔츠를 좋아해서 자주 빌려 입는 김다영
          <br />
          수학여행 사진 찍어 날마다 엄마에게 보낼테니 그거 보고 웃으라는 권지혜
          <br />
          스무 살부터는 돈 벌어 집안을 일으켜보리라, 국가자격증을 따놓은 김송희
          <br />
          이다음에 크면 아빠랑 같이 술도 마셔주고 운전도 대신해주고 싶은 이단비
          <br />
          언니가 유모차 태워 학교에 데려갔을 만큼 너무 예쁜 동생 이경민
          <br />
          사촌 언니들과 아이스크림 먹으며 수다 떠는 게 즐거운 이은별
          <br />
          아빠 등에 매달려 ‘나무늘보 놀이’를 즐기는 애교쟁이 구보현
          <br />
          대학 가서 농사 공부하고 엄마랑 시골 살며 농사를 지으려는 김유민
          <br />
          엄마처럼 사랑으로 달이와 팽이를 키우는 달팽이 엄마 이가영
          <br />
          연극부 활동하며 방송음향과에 진학할 계획을 세우는 박정슬
          <br />
          단원고 댄스동아리 ‘트렌디’의 분위기 메이커 이경주
          <br />
          엄마 아빠 생일이면 케이크를 만들어 선물하는 김민정
          <br />
          큰 대학병원 간호사가 돼 돈 많이 벌어 엄마에게 집을 사주고 싶은 강한솔
          <br />
          아르바이트하느라 고단한 언니의 대학 과제도 도와주는 실력파 동생 장혜원
          <br />
          카라멜 마끼아또에 네 잎 클로버 무늬를 띄워 엄마에게 건네고 싶은 장수정
          <br />
          친구들 생일이면 미역국 끓여 보온병에 담아오는 김슬기
          <br />
          열여덟의 우정과 사랑으로 다정다감한
          <br />
          2학년 10반 스무 명 친구들을 오래오래 기억하겠습니다.
          <br />
          <br />
          다음 안내는 좌측 교무실 버튼을 눌러주시고, 돌아가려면 좌측 하단 메뉴
          버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
  교무실: () => {
    useA11y("class_11");
    return (
      <MemoryClassContentDescription>
        <DescriptionTitle
          css={css`
            margin-bottom: 0.4rem;
            font-size: calc(var(--font-size) * 1.4);
          `}
        >
          교무실 안내
        </DescriptionTitle>
        <DescriptionContent>
          아이들과 수학여행을 떠난 단원고 선생님은 모두 14명입니다.
          <br />
          그 중 11명의 선생님이 희생되고 3명이 돌아왔습니다.
          <br />
          세월호에서 8명의 선생님들은 아이들과 함께 4층 객실을, 나머지 6명의
          선생님들은 5층 객실을 사용했습니다.
          <br />
          아침식사를 마치고 한가로운 시간, 갑자기 배가 기울었지만상황에 대한
          아무 설명도 없이 제자리에서 대기하라는 방송만 반복됐습니다.
          <br />
          선생님들의 책상 위 교사 업무 파일 안에는 ‘수학여행 인솔 교원 사전
          연수자료’가 남아있고, 칠판에는 당시 선생님들이 직접 적어놓았던 4월의
          행사 계획이 그대로 남아있습니다.
          <br />
          칠판에 적힌 계획대로 수학여행을 떠나기 전 사전교육을 통해 탈출이나
          안전장비에 대해 인지하고 있었지만, <br />
          ‘위험하니 절대로 움직이지 말고 대기하라’는 선원의 방송으로 아이들과
          선생님들은 모두 움직일 수 없었습니다.
          <br />
          선생님들의 책상 위에는 교무일지와 출석부가 남아있습니다. <br />
          교무일지에는 아이들 사진도 붙이고, 아이들의 꿈도 적고, 선생님마다
          자율적으로 반을 운영하고 기록한 흔적이 남아있습니다.
          <br />
          2014년 4월 16일. 세월호는 바다에 떠 있는 학교였습니다.
          <br />
          침몰하는 순간에도 ‘학생들은 절대 움직이지 말라’는 방송이 나오던 현장.
          <br />
          탈출을 고민하는 자율보다 가만히 있으라는 방송을 따라야 했던 현장.
          <br />
          이 현장은 그동안 이어져온 주입식 교육의 현장이었습니다.
          <br />
          기울고 물이 차는 배 안에서 구조를 믿고 기다리던 아이들의 생명을 끝내
          지키지 못한 나라에서 마지막까지 아이들 곁에 있던 11명 선생님의 이름을
          불러봅니다.
          <br />
          아침마다 손을 크게 흔들며 학생들을 맞이하는 선생님 고창석
          <br />
          학생들이 ‘아빠’라고 부를 만큼 다정한 선생님 김응현
          <br />
          학생들의 개성을 키우는 맵시 있는 교육을 고민하는 선생님 김초원
          <br />
          제자들에게 더 많은 세상을 경험하는 여행을 떠나라 조언하는 선생님
          남윤철
          <br />
          학생들의 환경과 처지를 먼저 살피고 이해하려 노력하는 선생님 박육근
          <br />
          학교 텃밭의 여린 채소를 키우듯 학생들을 다독이는 선생님 양승진
          <br />
          언니, 누나처럼 학생들에게 편하게 다가서는 선생님 유니나
          <br />
          밤늦게까지 학생들에게 손편지를 쓰는 선생님 이지혜
          <br />
          좋은 교사, 좋은 아빠, 좋은 남편, 누구에게나 참 좋은 선생님 이해봉
          <br />
          항상 학생을 생각하는 선생님이 되겠다는 첫 다짐을 실천하는 선생님
          전수영
          <br />
          학생들 마음을 살필 수 있는 기회라며 꾸준히 방과후 상담을 하는 선생님
          최혜정
          <br />
          생의 마지막까지 선생님의 자리에 서있던, <br />
          11명의 선생님들을 오래오래 기억하겠습니다.
          <br />
          <br />
          다음 안내는 좌측 안내 맺음말 버튼을 눌러주시고, 돌아가려면 좌측 하단
          메뉴 버튼을 눌러주세요.
        </DescriptionContent>
      </MemoryClassContentDescription>
    );
  },
};
