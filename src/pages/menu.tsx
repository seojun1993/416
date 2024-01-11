/** @jsxImportSource @emotion/react */
import { Header } from "@/components/common/header";
import { H1, H4, P4 } from "@/components/ui/text";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { MainShell } from "@/styles/main-shell.styled";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import useEmblaCarousel from "embla-carousel-react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { HTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
const Menu = () => {
  const theme = useTheme();
  const [emblaRef] = useEmblaCarousel({
    skipSnaps: true,
    dragFree: true,
  });
  return (
    <MainShell
      padding={false}
      css={css`
        position: relative;
        &::after {
          right: 0;
          bottom: 0%;
          position: absolute;
          content: "";
          height: 100%;
          width: 10%;
          pointer-events: none;
          background: ${`linear-gradient(to right, transparent, ${theme.color.primary.foreground} 90%)`};
        }
      `}
    >
      <section
        css={css`
          width: 100%;
        `}
      >
        <H1
          css={css`
            padding: 0 1.6rem;
            margin-bottom: 0.8rem;
          `}
        >
          메뉴
        </H1>
        <div
          ref={emblaRef}
          css={css`
            overflow: hidden;
          `}
        >
          <div
            css={css`
              padding: 0.8em 1.6em;
              column-gap: 2.6rem;
              backface-visibility: hidden;
              display: flex;
              touch-action: pan-y;
              min-width: 0;
            `}
          >
            <MenuCard
              to="/"
              title="기억 공간"
              description={`메뉴에 대한 설명이 들어갑니다.\n메뉴에 대한 설명이 들어갑니다.`}
              img="https://placehold.co/800x800"
            />
            <MenuCard
              to="/"
              title="기억 명단"
              description={`메뉴에 대한 설명이 들어갑니다.\n메뉴에 대한 설명이 들어갑니다.`}
              img="https://placehold.co/800x800"
            />
            <MenuCard
              to="/cloud"
              title="워드클라우드"
              description="메뉴에 대한 설명이 들어갑니다.메뉴에 대한 설명이 들어갑니다."
              img="https://placehold.co/800x800"
            />
            <MenuCard
              to="/"
              title="순례길"
              description="메뉴에 대한 설명이 들어갑니다.메뉴에 대한 설명이 들어갑니다."
              img="https://placehold.co/800x800"
            />
            <MenuCard
              to="/"
              title="공간 안내"
              description="메뉴에 대한 설명이 들어갑니다.메뉴에 대한 설명이 들어갑니다."
              img="https://placehold.co/800x800"
            />
          </div>
        </div>
      </section>
    </MainShell>
  );
};

export default Menu;

type MenuCardProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    description: string;
    img: string;
  };

function MenuCard({ title, description, img, ...rest }: MenuCardProps) {
  const theme = useTheme();

  return (
    <Link
      {...rest}
      css={css`
        background-color: ${theme.color.background.card};
        border-radius: 0.8rem;
        box-shadow: 0px 0px 0.4rem ${theme.color.shadow.card.border};
        border: 0.15rem solid white;
        text-decoration: none;
      `}
    >
      <div
        css={css`
          padding: 1.4rem 1rem;
          width: 18rem;
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 0.8rem;
          box-shadow: inset 0px 0px 0.4rem ${theme.color.shadow.card.inner};
        `}
      >
        <H4
          css={css`
            color: ${theme.color.text.main};
            padding-top: 0.6rem;
          `}
        >
          {title}
        </H4>
        <Divider />
        <P4
          variant="secondary"
          css={css`
            color: white;
            margin-bottom: 4rem;
            white-space: pre-line;
          `}
        >
          {description}
        </P4>
        <img
          src={img}
          css={css`
            height: 15.3em;
            margin: 0 auto;
            aspect-ratio: 1/1;
            border-radius: 0.8rem;
            overflow: hidden;
          `}
        />
      </div>
    </Link>
  );
}

const DividerCss = styled(m.div)`
  background-color: white;
  height: 0.24rem;
  margin: 0.8rem 0;
`;

function Divider() {
  return (
    <LazyMotion features={domAnimation}>
      <DividerCss
        initial={{ width: "0%" }}
        animate={{ width: "20%" }}
        transition={{ delay: 0.25 }}
      />
    </LazyMotion>
  );
}
