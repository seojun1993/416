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
  font-family: "NanumSquareRoundOTF";
  font-size: 2.4rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H2 = styled.h2<Variant>`
  font-family: "NanumSquareRoundOTF";
  font-size: 2.28rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H3 = styled.h3<Variant>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.84rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H4 = styled.h4<Variant>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.6rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const H5 = styled.h5<Variant>`
  font-family: "NanumSquareRoundOTF";
  font-size: 1.64rem;
  line-height: 1;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;

export const P1 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: 1.08rem;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P2 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: 1rem;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P3 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: 0.92rem;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
export const P4 = styled.p<Variant>`
  font-family: "Pretendard";
  font-size: 0.88rem;
  ${(props) => FontVariants[props.variant ?? "primary"]}
`;
