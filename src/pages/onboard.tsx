import { MainShell } from "@/styles/main-shell.styled";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import avatar1 from "@/assets/images/avatar/1.png";
import avatar2 from "@/assets/images/avatar/2.png";
import avatar3 from "@/assets/images/avatar/3.png";
import Card from "@/components/pages/onboard/card";

const SLIDES = [{ text: "1" }];

const OnBoard = () => {
  const OPTIONS: EmblaOptionsType = { loop: true };
  return (
    <OnBoardShell>
      <Saver>
        <OnBoardTitle>
          하늘의 별이 된 아이들아,&nbsp;
          <ActivedSpan>생일 축하해</ActivedSpan>
        </OnBoardTitle>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          renderItem={(item) => (
            <CarouselCardContent>
              <Card
                href="board?name=김예은"
                image={avatar1}
                birth="97.05.00"
                title="고해인"
                description={`엄마가 힘들다고 하면 해바라기 같은 웃음을 띠고 꼭 안아주는,
                세계여행을 가고 싶어하던 해인이는 간호사라는 꿈을 가지고 있었습니다.`}
              />
              <Card
                image={avatar2}
                birth={new Date("1997-09-01")}
                title="김민지"
                description={`아빠의 보배, 아빠의 가장 친한 친구이자 끝없는 잔소리꾼인 '꽁민지'
                단원고 2학년 1반, 아빠의 보배였던
                민지는 가수를 꿈꾸고 있었습니다.`}
              />
              <Card
                image={avatar3}
                birth="97.04.00"
                title="김민희"
                description={`초등학교 때 점토 교육강사 자격증을
                딸 정도로 손재주가 좋고 만들기를
                좋아하는, 민희는 사서가 되고 싶은
                꿈을 가지고 있었습니다.`}
              />
            </CarouselCardContent>
          )}
        />
      </Saver>
    </OnBoardShell>
  );
};

export default OnBoard;

const OnBoardTitle = styled.h1`
  font-family: "SangSangFlowerRoad";
  font-size: 3rem;
  font-weight: normal;
  padding-left: 1.6rem;
  color: ${(props) => props.theme.color.text.main};
`;

const CarouselCardContent = styled.div`
  margin: 2.5rem 1.6rem;
  column-gap: 1.8rem;
  display: flex;
`;

const ActivedSpan = styled.strong`
  color: ${(props) => props.theme.color.button.active};
`;

const OnBoardShell = styled(MainShell)`
  justify-content: space-between;
  overflow: clip;
  padding-left: 0;
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100dvw;
  /* &::after {
    right: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 15%;
    background: ${(props) =>
    `linear-gradient(to right, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
  &::before {
    left: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 15%;
    z-index: 1;
    background: ${(props) =>
    `linear-gradient(to left, transparent, ${props.theme.color.primary.foreground} 90%)`};
  } */
`;
