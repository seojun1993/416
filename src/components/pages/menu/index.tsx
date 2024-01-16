/** @jsxImportSource @emotion/react */
import { H3, H4, P4 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, useRef } from "react";
import { Link, LinkProps } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useCheckClick } from "@/hooks/use-check-click";

type MenuCardProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    description: string;
    img: string;
    painter: string;
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
  painter,
  ...rest
}: MenuCardProps) => {
  const theme = useTheme();
  const ref = useRef<HTMLAnchorElement>(null);
  useCheckClick({
    ref,
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
        flex: 0 0 27%;
        padding: 1.4rem 1rem;
        position: relative;
        display: flex;
        flex-direction: column;
        border-radius: 0.8rem;
        aspect-ratio: 1/1.487;
      `}
    >
      <H3
        css={css`
          color: white;
          padding-top: 0.6rem;
          letter-spacing: -0.05em;
        `}
      >
        {title}
      </H3>
      <Divider />
      <P4
        variant="secondary"
        css={css`
          color: white;
          white-space: pre-line;
          flex: 1;
        `}
      >
        {description}
      </P4>
      <div
        css={css`
          border-radius: 0.8rem;
          overflow: hidden;
          position: relative;
        `}
      >
        <img
          src={img}
          css={css`
            width: 100%;
            height: 100%;
            margin: 0 auto;
            /* aspect-ratio: 1/1; */
          `}
        />
        <div
          css={css`
            position: absolute;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.6);
            height: 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            color: black;
          `}
        >
          {painter}
        </div>
      </div>
    </Link>
  );
};

export default { Divider, MenuCard };
