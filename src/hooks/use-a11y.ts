import { sendA11yEvent } from "@/libs/utils";
import { useEffect } from "react";

export const useA11y = (id: string) => {
  useEffect(() => {
    sendA11yEvent(id);
  }, []);
};
