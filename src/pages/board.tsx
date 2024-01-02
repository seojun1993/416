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
import { useMemo, useRef, useEffect, useState, useId } from "react";
import RotateImage from "@/components/rotate-image";
import { useSearchParams } from "react-router-dom";
import styled from "@emotion/styled";
import { Header } from "@/components/common/header";
import LinesEllipsis from "react-lines-ellipsis";
import { m, LazyMotion, domAnimation, LayoutGroup } from "framer-motion";
import { WithBlur } from "@/components/common/with-blur";

const WEIGHT = 1.3;

const Board = () => {
  const imageRef = useRef<HTMLImageElement>(null);
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

    let animationId: number;

    if (imageRef.current) {
      const element = imageRef.current;
      let now, delta;
      let then = Date.now();
      let startX = 0;
      let startY = 0;

      let angle = Math.random();

      const frame = () => {
        animationId = requestAnimationFrame(frame);
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
      imageRef.current?.removeEventListener("load", calculateImageWidth);
    };
  }, []);

  return (
    <MainShell
      css={css`
        position: relative;
      `}
    >
      <section
        css={css`
          /* flex: 1; */
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
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
          width: 100%;
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
        <Writer>
          <Blur />
          <WriteButton
            onClick={() => {
              console.log("?>??");
            }}
          >
            작성하기
          </WriteButton>
        </Writer>
      </section>
    </MainShell>
  );
};

export default Board;

const Writer = styled.div`
  position: relative;
  & + {
    margin-top: 1rem;
  }
`;
const WriteButton = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.color.button.active};
  padding: 0.2rem;
  text-align: center;
  color: ${(props) => props.theme.color.secondary.foreground};
  border-radius: 9999rem;
`;

const Blur = styled.div`
  position: absolute;
  top: -4.9rem;
  height: 5rem;
  width: 100%;
  background: ${(props) =>
    `linear-gradient(to bottom, transparent, ${props.theme.color.primary.foreground} 90%)`};
`;

const BoardScroller = () => {
  return (
    <Scroller
      css={css`
        padding: 1em 0.5rem 1rem 0.5rem;
        position: relative;
        display: block;
        overflow-y: scroll;
        scroll-snap-type: y mandatory;
      `}
    >
      <LayoutGroup>
        <ScrollerContent>
          {[
            {
              text: `비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
                가온누리 늘품 책방 책방 아름드리 미쁘다 바람꽃 산들림 미리내
                나래 이플 컴퓨터 우리는 아슬라 다솜 아리아 그루잠 옅구름
                미쁘다 옅구름 별빛 아슬 비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
                가온누리 늘품 책방 책방 아름드리 미쁘다 바람꽃 산들림 미리내
                나래 이플 컴퓨터 우리는 아슬라 다솜 아리아 그루잠 옅구름
                미쁘다 옅구름 별빛 아슬...비나리 도서관 사과 아슬라 그루잠 달볓 소솜 책방 여우비 바나나
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
            <BoardItem key={index} text={item.text} />
          ))}
        </ScrollerContent>
      </LayoutGroup>
    </Scroller>
  );
};

const Scroller = styled.div`
  position: relative;
  flex: 1;
  overflow-y: hidden;

  & {
    -ms-overflow-style: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
const ScrollerContent = styled(m.div)`
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  touch-action: pan-y;
  min-height: 0;
  backface-visibility: hidden;

  & {
    -ms-overflow-style: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Card = styled(m.div)`
  flex: 0 0 50%;
  border: 1px solid #eeeeee;
  border-radius: 0.5rem;
  padding: 1rem 1.4rem;
  background-color: white;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.2);
  text-decoration: none;
  color: black;
  max-height: 20rem;
`;

const More = styled.button`
  display: block;
  margin-left: auto;
  color: ${(props) => props.theme.color.button.active};
  background-color: transparent;
  border: none;
`;

interface BoardItemProps {
  text: string;
}

function BoardItem({ text }: BoardItemProps) {
  const [open, setOpen] = useState(false);
  const isClamped = useRef<boolean | null>(null);

  return (
    <LazyMotion features={domAnimation}>
      <Card
        layout
        transition={{
          type: "tween",
        }}
      >
        <LinesEllipsis
          onReflow={(props) => {
            if (isClamped.current === null) {
              isClamped.current = props.clamped;
            }
          }}
          text={text}
          maxLine={open ? 100 : 2}
          ellipsis="..."
        />
        {isClamped.current && (
          <More onClick={() => setOpen((prev) => !prev)}>
            {open ? "닫기" : "더보기"}
          </More>
        )}
      </Card>
    </LazyMotion>
  );
}
