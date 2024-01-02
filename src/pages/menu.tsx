/** @jsxImportSource @emotion/react */
import { Header } from "@/components/common/header";

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
    // skipSnaps: true,
  });
  return (
    <MainShell
      css={css`
        background-image: url("/assets/메뉴_배경.png");
        position: relative;
        &::after {
          right: 0;
          bottom: -1%;
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
        <Header>메뉴</Header>
        <div
          ref={emblaRef}
          css={css`
            overflow: hidden;
          `}
        >
          <div
            css={css`
              padding: 0.8rem 0;
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
        padding: 1rem;
        background-color: ${theme.color.secondary.foreground};
        border-radius: 0.8rem;
        box-shadow: 0px 0px 0.4rem rgba(0, 0, 0, 0.15);
        position: relative;
        max-width: 18rem;
        text-decoration: none;
      `}
    >
      <h2
        css={css`
          color: ${theme.color.text.main};
          font-size: 1.6rem;
          padding-top: 0.6rem;
          padding-bottom: 0.8rem;
        `}
      >
        {title}
      </h2>
      <Divider />
      <p
        css={css`
          color: ${theme.color.text.sub};
          padding-top: 0.8rem;
          margin-bottom: 4rem;
          white-space: pre-line;
        `}
      >
        {description}
      </p>
      <img
        src={img}
        css={css`
          height: 16rem;
          aspect-ratio: 1/1;
          border-radius: 0.8rem;
          overflow: hidden;
        `}
      />
    </Link>
  );
}

const DividerCss = styled(m.div)`
  background-color: ${(props) => props.theme.color.accent.foreground};
  height: 0.24rem;
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
