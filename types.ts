import { Interpolation, Theme } from "@emotion/react";
import { HTMLAttributes } from "react";
export type HTMLAttributesWithCSS<T extends HTMLElement> = HTMLAttributes<T> & {
  css?: Interpolation<Theme>;
};
