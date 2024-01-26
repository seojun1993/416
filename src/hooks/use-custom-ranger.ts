import React from "react";
import { Range, RangerOption } from "../libs/range";
import { RangerConfig, RangerOptions } from "@tanstack/react-ranger";
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export function useCustomRanger<TTrackElement>(
  options: RangerOptions<TTrackElement> & {
    direction?: "horizontal" | "vertical";
  }
): Range<TTrackElement> {
  const rerender = React.useReducer(() => ({}), {})[1];
  const resolvedOptions: RangerConfig<TTrackElement> = {
    ...options,
    rerender,
    onChange: (instance) => {
      rerender();
      options.onChange?.(instance);
    },
  };

  const [instance] = React.useState(
    () => new Range<TTrackElement>(resolvedOptions)
  );

  instance.setOptions(resolvedOptions);

  useIsomorphicLayoutEffect(() => {
    return instance._willUpdate();
  });

  return instance;
}
