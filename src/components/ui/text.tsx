import type { CSSInterpolation } from "@emotion/serialize";
import styled from "@emotion/styled";

type CSSVariant<T extends string> = {
  [key in T]: CSSInterpolation;
};
const FontVariants: CSSVariant<"primary" | "secondary"> = {
  primary: {
    fontWeight: 800,
  },
  secondary: {
    fontWeight: 400,
  },
};
type Variant = { variant?: keyof typeof FontVariants };

export const H1 = styled.h1<Variant>`
  font-family: "NanumSquareRoundOTF", sans-serif;
  font-size: calc(var(--font-size) * 2.4);
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H2 = styled.h2<Variant>`
  font-family: "NanumSquareRoundOTF", sans-serif;
  font-size: 2.28rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H3 = styled.h3<Variant>`
  font-family: "NanumSquareRoundOTF", sans-serif;
  font-size: calc(var(--font-size) * 2);
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H4 = styled.h4<Variant>`
  font-family: "NanumSquareRoundOTF", sans-serif;
  font-size: calc(var(--font-size) * 1.6);
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H5 = styled.h5<Variant>`
  font-family: "NanumSquareRoundOTF", sans-serif;
  font-size: calc(var(--font-size) * 1.2);
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;

export const P1 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 1.2);
  color: ${(props) => props.theme.color.text.main};
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P2 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: 1rem;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P3 = styled.p<Variant & { concrete?: boolean }>`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 1.12);
  line-height: 1.2;
  color: ${(props) => props.theme.color.text.main};
  text-align: center;
  font-weight: 700;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P4 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: calc(var(--font-size) * 0.88);
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
