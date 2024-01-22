/** @jsxImportSource @emotion/react */
import ImageX from "@/components/ui/image";
import { H1, H4 } from "@/components/ui/text";
import { useCheckClick } from "@/hooks/use-check-click";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

interface OnBoardTitleProps {
  title: string;
}

export const OnBoardTitle = ({ title }: OnBoardTitleProps) => {
  const theme = useTheme();
  return (
    <H1
      css={css`
        font-family: EastSeaDokdo;
        font-size: 5.2rem;
        font-weight: 300;
      `}
    >
      <span
        css={css`
          color: ${theme.color.accent.foreground};
        `}
      >
        {title}
      </span>
      &nbsp;생일축하합니다
    </H1>
  );
};

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  href?: string;
  onFirstClick?: (ref: HTMLElement) => void;
}
export const Card = ({
  birth,
  image,
  title,
  href,
  onFirstClick,
}: CardProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const getBirthText = useCallback((birth: Date) => {
    const year = birth.getFullYear();
    const month = birth.getMonth();
    const date = birth.getDate();
    return `${year % 100}.${(month + "").padStart(2, "0")}.${(
      date + ""
    ).padStart(2, "0")}`;
  }, []);
  const birthText = birth instanceof Date ? getBirthText(birth) : birth;
  useCheckClick({
    ref,
    onFirstClick,
  });
  return (
    <CardLink to={href ?? ""} ref={ref}>
      <CardAvatar src={image} />
      <CardContent>
        <CardContentHeader>
          <span>{title}</span>
          <span>{birthText}</span>
        </CardContentHeader>
      </CardContent>
    </CardLink>
  );
};

const CardLink = styled(Link)`
  width: 18.1em;
  aspect-ratio: 25/ 32;
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

const CardAvatar = styled(ImageX)`
  height: 19rem;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  row-gap: 0.5em;
`;

const CardContentHeader = styled(H4)`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  color: ${(props) => props.theme.color.text.main};
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

export default { Card, OnBoardTitle };
