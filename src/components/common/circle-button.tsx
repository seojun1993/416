import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
interface CircleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  active?: boolean;
}

const CircleButton = ({
  icon,
  active = false,
  ...props
}: CircleButtonProps) => {
  return (
    <CircleButtonStyle
      {...props}
      active={active}
      hasChild={!!icon && !!props.children}
    >
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

const CircleButtonStyle = styled.button<{ hasChild: boolean; active: boolean }>`
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
  color: ${(props) => (props.active ? "#8080FF" : "black")};
  fill: ${(props) => (props.active ? "#8080FF" : "black")};
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
    color: #8080ff;
    svg * {
      fill: #8080ff;
    }
  }
`;

const CircleButtonChildSpan = styled.span<{ hasIcon: boolean }>`
  margin-left: ${(props) => (props.hasIcon ? "0.4em" : "")};
  white-space: nowrap;
  font-size: 0.68em;
  font-weight: bold;
  line-height: 0.65em;
`;
