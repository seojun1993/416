/** @jsxImportSource @emotion/react */
import { H3, H4, P3 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, useRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCheckClick } from "@/hooks/use-check-click";
import { useSettingStore } from "@/contexts/setting.store";

type MenuCardProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    description: string;
    img: string;
    onFirstClick?: () => void;
  };

const DividerCss = styled(m.div)`
  background-color: white;
  height: 0.24rem;
  margin: 0.8rem 0;
`;

export const Divider = () => {
  return (
    <LazyMotion features={domAnimation}>
      <DividerCss
        initial={{ width: "0%" }}
        animate={{ width: "20%" }}
        transition={{ delay: 0.25 }}
      />
    </LazyMotion>
  );
};

export const MenuCard = ({
  title,
  description,
  img,
  onFirstClick,
  ...rest
}: MenuCardProps) => {
  const theme = useTheme();
  const { zoom, mode } = useSettingStore(({ zoom, mode }) => ({ zoom, mode }));
  const ref = useRef<HTMLAnchorElement>(null);
  useCheckClick({
    ref,
    onFirstClick,
  });
  return (
    <Link
      {...rest}
      ref={ref}
      css={css`
        background-color: ${theme.color.background.card};
        box-shadow: 0px 0px 0.4rem ${theme.color.shadow.card.border},
          inset 0px 0px 0.4rem ${theme.color.shadow.card.inner};
        border: 0.15rem solid white;
        text-decoration: none;
        border-radius: 0.8rem;
        flex: 0 0 calc(29% + ${zoom - 0.4}%);
        padding: 1.4rem 1rem 1.2rem 1rem;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 0.8rem;
        width: 100%;
        ${mode !== "wheel"
          ? `aspect-ratio: 1/1.36;
        `
          : ""}
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: column;
          flex: 1;
        `}
      >
        <H4
          css={css`
            color: white;
            letter-spacing: -0.05em;
          `}
        >
          {title}
        </H4>
        {mode !== "wheel" && <Divider />}
        {mode !== "wheel" && (
          <P3
            variant="secondary"
            css={css`
              color: white;
              white-space: pre-line;
              text-align: start;
              flex: 1;
            `}
          >
            {description}
          </P3>
        )}
      </div>
      {mode !== "wheel" && (
        <div
          css={css`
            flex: 2.5;
            display: flex;
            align-items: flex-end;
            overflow: hidden;
            background-color: #394154;
            border-radius: 1rem;
          `}
        >
          <img
            src={img}
            css={css`
              border-radius: 0.8rem;
              width: 100%;
              height: 100%;
              margin: 0 auto;
              transform: scale(${zoom});
              /* aspect-ratio: 1/1; */
            `}
          />
        </div>
      )}
    </Link>
  );
};

export default { Divider, MenuCard };
