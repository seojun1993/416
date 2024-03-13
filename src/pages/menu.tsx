/** @jsxImportSource @emotion/react */
import MenuComponents from "@/components/pages/menu";
import { H1 } from "@/components/ui/text";
import { MainShell } from "@/components/common/main-shell";
import { css, useTheme } from "@emotion/react";
import { menuContent } from "@/constants/menu";
import { useA11y } from "@/hooks/use-a11y";
import { useSettingStore } from "@/contexts/setting.store";
const Menu = () => {
  const mode = useSettingStore((state) => state.mode);
  const theme = useTheme();

  useA11y(mode === "sound" ? "entire_menu_detail" : "entire_menu");
  return (
    <MainShell
      padding={false}
      css={css`
        position: relative;
        flex-direction: column;
        /* &::after {
          right: 0;
          bottom: 0%;
          position: absolute;
          content: "";
          height: 100%;
          width: 10%;
          pointer-events: none;
          background: ${`linear-gradient(to right, transparent, ${theme.color.primary.foreground} 90%)`};
        } */
      `}
    >
      {mode === "wheel" && (
        <div
          css={css`
            flex: 1;
          `}
        />
      )}
      <section
        css={css`
          width: 100%;
          display: flex;
          flex-direction: column;
        `}
      >
        <H1
          css={css`
            padding: 0 1.6rem;
            margin-bottom: 0.8rem;
            text-align: center;
          `}
        >
          메뉴
        </H1>
        <div
          css={css`
            overflow: hidden;
            flex-grow: 1;
            display: flex;
            column-gap: 2rem;
            padding: 0.8em 1.6em;
          `}
        >
          {/* <div
            css={css`
              padding: 0.8em 1.6em;
              column-gap: 2rem;
              display: flex;
              height: 100%;
              width: 100%;
            `}
          ></div> */}
          {Object.entries(menuContent).map((메뉴, index) => (
            <MenuComponents.MenuCard
              data-a11y-id={메뉴[1].a11y}
              key={메뉴[1].title}
              // onFirstClick={() => {
              //   emblaApi?.scrollTo(index - 1);
              // }}
              to={메뉴[1].href}
              title={메뉴[1].title}
              description={메뉴[1].description}
              img={메뉴[1].src}
            />
          ))}
        </div>
      </section>
    </MainShell>
  );
};

export default Menu;
