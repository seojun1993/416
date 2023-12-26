/** @jsxImportSource @emotion/react */
import { MainShell } from "@/styles/main-shell.styled";
import YR from "@/assets/images/노란리본.png";
import { css, useTheme } from "@emotion/react";
import Image from "@/components/image";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import avatar from "@/assets/images/avatar.png";
import Card from "@/components/pages/onboard/card";
const Saver = styled.div`
  flex: 1;
  position: relative;
  width: 50%;
  &::after {
    right: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 35%;
    background: ${(props) =>
      `linear-gradient(to right, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
  &::before {
    left: -1%;
    top: 0;
    position: absolute;
    content: "";
    height: 100%;
    width: 6%;
    z-index: 1;
    background: ${(props) =>
      `linear-gradient(to left, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
`;

const OPTIONS: EmblaOptionsType = { loop: true, align: "start" };
const SLIDES = [
  { text: "1" },
  { text: "2" },
  { text: "3" },
  { text: "4" },
  { text: "5" },
];

const OnBoard = () => {
  const theme = useTheme();

  return (
    <MainShell
      css={css`
        justify-content: space-between;
        overflow: clip;
        padding-left: 0;
      `}
    >
      <Saver>
        <h1
          css={css({
            fontFamily: "SangSangFlowerRoad",
            fontSize: "3rem",
            fontWeight: "normal",
            paddingLeft: "1.6rem",
          })}
        >
          하늘의 별이 된 아이들아,&nbsp;
          <strong
            css={css({
              color: theme.color.button.active,
            })}
          >
            생일 축하해
          </strong>
        </h1>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          renderItem={(item) => (
            <div
              css={css`
                margin: 2.5rem 1.6rem;
                row-gap: 1.8rem;
                display: flex;
                flex-direction: column;
              `}
            >
              <Card
                image={avatar}
                birth="97.05.00"
                title="고해인"
                description={`엄마가 힘들다고 하면 해바라기 같은 웃음을 띠고 꼭 안아주는,
                세계여행을 가고 싶어하던 해인이는 간호사라는 꿈을 가지고 있었습니다.`}
              />
              <Card
                image={avatar}
                birth={new Date("1997-05-01")}
                title="고해인"
                description={`엄마가 힘들다고 하면 해바라기 같은 웃음을 띠고 꼭 안아주는,
                세계여행을 가고 싶어하던 해인이는 간호사라는 꿈을 가지고 있었습니다.`}
              />
              <Card
                image={avatar}
                birth="97.05.00"
                title="고해인"
                description={`엄마가 힘들다고 하면 해바라기 같은 웃음을 띠고 꼭 안아주는,
                세계여행을 가고 싶어하던 해인이는 간호사라는 꿈을 가지고 있었습니다.`}
              />
            </div>
          )}
        />
      </Saver>
      <Image src={YR} />
    </MainShell>
  );
};

export default OnBoard;
