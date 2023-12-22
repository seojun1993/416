/** @jsxImportSource @emotion/react */
import mainImage from "@/assets/images/김예은/main.png";
import sub1Image from "@/assets/images/김예은/sub1.png";
import sub2Image from "@/assets/images/김예은/sub2.png";
import sub3Image from "@/assets/images/김예은/sub3.png";
import sub4Image from "@/assets/images/김예은/sub4.png";
import sub5Image from "@/assets/images/김예은/sub5.png";
import { MainShell } from "@/styles/main-shell.styled";
import { css } from "@emotion/react";

import { useMemo, useRef, useEffect } from "react";
import RotateImage from "@/components/rotate-image";

const Board = () => {
  const subImages = useMemo(
    () => [sub1Image, sub4Image, sub3Image, sub2Image, sub5Image],
    []
  );
  const circlePoints = useMemo(() => {
    // 원의 중심 좌표와 반지름 설정
    const centerX = 0; // 중심 X 좌표
    const centerY = 0; // 중심 Y 좌표
    const radius = 170; // 반지름

    // 포인트 수 설정
    const numPoints = 5;

    // 포인트를 저장할 배열
    const points = [];

    // 각도 단위를 계산 (360도를 numPoints로 나눔)
    const angleStep = (2 * Math.PI) / numPoints;

    // 원 위의 포인트 계산
    for (let i = 0; i < numPoints; i++) {
      // 각도 계산
      const angle = i * angleStep;

      // 포인트의 X 좌표 계산
      const x = centerX + radius * Math.cos(angle);

      // 포인트의 Y 좌표 계산
      const y = centerY + radius * Math.sin(angle);

      // 포인트를 배열에 추가
      points.push({ x, y });
    }

    // 결과 출력

    return points;
  }, []);

  const imageRef = useRef<HTMLImageElement>(null);

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

        startX = Math.cos(angle) * 15;
        startY = Math.sin(angle) * 15;
        element.style.transform = `perspective(5000px) translate(${startX}px,${startY}px) rotateX(${startX}deg) rotateY(${startY}deg)`;
      };
      animationId = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <MainShell
      css={css`
        display: flex;
        padding: 2.5rem 1.6rem;
        height: 100%;
      `}
    >
      <section
        css={css`
          flex: 1;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          ref={imageRef}
          css={css({
            height: "70%",
            zIndex: 2,
          })}
          src={mainImage}
        />
        {subImages.map((image, index) => {
          return (
            <RotateImage
              key={index}
              image={image}
              point={circlePoints[index]}
            />
          );
        })}
      </section>
      <section
        css={css`
          flex: 1;
        `}
      >
        1
      </section>
    </MainShell>
  );
};

export default Board;
