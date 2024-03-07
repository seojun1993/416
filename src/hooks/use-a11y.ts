import { sendA11yEvent } from "@/libs/utils";
import { useEffect, useRef } from "react";

export const useA11y = (
  id: string | { id: string; once: string },
  deps?: readonly unknown[]
) => {
  const firstRenderState = useRef(false);
  useEffect(() => {
    if (typeof id !== "string") {
      if (!firstRenderState.current) {
        sendA11yEvent(id.once);
      } else {
        sendA11yEvent(id.id);
      }
    } else {
      sendA11yEvent(id);
    }
  }, deps ?? []);
};
