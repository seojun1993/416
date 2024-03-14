/** @jsxImportSource @emotion/react */
import { MainShell } from "@/components/common/main-shell";
import StarCloud from "@/components/pages/stars/cloud";
import EmblaCarousel from "@/components/ui/carousel";
import ImageX from "@/components/ui/image";
import { H1, H5, P2, P3 } from "@/components/ui/text";
import { useCheckClick } from "@/hooks/use-check-click";
import { Prefetch } from "@/libs/plugins/prefetch";
import { getImagePath } from "@/libs/utils";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { Suspense, memo, useCallback, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { m } from "framer-motion";
import { getAllKeywordWithStudents } from "@/queries/keyword";
import { fadeInOutVariants } from "@/variants";
import { useA11y } from "@/hooks/use-a11y";

const Stars = () => {
  const { data: students } = useQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );
  const { data: keywords } = useSuspenseQuery(getAllKeywordWithStudents());
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedKeyword = searchParams.get("label");
  const selectedStudents = useMemo(() => {
    return keywords.find((item) => item.name === selectedKeyword)?.students;
  }, [selectedKeyword, keywords]);

  const theme = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Prefetch({
      onSelect(selectedIndex) {},
    }),
  ]);

  const SlideCardAspect = useMemo(
    () => Math.min(5, selectedStudents?.length ?? students?.length ?? 0),
    [students, selectedStudents]
  );

  useA11y("word_cloud");
  return (
    <MemoryShell
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          delay: 0.3,
        },
      }}
      css={css`
        flex-direction: column;
        row-gap: 1.6rem;
        padding-bottom: 2rem;
      `}
    >
      <MemoryHeader>
        <span
          css={css`
            color: ${theme.color.yellow};
          `}
        >
          별
        </span>
        을 터치하여 희생자를 만나보세요
      </MemoryHeader>
      <StarsSpace
        css={css`
          /* mrgi: 1.34rem 0; */
          flex-grow: 1;
          width: 100%;
          height: 100%;
          overflow: hidden;
          display: flex;
        `}
      >
        <Suspense fallback={<></>}>
          <StarCloud />
        </Suspense>
      </StarsSpace>
      {students ? (
        <EmblaCarousel
          aspect={1 / SlideCardAspect}
          cssSlide={css`
            width: calc((9.2rem + 1.6rem) * ${SlideCardAspect});
            display: flex;
            align-items: flex-end;
            height: fit-content;
            /* max-height: 11.4rem; */
          `}
          showArrow={SlideCardAspect >= 5}
          carouselType={[emblaRef, emblaApi]}
          slides={selectedStudents ?? students}
          options={{ animate: false }}
          arrow={() => (
            <>
              <LeftButton
                data-disable-focus-effect="true"
                onClick={() => {
                  emblaApi?.scrollPrev();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="54.482"
                  height="96.969"
                  viewBox="0 0 54.482 96.969"
                >
                  <path
                    id="prev_icon"
                    d="M-20078.957-17310.031l-40,40,40,40"
                    transform="translate(20124.955 17318.516)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  />
                </svg>
                <P3 css={css``}>이전</P3>
              </LeftButton>
              <RightButton
                data-disable-focus-effect="true"
                onClick={() => {
                  emblaApi?.scrollNext();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="54.486"
                  height="96.969"
                  viewBox="0 0 54.486 96.969"
                >
                  <path
                    id="naxt_icon"
                    d="M-20118.957-17310.031l40,40-40,40"
                    transform="translate(20127.441 17318.516)"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="12"
                  />
                </svg>
                <P3 css={css``}>다음</P3>
              </RightButton>
            </>
          )}
        >
          {(item, index) => {
            return (
              <SmallCard
                key={item.id + index}
                a11y={item.voicekey}
                linkStyle={css`
                  width: ${(1 / SlideCardAspect) *
                  (emblaApi?.containerNode().children[0].clientWidth ?? 0)};
                  aspect-ratio: 10 / 12.3;
                `}
                badge={""}
                classDescription={item.class_number_name}
                onFirstClick={() => {
                  emblaApi?.scrollTo(index);
                }}
                href={`/board?id=${item["416_id"]}`}
                image={getImagePath(item.caricature)}
                birth={item.birthday}
                title={item.name}
              />
            );
          }}
        </EmblaCarousel>
      ) : null}
    </MemoryShell>
  );
};

export default Stars;

const LeftButton = styled.button`
  position: absolute;
  left: -2rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.4rem;
  width: 4rem;
  height: 4.8rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;
const RightButton = styled.button`
  position: absolute;
  right: -2rem;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 0.4rem;
  width: 4rem;
  height: 4.8rem;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.3);
  background-color: ${(props) =>
    props.theme.themeMode === "light" ? "#ffffff" : props.theme.color.yellow};
  row-gap: 0.48rem;
  path {
    stroke: ${(props) =>
      props.theme.themeMode === "light"
        ? props.theme.color.accent.foreground
        : "black"};
  }
  transition: opacity 0.2s ease-in-out;
  &:active {
    opacity: 0.7;
  }
  > svg {
    width: 0.8rem;
    height: 1.6rem;
  }
  p {
    color: black;
  }
`;

const MemoryShell = styled(MainShell)`
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.6rem;
`;

const MemoryHeader = styled(H1)`
  text-align: center;
`;

const StarsSpace = styled.div`
  background-color: ${(props) => props.theme.color.background.card};
  box-shadow: 0px 0px 0.4rem ${(props) => props.theme.color.shadow.card.border};
  border-width: 0.07rem;
  border-color: rgba(255, 255, 255, 0.7);
  border-style: solid;
  transition: border-color 0.2s ease-in-out;
  border-radius: 0.4rem;
`;

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  classDescription: string;
  badge?: string;
  href?: string;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
  linkStyle?: SerializedStyles;
  contentHeaderStyle?: SerializedStyles;
  a11y?: string;
}
export const SmallCard = memo(
  ({
    birth,
    image,
    badge,
    classDescription,
    a11y,
    title,
    href,
    linkStyle,
    contentHeaderStyle,
    onBlur,
    onFirstClick,
    onDoubleClick,
  }: CardProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const getBirthText = useCallback((birth: Date) => {
      const month = birth.getMonth() + 1;
      const date = birth.getDate();
      return `${(month + "").padStart(2, "0")}.${(date + "").padStart(2, "0")}`;
      // return `${(month + "").padStart(2, "0")}월 ${(date + "").padStart(
      //   2,
      //   "0"
      // )}일`;
    }, []);
    const birthText = getBirthText(
      birth instanceof Date ? birth : new Date(birth)
    );
    useCheckClick({
      ref,
      onFirstClick,
      onDoubleClick,
      onBlur,
    });

    return (
      <CardLink
        data-a11y-id={a11y}
        to={href ?? ""}
        ref={ref}
        css={css`
          aspect-ratio: 25/32;
          ${linkStyle && linkStyle}
        `}
        initial="initial"
        animate="animate"
        variants={fadeInOutVariants}
        transition={{
          duration: 0.7,
          delay: 0.5,
        }}
      >
        <CardAvatar src={image}>
          {badge && <CardBadge>{badge}</CardBadge>}
        </CardAvatar>
        <CardContent>
          <CardClassNumber>
            <P3>{classDescription}</P3>
          </CardClassNumber>
          <CardContentHeader contentHeaderStyle={contentHeaderStyle}>
            <span>{title}</span>
            <span>{birthText}</span>
          </CardContentHeader>
        </CardContent>
      </CardLink>
    );
  }
);

const CardClassNumber = styled.div`
  padding: 0.3rem 0;
  background-color: ${(props) => props.theme.color.card.class};
`;

const CardLink = styled(m(Link))`
  width: 9.2rem;
  height: 100%;
  outline: 1px solid #eeeeee;
  border-radius: 0.7em;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.background.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  column-gap: 0.8rem;
  text-decoration: none;
  margin: 0 auto;
  color: ${(props) => props.theme.color.text.main};

  & > div + div {
    border-top: 0.13dvw solid #999999;
  }
`;

const CardBadge = styled(P2)`
  white-space: nowrap;
  position: absolute;
  top: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 2rem;
  border-radius: 9999rem;
  border: 0.16rem solid ${(props) => props.theme.color.badge.border};
  background-color: ${(props) => props.theme.color.badge.background};
  color: ${(props) => props.theme.color.badge.text};
`;

const CardAvatar = styled(ImageX)`
  background-color: #fff;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  height: 30%;
`;

const CardContentHeader = styled(H5)<{ contentHeaderStyle?: SerializedStyles }>`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  padding-bottom: 0.5rem;
  margin-top: 0.2rem;
  color: ${(props) => props.theme.color.text.main};
  ${(props) => props.contentHeaderStyle && props.contentHeaderStyle}
  > span:first-of-type {
    display: inline-flex;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 0.14em;
      flex: 1;
      background-color: ${(props) => props.theme.color.accent.foreground};

      border-radius: 1rem;
      margin: 0.2rem 0.5rem;
    }
  }
`;
