/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { HTMLAttributes, ReactNode } from "react";
interface CircleButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
}

// TODO : 공통 그림자 스타일 필요
const CircleButtonStyle = styled.button<{ hasChild: boolean }>`
  min-width: 2.2rem;
  border: none;
  background-color: white;
  border-radius: 999rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 20px rgb(0, 0, 0, 0.2);
  padding: ${(props) => (props.hasChild ? "0.4rem 1rem" : "0.4rem")};
  aspect-ratio: ${(props) => (props.hasChild ? "" : "1/1")};
  transition: background-color 0.1s ease-in-out;
  > * {
    transition: background-color 0.1s ease-in-out;
  }
  &:focus {
    outline: none;
  }
  &:active {
    background-color: gray;
    svg * {
      fill: white;
    }
    color: white;
  }
`;
const CircleButton = ({ icon, ...props }: CircleButtonProps) => {
  return (
    <CircleButtonStyle {...props} hasChild={!!props.children}>
      {icon}
      {props.children && (
        <span
          css={css({
            marginLeft: "0.4rem",
            whiteSpace: "nowrap",
            fontSize: "0.85rem",
            fontWeight: "bold",
          })}
        >
          {props.children}
        </span>
      )}
    </CircleButtonStyle>
  );
};

export default CircleButton;
