import styled from "@emotion/styled";

export const WithBlur = styled.div`
  position: relative;
  &::after {
    right: 0;
    bottom: -1%;
    position: absolute;
    content: "";
    height: 100%;
    width: 10%;
    pointer-events: none;
    background: ${(props) =>
      `linear-gradient(to right, transparent, ${props.theme.color.primary.foreground} 90%)`};
  }
`;
