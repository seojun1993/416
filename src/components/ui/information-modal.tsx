/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LazyMotion, domAnimation, m, useAnimation } from "framer-motion";

const InformationModal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const controls = useAnimation();

  const toggleOpen = () => {
    if (open) {
      controls.start({ opacity: 0 }).then(() => setOpen(false));
    } else {
      controls.start({ opacity: 1 }).then(() => setOpen(true));
    }
  };

  useEffect(() => {
    if (open) {
      controls.start({ opacity: 1 });
    }
  }, []);

  return open
    ? createPortal(
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0 }}
            animate={controls}
            css={css`
              position: fixed;
              width: 100%;
              z-index: 9999;
              top: 0;
              left: 0;
              height: calc(100dvh - var(--bottom-height));
              display: flex;
              align-items: center;
              justify-content: center;
            `}
            onClick={() => {
              toggleOpen();
            }}
          >
            {children}
          </m.div>
        </LazyMotion>,
        document.body
      )
    : null;
};

export default InformationModal;
