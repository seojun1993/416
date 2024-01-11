/** @jsxImportSource @emotion/react */
import ImageX from "@/components/image";
import { useCheckClick } from "@/hooks/use-check-click";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  description: string;
  href?: string;
}

const Card = ({ birth, description, image, title, href }: CardProps) => {
  const theme = useTheme();
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
  useCheckClick({ ref });
  return (
    <CardLink to={href ?? ""} ref={ref}>
      <CardAvatar src={image} />
      <CardContent>
        <CardContentHeader>
          <span>{title}</span>
          <span>{birthText}</span>
        </CardContentHeader>
        <p
          css={css`
            color: ${theme.color.text.sub};
            white-space: normal;
            line-height: 1.3rem;
            white-space-collapse: preserve-breaks;
          `}
        >
          {description}
        </p>
      </CardContent>
    </CardLink>
  );
};

export default Card;

const CardLink = styled(Link)`
  width: 18.1em;
  border: 1px solid #eeeeee;
  border-radius: 0.7em;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.background.secondary};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  column-gap: 0.8rem;
  text-decoration: none;
  color: ${(props) => props.theme.color.text.main};
`;

const CardAvatar = styled(ImageX)`
  height: fit-content;
  aspect-ratio: 9/8;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2em 1.8em 3.8em 1.8em;
  text-align: center;
  row-gap: 0.5em;
`;

const CardContentHeader = styled.div`
  display: inline-flex;
  align-items: center;
  line-height: 1.3rem;
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
