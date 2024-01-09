import type { PropsWithChildren, HTMLAttributes } from "react";
import BottomBar from "./bottom-bar";
import styled from "@emotion/styled";

type AppShellProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

const AppShell = ({ children, ...props }: AppShellProps) => {
  return (
    <Shell {...props}>
      <ShellContent>{children}</ShellContent>
      <BottomBar />
    </Shell>
  );
};

export default AppShell;
const Shell = styled.div((props) => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  color: "white",
}));

const ShellContent = styled.div`
  flex-grow: 1;
  overflow: hidden;
  background-color: ${(props) => props.theme.color.primary.foreground};
  background-image: url("/assets/bg.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;
