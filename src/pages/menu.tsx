/** @jsxImportSource @emotion/react */
import MenuComponents from "@/components/pages/menu";
import { H1 } from "@/components/ui/text";
import { MainShell } from "@/components/common/main-shell";
import { css, useTheme } from "@emotion/react";
import useEmblaCarousel from "embla-carousel-react";
import { menuContent } from "@/constants/menu";
const Menu = () => {
  const theme = useTheme();
  const [emblaRef, emblaApi] = useEmblaCarousel({
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
            {Object.entries(menuContent).map((메뉴, index) => (
              <MenuComponents.MenuCard
                key={메뉴[1].title}
                onFirstClick={() => {
                  emblaApi?.scrollTo(index - 1);
                }}
                to={메뉴[1].href}
                title={메뉴[1].title}
                description={메뉴[1].description}
                img={메뉴[1].src}
              />
            ))}
          </div>
        </div>
      </section>
    </MainShell>
  );
};

export default Menu;
