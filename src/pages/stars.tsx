/** @jsxImportSource @emotion/react */
import { Card } from "@/components/common/card";
import { MainShell } from "@/components/common/main-shell";
import StarCloud from "@/components/pages/stars/cloud";
import EmblaCarousel from "@/components/ui/carousel";
import ImageX from "@/components/ui/image";
import { H1, H4, H5, P2, P3 } from "@/components/ui/text";
import { useCheckClick } from "@/hooks/use-check-click";
import { Prefetch } from "@/libs/plugins/prefetch";
import { getImagePath } from "@/libs/utils";
import { getFilteredStudentsByMonthQuery } from "@/queries/student";
import { SerializedStyles, css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { Suspense, memo, useCallback, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { m } from "framer-motion";

const Stars = () => {
  const { data: students } = useQuery(
    getFilteredStudentsByMonthQuery(new Date().getMonth())
  );
  const theme = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Prefetch({
      onSelect(selectedIndex) {},
    }),
  ]);

  const SlideCardAspect = useMemo(
    () => Math.min(5, students?.length ?? 0),
    [students]
  );

  return (
    <MemoryShell
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
          padding: 1.34rem 0;
          flex-grow: 1;
          width: 100%;
          overflow: hidden;
          overflow-x: scroll;
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
            width: calc((460px + 1.6rem) * ${SlideCardAspect});
            display: flex;
            align-items: flex-end;
            /* max-height: 11.4rem; */
            height: 100%;
          `}
          carouselType={[emblaRef, emblaApi]}
          slides={students}
          options={{ animate: false }}
        >
          {(item, index) => {
            return (
              <SmallCard
                linkStyle={css`
                  width: ${(1 / SlideCardAspect) *
                  (emblaApi?.containerNode().children[0].clientWidth ?? 0)};
                  aspect-ratio: 10 / 12.3;
                `}
                badge={item.title_keyword}
                classDescription={item.class_number}
                onFirstClick={() => {
                  console.log();
                  emblaApi?.scrollTo(index);
                  // emblaApi?.scrollTo(
                  //   index -
                  //     (SlideCardAspect % 2 === 0
                  //       ? Math.floor(SlideCardAspect / 4)
                  //       : Math.floor(SlideCardAspect / 2))
                  // );
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
  border-width: 0.15rem;
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
}
export const SmallCard = memo(
  ({
    birth,
    image,
    badge,
    classDescription,
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
        to={href ?? ""}
        ref={ref}
        css={css`
          aspect-ratio: 25/32;
          ${linkStyle && linkStyle}
        `}
      >
        <CardAvatar src={image}></CardAvatar>
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
  height: 19rem;
  background-color: #fff;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
`;

const CardContentHeader = styled(H5)<{ contentHeaderStyle?: SerializedStyles }>`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  padding: 0.5rem 0;
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
