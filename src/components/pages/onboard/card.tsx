/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";

interface CardProps {
  image: string;
  title: string;
  birth: string | Date;
  description: string;
}

const Card = ({ birth, description, image, title }: CardProps) => {
  const theme = useTheme();
  const getBirthText = (birth: Date) => {
    const year = birth.getFullYear();
    const month = birth.getMonth();
    const date = birth.getDate();
    return `${year % 100}.${(month + "").padStart(2, "0")}.${(
      date + ""
    ).padStart(2, "0")}`;
  };
  const birthText = birth instanceof Date ? getBirthText(birth) : birth;
  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        border: 1px solid #eeeeee;
        border-radius: 0.5rem;
        padding: 1rem 1.4rem;
        background-color: white;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        column-gap: 0.8rem;
      `}
    >
      <img src={image} />

      <div
        css={css`
          display: flex;
          flex-direction: column;
          height: 100%;
        `}
      >
        <div
          css={css`
            display: inline-flex;
            align-items: center;
            line-height: 65px;
          `}
        >
          <span>{title}</span>
          <div
            css={css({
              width: "8px",
              height: "48px",
              backgroundColor: theme.color.button.active,
              borderRadius: "1rem",
              margin: "0 0.5rem",
            })}
          />
          <span>{birthText}</span>
        </div>
        <p
          css={css`
            color: #666666;
            white-space: normal;
          `}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
