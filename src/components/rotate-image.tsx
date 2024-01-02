/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import { useRef, useEffect } from "react";
interface RotateImageProps {
  image: string;
  point: {
    x: number;
    y: number;
  };
  cssProps?: SerializedStyles;
}
const RotateImage = ({ image, point, cssProps }: RotateImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const dpr = devicePixelRatio > 1 ? 2 : 1;
    const interval = 1000 / 60;
    let animationId: number;
    if (imageRef.current) {
      const element = imageRef.current;
      let now, delta;
      let then = Date.now();
      let startX = point.x;
      let startY = point.y;

      let angle = Math.random() * 100;

      const frame = () => {
        requestAnimationFrame(frame);
        now = Date.now();
        delta = now - then;
        if (delta < interval) return;
        then = now - (delta % interval);
        angle += 0.01;

        startX = Math.cos(angle) * 10;
        startY = Math.sin(angle) * 10;
        const offsetX = startX;
        const offsetY = startY;
        element.style.transform = `perspective(5000px) scale(0.5) translate(${
          point.x + offsetX
        }px,${
          point.y + offsetY
        }px) rotateX(${startX}deg) rotateY(${startY}deg)`;
      };
      animationId = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  return (
    <img
      ref={imageRef}
      src={image}
      css={css`
        position: absolute;
        transform-style: preserve-3d;
        z-index: -1;
        width: 100%;
        transition: transform 0.1s ease-in-out;
        transform: perspective(5000px) scale(0.5)
          translate(${point.x}px, ${point.y}px);
        object-fit: contain;
        ${cssProps && cssProps.styles.toString()}
      `}
    />
  );
};

export default RotateImage;
