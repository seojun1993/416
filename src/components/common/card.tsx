/** @jsxImportSource @emotion/react */
import { useCheckClick } from "@/hooks/use-check-click";
import { SerializedStyles, css } from "@emotion/react";
import styled from "@emotion/styled";
import { memo, useCallback, useRef } from "react";
import ImageX from "../ui/image";
import { H4, P2, P3 } from "../ui/text";
import { m } from "framer-motion";
import { Link } from "react-router-dom";

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  classDescription: string;
  badge?: string;
  href?: string;
  onFirstClick?: (ref: HTMLElement) => void;
  onDoubleClick?: (ref: HTMLElement) => void;
  onBlur?: (ref: HTMLElement | null) => void;
  linkStyle?: SerializedStyles;
  contentHeaderStyle?: SerializedStyles;
  a11y?: string;
}
export const Card = memo(
  ({
    birth,
    image,
    badge,
    title,
    href,
    linkStyle,
    contentHeaderStyle,
    a11y,
    onBlur,
    onFirstClick,
    onDoubleClick,
  }: CardProps) => {
    const ref = useRef<HTMLAnchorElement>(null);
    const getBirthText = useCallback((birth: Date) => {
      const month = birth.getMonth() + 1;
      const date = birth.getDate();
      return `${(month + "").padStart(2, "0")}.${(date + "").padStart(2, "0")}`;
      // return `${(month + "").padStart(2, "0")}월 ${(date + "").padStart(
      //   2,
      //   "0"
      // )}일`;
    }, []);
    const birthText = getBirthText(
      birth instanceof Date ? birth : new Date(birth)
    );
    useCheckClick({
      ref,
      onFirstClick,
      onDoubleClick,
      onBlur,
    });

    return (
      <CardLink
        data-a11y-id={a11y}
        to={href ?? ""}
        ref={ref}
        css={css`
          aspect-ratio: 25/32;
          ${linkStyle && linkStyle}
        `}
      >
        <CardAvatar src={image}>
          {badge && <CardBadge>{badge}</CardBadge>}
        </CardAvatar>
        <CardContent>
          {/* <CardClassNumber>
            <P3>{classDescription}</P3>
          </CardClassNumber> */}
          <CardContentHeader contentHeaderStyle={contentHeaderStyle}>
            {title}
          </CardContentHeader>
        </CardContent>
      </CardLink>
    );
  }
);

const CardClassNumber = styled.div`
  padding: 0.3rem 0;
  background-color: ${(props) => props.theme.color.card.class};
`;

const CardLink = styled(m(Link))`
  width: 100%;
  height: 100%;
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

const CardBadge = styled(P2)`
  white-space: nowrap;
  position: absolute;
  top: 0.8rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 2rem;
  border-radius: 9999rem;
  border: 0.16rem solid ${(props) => props.theme.color.badge.border};
  background-color: ${(props) => props.theme.color.badge.background};
  color: ${(props) => props.theme.color.badge.text};
`;

const CardAvatar = styled(ImageX)`
  /* height: 19rem; */
  background-color: #fff;
  object-fit: fill;
`;

const CardContent = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  height: 30%;
`;

const CardContentHeader = styled(H4)<{ contentHeaderStyle?: SerializedStyles }>`
  display: inline-flex;
  align-items: center;
  flex-grow: 1;
  margin: 0 auto;
  padding: 0.5rem 0;
  color: ${(props) => props.theme.color.text.main};
  ${(props) => props.contentHeaderStyle && props.contentHeaderStyle}
`;
