/** @jsxImportSource @emotion/react */
import mainImage from "@/assets/images/김예은/main.png";
import sub1Image from "@/assets/images/김예은/sub1.png";
import sub2Image from "@/assets/images/김예은/sub2.png";
import sub3Image from "@/assets/images/김예은/sub3.png";
import sub4Image from "@/assets/images/김예은/sub4.png";
import sub5Image from "@/assets/images/김예은/sub5.png";
import Students from "@/assets/icons/students.png";
import 방명록 from "@/assets/icons/방명록.png";
import { MainShell } from "@/styles/main-shell.styled";
import { css } from "@emotion/react";
import { useMemo, useRef, useEffect, useState } from "react";
import RotateImage from "@/components/rotate-image";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import useEmblaCarousel from "embla-carousel-react";
import { Header } from "@/components/common/header";
const WEIGHT = 1.3;

const Board = () => {
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [imagePosition, setImagePosition] = useState<DOMRect | null>();
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name");
  const subImages = useMemo(
    () => [sub1Image, sub4Image, sub3Image, sub2Image, sub5Image],
    []
  );
  const circlePoints = useMemo(() => {
    if (imagePosition) {
      // 원의 중심 좌표와 반지름 설정
      const radius = imagePosition.width; // 반지름
      const centerX = -imagePosition.width * 2; // 중심 X 좌표
      const centerY = imagePosition.y + imagePosition.height / 5; // 중심 Y 좌표

      // 포인트 수 설정
      const numPoints = subImages.length;

      // 포인트를 저장할 배열
      const points = [];

      // 각도 단위를 계산 (360도를 numPoints로 나눔)
      const angleStep = (2 * Math.PI) / numPoints;

      // 원 위의 포인트 계산
      for (let i = 0; i < numPoints; i++) {
        // 각도 계산
        const angle = i * angleStep + Math.random() * 0.3;
        console.log(angle);

        // 포인트의 X 좌표 계산
        const x = centerX + radius * Math.cos(angle);

        // 포인트의 Y 좌표 계산
        const y = centerY + radius * Math.sin(angle);

        // 포인트를 배열에 추가
        points.push({ x, y });
      }

      // 결과 출력

      return points;
    }
    return [];
  }, [imagePosition]);

  const calculateImageWidth = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setImagePosition(rect);
    }
  };

  useEffect(() => {
    const dpr = devicePixelRatio > 1 ? 2 : 1;
    const interval = 1000 / 60;
    const radius = Math.random() * 0.5;

    let animationId: number;

    if (imageRef.current) {
      const element = imageRef.current;
      let now, delta;
      let then = Date.now();
      let startX = 0;
      let startY = 0;

      let angle = Math.random();

      const frame = () => {
        requestAnimationFrame(frame);
        now = Date.now();
        delta = now - then;
        if (delta < interval) return;
        then = now - (delta % interval);
        angle += 0.01;

        startX = Math.cos(angle) * 2;
        startY = Math.sin(angle) * 2;
        element.style.transform = `perspective(5000px) translate(${startX}px,${startY}px) rotateX(${startX}deg) rotateY(${startY}deg)`;
      };
      animationId = requestAnimationFrame(frame);
      imageRef.current.addEventListener("load", calculateImageWidth);
    }
    return () => {
      cancelAnimationFrame(animationId);
      imageRef.current?.removeEventListener(
        "loadedmetadata",
        calculateImageWidth
      );
    };
  }, []);

  return (
    <MainShell
      css={css`
        position: relative;
        /* &::after {
          z-index: 0;
          mix-blend-mode: darken;
          content: "";
          background: url("/assets/노란리본.png");
          opacity: 0.3;
          position: absolute;
          top: 0px;
          left: 0px;
          right: 0px;
          bottom: 0px;
          background-repeat: no-repeat;
          background-position: center;
        } */
      `}
    >
      <section
        ref={sectionRef}
        css={css`
          flex: 1;
          position: relative;
          display: flex;
          /* align-items: center; */
          flex-direction: column;
          z-index: 1;
        `}
      >
        <Header>
          <img
            src={Students}
            css={css`
              height: 100%;
              margin-right: 0.1em;
            `}
          />
          {name}
        </Header>
        <div
          css={css`
            position: relative;
            width: 50%;
            margin: auto;
          `}
        >
          <img
            ref={imageRef}
            css={css({
              zIndex: 3,
              width: "100%",
            })}
            src={mainImage}
          />
          {circlePoints.map((point, index) => {
            return (
              <RotateImage
                key={index}
                image={subImages[index]}
                point={point}
                cssProps={css({
                  maxHeight: imagePosition ? imagePosition.height : "100%",
                  borderRadius: 9999,
                  overflow: "hidden",
                })}
              />
            );
          })}
        </div>
      </section>
      <section
        css={css`
          flex: 1;
          display: flex;
          flex-direction: column;
        `}
      >
        <h1
          css={css`
            font-size: 2.4rem;
            height: 2.4rem;
            display: inline-flex;
            align-items: center;
            font-weight: extrabold;
          `}
        >
          <img
            src={방명록}
            css={css`
              height: 100%;
              margin-right: 0.1em;
            `}
          />
          방명록
        </h1>
        <BoardScroller />
        <button>??</button>
      </section>
    </MainShell>
  );
};

export default Board;

const BoardScroller = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    axis: "y",
    dragFree: true,
    align: "start",
    loop: true,
  });
  useEffect(() => {}, []);
  return (
    <Scroller
      ref={emblaRef}
      css={css`
        padding-top: 1em;
        position: relative;
      `}
    >
      <ScrollerContent>
        {[
          {
            text: `비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
                  가온누리 늘품 책방 책방 아름드리 미쁘다 바람꽃 산들림 미리내
                  나래 이플 컴퓨터 우리는 아슬라 다솜 아리아 그루잠 옅구름
                  미쁘다 옅구름 별빛 아슬...`,
          },
          {
            text: `아슬라 별빛 예그리나 소솜 바람꽃 아슬라 책방 도르레 별하
                  아리아 감또개 별하 다솜 이플 소록소록 아슬라 바나나 사과
                  도서관 우리는 감또개 산들림 도서 나래 도서 소록소록 그루잠
                  곰다시 아름드리 도르레 아름드 ...`,
          },
          {
            text: `비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
                  가온누리 늘품 책방 책방 아름드리 미쁘다 바람꽃 산들림 미리내
                  나래 이플 컴퓨터 우리는 아슬라 다솜 아리아 그루잠 옅구름
                  미쁘다 옅구름 별빛 아슬...`,
          },
          {
            text: `아슬라 별빛 예그리나 소솜 바람꽃 아슬라 책방 도르레 별하
                  아리아 감또개 별하 다솜 이플 소록소록 아슬라 바나나 사과
                  도서관 우리는 감또개 산들림 도서 나래 도서 소록소록 그루잠
                  곰다시 아름드리 도르레 아름드 ...`,
          },
          {
            text: `비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
                  가온누리 늘품 책방 책방 아름드리 미쁘다 바람꽃 산들림 미리내
                  나래 이플 컴퓨터 우리는 아슬라 다솜 아리아 그루잠 옅구름
                  미쁘다 옅구름 별빛 아슬...`,
          },
          {
            text: `아슬라 별빛 예그리나 소솜 바람꽃 아슬라 책방 도르레 별하
                  아리아 감또개 별하 다솜 이플 소록소록 아슬라 바나나 사과
                  도서관 우리는 감또개 산들림 도서 나래 도서 소록소록 그루잠
                  곰다시 아름드리 도르레 아름드 ...`,
          },
        ].map((item, index) => (
          <Card key={index}>
            <p>{item.text}</p>
          </Card>
        ))}
      </ScrollerContent>
    </Scroller>
  );
};

const Scroller = styled.div`
  position: relative;
  flex: 1;
  overflow-y: clip;

  & {
    -ms-overflow-style: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }

  &::after {
    bottom: -1%;
    position: absolute;
    content: "";
    height: 20%;
    width: 100%;
    pointer-events: none;
    background: ${(props) =>
      `linear-gradient(to bottom, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
`;
const ScrollerContent = styled.div`
  display: flex;
  flex-direction: column;
  overflow: visible;
  row-gap: 1em;

  & {
    -ms-overflow-style: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled.div`
  /* flex: 1 1 0%; */
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 1rem 1.4rem;
  background-color: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: black;
`;
