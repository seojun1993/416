import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
interface CircleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

const CircleButton = ({ icon, ...props }: CircleButtonProps) => {
  return (
    <CircleButtonStyle {...props} hasChild={!!icon && !!props.children}>
      {icon}
      {props.children && (
        <CircleButtonChildSpan hasIcon={!!icon}>
          {props.children}
        </CircleButtonChildSpan>
      )}
    </CircleButtonStyle>
  );
};

export default CircleButton;

const CircleButtonStyle = styled.button<{ hasChild: boolean }>`
  height: 1.7em;
  border: none;
  background-color: white;
  border-radius: 999rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 0.3em rgb(0, 0, 0, 0.2);
  padding: ${(props) => (props.hasChild ? "0.4em 0.7em" : "0.4em")};
  aspect-ratio: ${(props) => (props.hasChild ? "" : "1/1")};
  transition: background-color 0.1s ease-in-out;
  > * {
    transition: background-color 0.1s ease-in-out;
    width: 100;
  }
  > svg {
    max-height: 0.68em;
  }
  &:focus {
    outline: none;
  }
  &:active {
    background-color: gray;
    svg * {
      fill: white;
      stroke: white;
    }
    color: white;
  }
`;

const CircleButtonChildSpan = styled.span<{ hasIcon: boolean }>`
  margin-left: ${(props) => (props.hasIcon ? "0.4em" : "")};
  white-space: nowrap;
  font-size: 0.68em;
  font-weight: bold;
  line-height: 0.65em;
`;
