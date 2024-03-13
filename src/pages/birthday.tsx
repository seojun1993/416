/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import styled from "@emotion/styled";
import EmblaCarousel from "@/components/ui/carousel";
import { EmblaOptionsType } from "embla-carousel-react";
import OnboardCompoents from "@/components/pages/onboard";
import useEmblaCarousel from "embla-carousel-react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { getImagePath, sendA11yEvent } from "../libs/utils";
import { Prefetch } from "../libs/plugins/prefetch";
import { useEffect, useMemo, useState } from "react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import { Student } from "@/types/student";
import { H4, P3 } from "@/components/ui/text";
import { Card } from "@/components/common/card";
import { css } from "@emotion/react";

import { useSettingStore } from "@/contexts/setting.store";
import { fadeInOutVariants } from "@/variants";
import { useA11y } from "@/hooks/use-a11y";

const Birthday = () => {
  const { data: students } = useQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );

  const signActive = useSettingStore((state) => state.signActivate);
  const [id, setId] = useState(() => {
    const id = sessionStorage.getItem("redirect_id");
    if (id) {
      sessionStorage.removeItem("redirect_id");
    }
    return Number(id) ?? 0;
  });

  const OPTIONS: EmblaOptionsType = useMemo(
    () => ({ loop: true, startIndex: id }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS, [
    Prefetch({
      onSelect(selectedIndex) {
        setId(selectedIndex);
        const target = students?.[selectedIndex];
        if (target) {
          sendA11yEvent(target.voicekey);
        }
      },
    }),
  ]);

  const studentOnCenter = useMemo(() => {
    const target = students?.[Number(id)];

    return id !== null && target;
  }, [id, students]);

  useEffect(() => {
    if (emblaApi && id) {
      emblaApi.scrollTo(Number(id));
    }
  }, [id]);

  useA11y("birthday");

  return (
    <OnBoardShell>
      <LazyMotion features={domAnimation}>
        <Saver>
          <OnBoardMonth>
            <H4>{new Date().getMonth() + 1}월 생일자</H4>
          </OnBoardMonth>
          {studentOnCenter ? (
            <OnboardCompoents.OnBoardTitle title={studentOnCenter.name} />
          ) : null}
          {students ? (
            <EmblaCarousel
              cssSlide={css`
                width: 60dvw;
                display: flex;
                align-items: center;
              `}
              carouselType={[emblaRef, emblaApi]}
              slides={students}
              options={{
                button: {
                  leftStyle: css`
                    left: -1rem;
                  `,
                  rightStyle: css`
                    right: -1rem;
                  `,
                },
              }}
            >
              {(item, index) => {
                return (
                  <OnBoardItem
                    key={item.id}
                    item={item}
                    index={index}
                    onFirstClick={() => {
                      emblaApi?.scrollTo(index);
                    }}
                    onDoubleClick={() => {
                      sessionStorage.setItem("redirect_id", id + "");
                    }}
                  />
                );
              }}
            </EmblaCarousel>
          ) : null}
        </Saver>
        {/* <AnimatePresence mode="wait">
          {signActive ? (
            <div
              css={css`
                width: 36rem;
                display: flex;
              `}
            >
              <PreloadVideo key="video" src={vi} autoPlay muted></PreloadVideo>
            </div>
          ) : (
            <Birth key="none" students={students} />
          )}
        </AnimatePresence> */}
      </LazyMotion>
    </OnBoardShell>
  );
};

interface BirthProps {
  students?: Student[];
}

function Birth({ students }: BirthProps) {
  const parseStudents = useMemo(() => {
    const result = new Map<number, string[]>();
    students?.forEach((student) => {
      const birthday = new Date(student.birthday).getDate();
      result.set(birthday, [...(result.get(birthday) ?? []), student.name]);
    });
    return result;
  }, [students]);

  return (
    <motion.div
      variants={fadeInOutVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        width: 36rem;
      `}
    >
      <div
        css={css`
          object-fit: cover;
          width: 100%;
          height: 23.2rem;
          margin-bottom: 4rem;
          overflow-y: clip;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            bottom: -10%;
            left: 50%;
            transform: translateX(-50%);
            width: 101%;
            background: ${`linear-gradient(to top, #20316D, transparent 100%)`};
            height: 30%;
            pointer-events: none;
          }
        `}
      >
        <H4
          css={css`
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            column-gap: 1rem;
          `}
        >
          <svg
            css={css`
              width: 1.8rem;
              height: 2.04rem;
            `}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="90"
            height="102"
            viewBox="0 0 90 102"
          >
            <defs>
              <clipPath id="clip-path">
                <rect
                  id="사각형_963"
                  data-name="사각형 963"
                  width="90"
                  height="102"
                  fill="#fff"
                />
              </clipPath>
            </defs>
            <g id="cake_icon" transform="translate(0 0)">
              <path
                id="패스_3326"
                data-name="패스 3326"
                d="M5.562,24.927H84.438v29.9H5.562ZM0,60.435H90V19.315H0Z"
                transform="translate(0 41.565)"
                fill="#fff"
              />
              <path
                id="패스_3327"
                data-name="패스 3327"
                d="M71.056,45.186H3.617V9.746H71.056ZM9.162,39.577H65.514V15.358H9.162Z"
                transform="translate(7.659 20.944)"
                fill="#fff"
              />
              <rect
                id="사각형_960"
                data-name="사각형 960"
                width="5.615"
                height="12.956"
                transform="translate(42.193 20.385)"
                fill="#fff"
              />
              <g id="그룹_741" data-name="그룹 741" transform="translate(0 0)">
                <g
                  id="그룹_740"
                  data-name="그룹 740"
                  clipPath="url(#clip-path)"
                >
                  <path
                    id="패스_3328"
                    data-name="패스 3328"
                    d="M20.334,25.188l-1.183-.565c-4.25-2.027-6.683-4.892-7.233-8.52C10.862,9.075,17.675,2.485,18.453,1.757L20.334,0l1.881,1.757c.778.728,7.591,7.318,6.535,14.347-.55,3.627-2.983,6.492-7.233,8.52ZM20.34,8.018c-1.572,2.011-3.28,4.889-2.922,7.239.207,1.362,1.189,2.576,2.915,3.624,1.733-1.048,2.712-2.266,2.919-3.634.358-2.366-1.347-5.228-2.912-7.23"
                    transform="translate(24.658 0)"
                    fill="#fff500"
                  />
                  <rect
                    id="사각형_961"
                    data-name="사각형 961"
                    width="5.562"
                    height="13.041"
                    transform="translate(24.207 20.365)"
                    fill="#fff"
                  />
                  <path
                    id="패스_3329"
                    data-name="패스 3329"
                    d="M14.5,25.188l-1.183-.565C9.069,22.6,6.636,19.732,6.086,16.1,5.03,9.075,11.843,2.485,12.621,1.757L14.5,0l1.881,1.757c.778.728,7.591,7.318,6.535,14.347-.55,3.627-2.983,6.492-7.233,8.52Zm.006-17.171c-1.572,2.011-3.28,4.889-2.922,7.239.207,1.362,1.186,2.576,2.915,3.624,1.733-1.048,2.712-2.266,2.919-3.634.358-2.366-1.347-5.228-2.912-7.23"
                    transform="translate(12.479 0)"
                    fill="#fff500"
                  />
                  <rect
                    id="사각형_962"
                    data-name="사각형 962"
                    width="5.562"
                    height="13.041"
                    transform="translate(60.234 20.365)"
                    fill="#fff"
                  />
                  <path
                    id="패스_3330"
                    data-name="패스 3330"
                    d="M26.167,25.188l-1.183-.565c-4.25-2.024-6.683-4.892-7.233-8.52C16.695,9.075,23.508,2.485,24.286,1.757L26.167,0l1.878,1.757c.781.728,7.6,7.318,6.538,14.347-.547,3.624-2.98,6.5-7.233,8.523Zm0-17.165c-1.569,2.011-3.277,4.883-2.915,7.233.207,1.362,1.186,2.576,2.915,3.624,1.733-1.048,2.712-2.262,2.919-3.627.361-2.347-1.347-5.218-2.919-7.23"
                    transform="translate(36.84 0)"
                    fill="#fff500"
                  />
                  <path
                    id="패스_3331"
                    data-name="패스 3331"
                    d="M44.273,42.049,30.209,30.611,16.141,42.049.337,29.2,3.812,24.79,16.141,34.813,30.209,23.378,44.273,34.813,58.344,23.378,72.428,34.816,84.778,24.79,88.247,29.2,72.428,42.046,58.344,30.611Z"
                    transform="translate(0.705 49.982)"
                    fill="#fff"
                  />
                </g>
              </g>
            </g>
          </svg>
          이번달 생일자
        </H4>
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-top: 1.24rem;
            padding-bottom: 4rem;
            flex-grow: 1;
            overflow-y: scroll;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
            &::-webkit-scrollbar {
              display: none; /* Chrome, Safari, Opera*/
            }
            height: 100%;
            div + div {
              margin-top: 1rem;
            }
          `}
        >
          {parseStudents.size &&
            [...parseStudents.keys()].map((key) => (
              <OnBoardBirthdayCard key={key + "card"}>
                <P3
                  css={css`
                    font-family: "NanumSquareRoundOTF";
                    padding: 0.8rem 0;
                    width: 5rem;
                    font-size: calc(var(--font-size) * 1.32);
                    color: white;
                    position: relative;
                    &::after {
                      content: "";
                      position: absolute;
                      right: 0;
                      top: 0;
                      height: 100%;
                      width: 0.01rem;
                      background-color: white;
                    }
                  `}
                >
                  {key}일
                </P3>
                <P3
                  css={css`
                    margin-left: 1.4rem;
                    color: white;
                  `}
                >
                  {parseStudents.get(key)?.join(", ")}
                </P3>
              </OnBoardBirthdayCard>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

export default Birthday;

function OnBoardItem({
  item,
  onFirstClick,
  onDoubleClick,
  onBlur,
}: {
  item: Student;
  index: number;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
}) {
  return (
    <Card
      a11y={item.voicekey}
      // badge={item.title_keyword}
      classDescription={item.class_number_name}
      onFirstClick={onFirstClick}
      onDoubleClick={onDoubleClick}
      onBlur={onBlur}
      href={`/board?id=${item["416_id"]}`}
      image={getImagePath(item.caricature)}
      birth={item.birthday}
      title={item.name}
    />
  );
}

const OnBoardMonth = styled.div`
  border-color: ${(props) => props.theme.color.accent.foreground};
  border-width: 0.17em;
  border-radius: 9999rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12.95em;
  height: 3.2em;
  border-style: solid;
  margin-bottom: 0.6em;
  background-color: ${(props) => props.theme.color.background.card};
`;
const OnBoardShell = styled(MainShell)`
  justify-content: space-between;
  overflow: clip;
`;

const OnBoardBirthdayCard = styled.div`
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border},
    inset 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.inner};
  border: 0.15rem solid white;
  text-decoration: none;
  border-radius: 0.8rem;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 0.8rem;
  /* > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2.64rem;
    color: white;
    p {
      font-size: calc(var(--font-size) * 1.4);
    }
  } */
`;

const Saver = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100dvw;
  flex: 1 1 100%;
`;
