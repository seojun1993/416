import styled from "@emotion/styled";
import { PropsWithChildren } from "react";
interface BottomSliderProps {
  dir?: "left" | "right";
}
const BottomSlider = ({
  children,
  dir = "left",
  ...rest
}: PropsWithChildren<BottomSliderProps>) => {
  return (
    <Root {...rest} dir={dir}>
      {children}
    </Root>
  );
};

export default BottomSlider;

const Root = styled.div<{ dir: "left" | "right" }>`
  position: fixed;
  width: 3.1em;
  outline: 0.13em solid #ffffff;
  outline-offset: -0.04em;
  display: flex;
  flex-direction: column;
  row-gap: 0.31em;
  border-radius: 0.32em;
  align-items: center;
  padding: 0.6rem 0.48rem;
  ${(props) => ({ [props.dir]: "2.1dvw" })}
  background-color: ${(props) => props.theme.color.background.secondary};
  bottom: calc(0.61em + var(--bottom-height));
`;
