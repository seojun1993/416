/** @jsxImportSource @emotion/react */
import { getAllKeywordWithStudents } from "@/queries/keyword";
import { css } from "@emotion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import styled from "@emotion/styled";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { shuffle } from "@/libs/utils";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, Variants, motion, useInView } from "framer-motion";
import { KeywordWithStudents } from "@/types/keyword";
import { useSearchParams } from "react-router-dom";
interface StarPosition {
  x: number;
  y: number;
}
// 46 54 72 92 110

interface StarTemplate {
  stars: StarPosition[];
  name: string;
}

const temp1: StarTemplate = {
  name: "test",
  stars: [
    {
      x: 1,
      y: 0,
    },
    {
      x: 7,
      y: 60,
    },
    {
      x: 12,
      y: 14,
    },
    {
      x: 18,
      y: 76,
    },
    {
      x: 28,
      y: 7,
    },
    {
      x: 28,
      y: 40,
    },
    {
      x: 32,
      y: 80,
    },
    {
      x: 40,
      y: 0,
    },
    {
      x: 47,
      y: 32,
    },
    {
      x: 55,
      y: 55,
    },
    {
      x: 58,
      y: 0,
    },
    {
      x: 65,
      y: 80,
    },
    {
      x: 70,
      y: 0,
    },
    {
      x: 75,
      y: 35,
    },
    {
      x: 82,
      y: 80,
    },
    {
      x: 85,
      y: 20,
    },
    {
      x: 90,
      y: 2,
    },
  ],
};
const temp2: StarTemplate = {
  name: "test",
  stars: [
    {
      x: 5,
      y: 40,
    },
    {
      x: 12,
      y: 60,
    },
    {
      x: 16,
      y: 0,
    },
    {
      x: 23,
      y: 80,
    },
    {
      x: 28,
      y: 0,
    },
    {
      x: 32,
      y: 40,
    },
    {
      x: 40,
      y: 80,
    },
    {
      x: 44,
      y: 7,
    },
    {
      x: 47,
      y: 47,
    },
    {
      x: 53,
      y: 75,
    },
    {
      x: 58,
      y: 0,
    },
    {
      x: 64,
      y: 60,
    },
    {
      x: 68,
      y: 14,
    },
    {
      x: 72,
      y: 80,
    },
    {
      x: 76,
      y: 5,
    },
    {
      x: 78,
      y: 45,
    },
    {
      x: 85,
      y: 80,
    },
    {
      x: 90,
      y: 0,
    },
    {
      x: 94,
      y: 80,
    },
  ],
};
const temp3: StarTemplate = {
  name: "test",
  stars: [
    {
      x: 3,
      y: 0,
    },
    {
      x: 8,
      y: 40,
    },
    {
      x: 12,
      y: 80,
    },
    {
      x: 20,
      y: 8,
    },
    {
      x: 22,
      y: 40,
    },
    {
      x: 25,
      y: 75,
    },
    {
      x: 30,
      y: 0,
    },
    {
      x: 32,
      y: 50,
    },
    {
      x: 37,
      y: 22,
    },
    {
      x: 42,
      y: 60,
    },
    {
      x: 46,
      y: 20,
    },
    {
      x: 54,
      y: 80,
    },
    {
      x: 60,
      y: -5,
    },
    {
      x: 66,
      y: 34,
    },
    {
      x: 78,
      y: 76,
    },
    {
      x: 85,
      y: 20,
    },
  ],
};

interface Star {
  students: KeywordWithStudents["students"];
  label: string;
  weight: number;
  initialBrightness: number;
  duration: number;
  x: number;
  y: number;
}

const StarCloud = () => {
  const [_, setSearchParams] = useSearchParams();
  const { data: keywords } = useSuspenseQuery(getAllKeywordWithStudents());
  const [emblaRef, emblaApi] = useEmblaCarousel({
    skipSnaps: true,
    loop: true,
    dragFree: true,
  });
  const templates: { name: string; stars: Star[] }[] = useMemo(() => {
    if (!keywords?.length) return [];
    const keywordCount = keywords.length;
    let count = 0;
    const arr = shuffle(keywords);
    const temps = [temp1, temp2, temp3];
    const result = [];
    while (true) {
      if (count >= keywordCount) break;
      const selectedTemp = temps[Math.floor(Math.random() * temps.length)];
      selectedTemp.stars = selectedTemp.stars.map((star) => {
        const targetIndex = count % keywordCount;
        const studentsCount = arr[targetIndex].students.length;
        let weight = 5;
        switch (true) {
          case studentsCount <= 2:
            weight = 1;
            break;
          case studentsCount <= 4:
            weight = 2;
            break;
          case studentsCount <= 6:
            weight = 3;
            break;
          case studentsCount <= 8:
            weight = 4;
            break;
        }
        const starPosition = {
          ...star,
          students: arr[targetIndex].students,
          label: arr[targetIndex].name,
          weight,
          initialBrightness: Math.random() * 15,
          duration: Math.random() * 4 + 18,
        };
        count++;
        return starPosition;
      });
      result.push({ ...selectedTemp, name: count + "" } as {
        name: string;
        stars: Star[];
      });
    }
    return result;
  }, [keywords]);
  return (
    <div
      ref={emblaRef}
      css={css`
        width: 100%;
        height: 100%;
        flex-grow: 1;
        display: flex;
        overflow: hidden;
        padding: 1.34rem 0;
      `}
    >
      <div
        css={css`
          backface-visibility: hidden;
          touch-action: pan-y;
          display: flex;
          justify-content: flex-start;
          margin-left: -1.6rem;
          height: 100%;
          width: 100%;
        `}
        onClick={() => {
          setSearchParams({});
        }}
      >
        {templates?.map((temp, tempIdx) => {
          return (
            <TmeplateItem key={tempIdx + ""}>
              {temp?.stars.map((star, starIdx) => {
                return (
                  <StarWithLabel
                    star={star}
                    id={tempIdx + starIdx + ""}
                    key={tempIdx + starIdx + star.label}
                  />
                );
              })}
            </TmeplateItem>
          );
        })}
      </div>
    </div>
  );
};

export default StarCloud;

function TmeplateItem({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div
      ref={ref}
      css={css`
        position: relative;
        width: 100%;
        height: 100%;
        flex: 0 0 100%;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          flex: 0 0 100%;
        `}
      >
        {isInView ? children : null}
      </div>
    </div>
  );
}

function StarWithLabel({ star, id }: { id: string; star: Star }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("label") === star.label;

  return (
    <Star
      {...star}
      selected={selected}
      key={id}
      onClick={(event) => {
        event.stopPropagation();
        setSearchParams({ label: star.label });
      }}
    >
      <AnimatePresence mode="wait">
        {selected ? (
          <motion.div
            key={star.label + "selected"}
            css={css`
              width: 1.6rem;
              height: 1.52rem;
            `}
            variants={selectedStarVariants}
            animate="animate"
            initial="initial"
            exit="exit"
            custom={{ duration: star.duration }}
          >
            <svg
              css={css`
                width: 100%;
                height: 100%;
              `}
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="141"
              height="125"
              viewBox="0 0 141 125"
            >
              <defs>
                <filter
                  id="다각형_27"
                  x="25"
                  y="6.5"
                  width="116"
                  height="116"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="10" result="blur" />
                  <feFlood floodColor="#fff" floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="다각형_42"
                  x="23"
                  y="46"
                  width="79"
                  height="79"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="10" result="blur-2" />
                  <feFlood floodColor="#fff" floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur-2" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="다각형_43"
                  x="0"
                  y="30.5"
                  width="85"
                  height="85"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="10" result="blur-3" />
                  <feFlood floodColor="#fff" floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur-3" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="다각형_44"
                  x="9"
                  y="11.387"
                  width="79"
                  height="79"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="10" result="blur-4" />
                  <feFlood floodColor="#fff" floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur-4" />
                  <feComposite in="SourceGraphic" />
                </filter>
                <filter
                  id="다각형_45"
                  x="25"
                  y="0"
                  width="79"
                  height="79"
                  filterUnits="userSpaceOnUse"
                >
                  <feOffset in="SourceAlpha" />
                  <feGaussianBlur stdDeviation="10" result="blur-5" />
                  <feFlood floodColor="#fff" floodOpacity="0.8" />
                  <feComposite operator="in" in2="blur-5" />
                  <feComposite in="SourceGraphic" />
                </filter>
              </defs>
              <g
                id="그룹_678"
                data-name="그룹 678"
                transform="translate(-67.283 41.502)"
              >
                <g
                  transform="matrix(1, 0, 0, 1, 67.28, -41.5)"
                  filter="url(#다각형_27)"
                >
                  <path
                    id="다각형_27-2"
                    data-name="다각형 27"
                    d="M28,0l7,21,21,7L35,35,28,56,21,35,0,28l21-7Z"
                    transform="translate(55 36.5)"
                    fill="#fff500"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 67.28, -41.5)"
                  filter="url(#다각형_42)"
                >
                  <path
                    id="다각형_42-2"
                    data-name="다각형 42"
                    d="M9.5,0l2.375,7.125L19,9.5l-7.125,2.375L9.5,19,7.125,11.875,0,9.5,7.125,7.125Z"
                    transform="translate(53 76)"
                    fill="#fff500"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 67.28, -41.5)"
                  filter="url(#다각형_43)"
                >
                  <path
                    id="다각형_43-2"
                    data-name="다각형 43"
                    d="M12.5,0l3.125,9.375L25,12.5l-9.375,3.125L12.5,25,9.375,15.625,0,12.5,9.375,9.375Z"
                    transform="translate(30 60.5)"
                    fill="#fff500"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 67.28, -41.5)"
                  filter="url(#다각형_44)"
                >
                  <path
                    id="다각형_44-2"
                    data-name="다각형 44"
                    d="M9.5,0l2.375,7.125L19,9.5l-7.125,2.375L9.5,19,7.125,11.875,0,9.5,7.125,7.125Z"
                    transform="translate(39 41.39)"
                    fill="#fff500"
                  />
                </g>
                <g
                  transform="matrix(1, 0, 0, 1, 67.28, -41.5)"
                  filter="url(#다각형_45)"
                >
                  <path
                    id="다각형_45-2"
                    data-name="다각형 45"
                    d="M9.5,0l2.375,7.125L19,9.5l-7.125,2.375L9.5,19,7.125,11.875,0,9.5,7.125,7.125Z"
                    transform="translate(55 30)"
                    fill="#fff500"
                  />
                </g>
              </g>
            </svg>
          </motion.div>
        ) : (
          <motion.svg
            key={star.label + "unselected"}
            animate="animate"
            initial="initial"
            exit="exit"
            variants={starVariants}
            custom={{ duration: star.duration }}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="76"
            height="76"
            viewBox="0 0 76 76"
          >
            <defs>
              <filter
                id="다각형_26"
                x="0"
                y="0"
                width="76"
                height="76"
                filterUnits="userSpaceOnUse"
              >
                <feOffset in="SourceAlpha" />
                <feGaussianBlur
                  id={id}
                  stdDeviation={star.initialBrightness}
                  result="blur"
                />
                <feFlood floodColor="#fff" floodOpacity="0.8" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#다각형_26)">
              <path
                id="다각형_26-2"
                data-name="다각형 26"
                d="M28,0l7,21,21,7L35,35,28,56,21,35,0,28l21-7Z"
                fill="#fff"
                transform="translate(10, 10)"
              />
            </g>

            <animate
              xlinkHref={`#${id}`}
              attributeName="stdDeviation"
              values={`${star.initialBrightness};15;4;15;${star.initialBrightness}`}
              dur={`${star.duration}s`}
              begin="0s"
              repeatCount="indefinite"
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {star.label}
    </Star>
  );
}

const starVariants: Variants = {
  initial: {
    scale: 0.2,
    opacity: 0.85,
  },
  animate: ({ duration }: any) => ({
    scale: 1,
    opacity: 1,
    transition: {
      repeat: Infinity,
      duration: duration / 5,
      type: "tween",
      ease: "easeInOut",
      repeatType: "mirror",
    },
  }),
  exit: {
    scale: 0.01,
    opacity: 0.85,
  },
};
const selectedStarVariants: Variants = {
  initial: {
    scale: 0.2,
    opacity: 0.85,
  },
  animate: ({ duration }: any) => ({
    scale: 2,
    opacity: 1,
    y: -10,
  }),
  exit: {
    scale: 0.01,
    opacity: 0.85,
  },
};

const fontSizesByWeight = [0.92, 1.08, 1.44, 1.84, 2.2];

const STAR_COLOR_VALUE = (255 - 128) / 4;
export const Star = styled.div<{
  x: number;
  y: number;
  weight: number;
  selected: boolean;
}>`
  white-space: nowrap;
  font-family: "NanumSquareRoundOTF";
  font-size: calc(
    var(--font-size) * ${(props) => fontSizesByWeight[props.weight - 1]}
  );
  color: ${(props) =>
    props.selected
      ? props.theme.color.yellow
      : `rgb(${255 - STAR_COLOR_VALUE * props.weight},${
          255 - STAR_COLOR_VALUE * props.weight
        },255)`};
  svg {
    * {
    }
  }

  line-height: 1;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: ${(props) => props.x}%;
  top: ${(props) => props.y}%;
  row-gap: 0.1rem;
`;
