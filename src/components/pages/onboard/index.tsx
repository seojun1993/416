/** @jsxImportSource @emotion/react */
import { H1 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
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
        margin-bottom: 3rem;
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

export default { OnBoardTitle };
