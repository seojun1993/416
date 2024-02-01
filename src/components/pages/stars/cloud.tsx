/** @jsxImportSource @emotion/react */
import { getAllKeywordWithStudents } from "@/queries/keyword";
import { css } from "@emotion/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef } from "react";
import { StarRenderer } from "./StarRenderer";
const MAX_STAR_COUNT = 15;
const StarCloud = () => {
  const { data: keywords } = useQuery(getAllKeywordWithStudents());
  const canvas = useRef<HTMLCanvasElement>(null);
  const keywordsMaxLength = useMemo(() => keywords?.length ?? 0, [keywords]);

  useEffect(() => {
    if (canvas.current) {
      const renderer = new StarRenderer(canvas.current);
      renderer.canvas.addEventListener("touchstart", console.log, false);
      renderer.canvas.addEventListener("touchend", console.log, false);
      return () => {
        renderer.canvas.removeEventListener("touchend", console.log, false);
        renderer.canvas.removeEventListener("touchend", console.log, false);
      };
    }
  }, []);

  return (
    <canvas
      draggable
      css={css`
        width: 100%;
        height: 100%;
      `}
      ref={canvas}
    />
  );
};

export default StarCloud;
