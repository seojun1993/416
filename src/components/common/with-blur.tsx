import styled from "@emotion/styled";
export type DIRECTION = "left" | "right" | "top" | "bottom";

const StyleFromDirection: { [key in DIRECTION]: string } = {
  bottom: `
  left:0;
  bottom: 0%;
  height: 10%;
  width: 100%;
  `,
  left: `
  left: 0;
  bottom: 0%;
  height: 100%;
  width: 10%;
  `,
  right: `
  right: 0;
  bottom: 0%;
  height: 100%;
  width: 10%;
  `,
  top: `
  left: 0;
  top:0;
  height: 100%;
  width: 10%;
  `,
};

const getStylesFromDirection = (direction: DIRECTION) => {
  return StyleFromDirection[direction];
};

export const WithBlur = styled.div<{ direction?: DIRECTION }>`
  position: relative;
  &::after {
    ${(props) => {
      return getStylesFromDirection(props.direction ?? "right");
    }}
    position: absolute;
    content: "";
    pointer-events: none;
    background: ${(props) =>
      `linear-gradient(to ${props.direction ?? "right"}, transparent, ${
        props.theme.color.primary.foreground
      } 90%)`};
  }
`;
