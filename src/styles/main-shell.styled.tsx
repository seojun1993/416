/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { HTMLMotionProps, motion } from "framer-motion";
import { PropsWithChildren } from "react";

export const MainShell = ({
  ...rest
}: PropsWithChildren<HTMLMotionProps<"main">>) => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      css={css`
        display: flex;
        padding: 2.5rem 1.6rem;
        height: 100%;
        max-height: calc(100dvh - var(--bottom-height));
        overflow-y: clip;
      `}
      {...rest}
    />
  );
};
