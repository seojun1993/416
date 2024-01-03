/** @jsxImportSource @emotion/react */
import ImageX from "@/components/image";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useCallback } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  description: string;
  href?: string;
}

const Card = ({ birth, description, image, title, href }: CardProps) => {
  const getBirthText = useCallback((birth: Date) => {
    const year = birth.getFullYear();
    const month = birth.getMonth();
    const date = birth.getDate();
    return `${year % 100}.${(month + "").padStart(2, "0")}.${(
      date + ""
    ).padStart(2, "0")}`;
  }, []);
  const birthText = birth instanceof Date ? getBirthText(birth) : birth;
  return (
    <CardLink to={href ?? ""}>
      <CardAvatar src={image} />
      <CardContent>
        <CardContentHeader>
          <span>{title}</span>
          <span>{birthText}</span>
        </CardContentHeader>
        <p
          css={css`
            color: #666666;
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
  background-color: ${(props) => props.theme.color.secondary.foreground};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  column-gap: 0.8rem;
  text-decoration: none;
  color: black;
`;

const CardAvatar = styled(ImageX)`
  height: fit-content;
  aspect-ratio: 9/8;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2em 1.8em 1.2em;
  text-align: center;
  row-gap: 0.5em;
`;

const CardContentHeader = styled.div`
  display: inline-flex;
  align-items: center;
  line-height: 1.3rem;
  margin: 0 auto;
  > span:first-of-type {
    display: inline-flex;
    position: relative;
    &::after {
      content: "";
      display: block;
      width: 0.1em;
      flex: 1;
      background-color: ${(props) => props.theme.color.button.active};
      border-radius: 1rem;
      margin: 0.2rem 0.5rem;
    }
  }
`;
