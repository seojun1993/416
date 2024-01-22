/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

interface InformationModalProps {
  duration?: number;
  modal?: boolean;
  cssStyles?: SerializedStyles;
}

const InformationModal = ({
  children,
  duration = 2000,
  modal = true,
  cssStyles,
}: PropsWithChildren<InformationModalProps>) => {
  const [open, setOpen] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (open) {
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          setOpen(false);
        }, 2000);
      }
    }
  }, []);
  console.log(cssStyles);
  return modal ? (
    createPortal(
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
                ${cssStyles}
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
    )
  ) : (
    <AnimatePresence>
      {open ? (
        <LazyMotion features={domAnimation}>
          <m.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              z-index: 9999;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              ${cssStyles?.styles}
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
    </AnimatePresence>
  );
};

export default InformationModal;
