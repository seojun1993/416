/** @jsxImportSource @emotion/react */
import { H4, P4 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes } from "react";
import { Link, LinkProps } from "react-router-dom";
import { LazyMotion, domAnimation, m } from "framer-motion";

type MenuCardProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    description: string;
    img: string;
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
  ...rest
}: MenuCardProps) => {
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
};

export default { Divider, MenuCard };
