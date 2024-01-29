/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, LazyMotion, domAnimation, m } from "framer-motion";

interface NoutFoundModalProps {
  duration?: number;
  modal?: boolean;
  open?: boolean;
  onChange?: (state: boolean) => void;
  cssStyles?: SerializedStyles;
}

const NotFoundModal = ({
  children,
  onChange,
  open: defaultOpen = true,
  duration = 2000,
  modal = true,
  cssStyles,
}: PropsWithChildren<NoutFoundModalProps>) => {
  const [open, setOpen] = useState(defaultOpen);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const onChangeOpen = (state: boolean) => {
    setOpen(state);
    onChange && onChange(state);
  };

  useEffect(() => {
    if (open !== defaultOpen) {
      onChangeOpen(defaultOpen);
    }
  }, [defaultOpen]);
  useEffect(() => {
    if (open) {
      if (duration > 0) {
        timeoutRef.current = setTimeout(() => {
          onChangeOpen(false);
        }, duration);
      }
    }
  }, [open]);

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
                onChangeOpen(false);
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
              onChangeOpen(false);
            }}
          >
            {children}
          </m.div>
        </LazyMotion>
      ) : null}
    </AnimatePresence>
  );
};

export default NotFoundModal;
