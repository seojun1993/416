/** @jsxImportSource @emotion/react */
import MenuComponents from "@/components/pages/menu";
import { H1 } from "@/components/ui/text";
import { MainShell } from "@/components/common/main-shell";
import { css, useTheme } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
const Menu = () => {
  const theme = useTheme();
  const [emblaRef] = useEmblaCarousel({
    skipSnaps: true,
    dragFree: true,
  });
  const a = "123";
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
            <MenuComponents.MenuCard
              to="/"
              title="기억 공간"
              description={`메뉴에 대한 설명이 들어갑니다.\n메뉴에 대한 설명이 들어갑니다.`}
              img="https://placehold.co/800x800"
            />
            <MenuComponents.MenuCard
              to="/"
              title="기억 명단"
              description={`메뉴에 대한 설명이 들어갑니다.\n메뉴에 대한 설명이 들어갑니다.`}
              img="https://placehold.co/800x800"
            />
            <MenuComponents.MenuCard
              to="/cloud"
              title="워드클라우드"
              description="메뉴에 대한 설명이 들어갑니다.메뉴에 대한 설명이 들어갑니다."
              img="https://placehold.co/800x800"
            />
            <MenuComponents.MenuCard
              to="/"
              title="순례길"
              description="메뉴에 대한 설명이 들어갑니다.메뉴에 대한 설명이 들어갑니다."
              img="https://placehold.co/800x800"
            />
            <MenuComponents.MenuCard
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
