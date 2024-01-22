/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

const InformationModal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (open) {
      timeoutRef.current = setTimeout(() => {
        setOpen(false);
      }, 2000);
    }
  }, []);

  return createPortal(
    <AnimatePresence>
      {open ? (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              clearTimeout(timeoutRef.current);
              setOpen(false);
            }}
          >
            {children}
          </m.div>
        </LazyMotion>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};

export default InformationModal;
