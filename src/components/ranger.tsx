/** @jsxImportSource @emotion/react */
import { useThemeMode } from "@/hooks/use-theme-mode";
import { css, useTheme } from "@emotion/react";
import { Ranger as RangerType, useRanger } from "@tanstack/react-ranger";
import React from "react";

const Ranger = () => {
  const [values, setValues] = React.useState<ReadonlyArray<number>>([10]);
  const rangerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const rangerInstance = useRanger<HTMLDivElement>({
    getRangerElement: () => rangerRef.current,
    values,
    min: 0,
    max: 100,
    stepSize: 5,
    onDrag: (instance: RangerType<HTMLDivElement>) => {
      setValues(instance.sortedValues);
    },
  });

  return (
    <div
      css={css`
        height: 2rem;
        display: flex;
        align-items: center;
        border-radius: 1rem;
        padding: 0.2rem;
        cursor: pointer;
        column-gap: 1rem;
        user-select: none;
        position: relative;
      `}
    >
      <div
        ref={rangerRef}
        css={css`
          height: 0.3em;
          border-radius: 0.8em;
          background-color: ${theme.color.switch.disable};
          position: absolute;
          width: 100%;
        `}
      >
        <div
          css={css`
            border-radius: 0.8em;
            position: absolute;
            height: 100%;
            width: ${values[0]}%;
            transition: none;
            background-color: ${theme.color.switch.enable};
          `}
        />
      </div>
      {rangerInstance
        .handles()
        .map(
          (
            {
              value,
              onKeyDownHandler,
              onMouseDownHandler,
              onTouchStart,
              isActive,
            },
            i
          ) => (
            <button
              key={i}
              onKeyDown={onKeyDownHandler}
              onMouseDown={onMouseDownHandler}
              onTouchStart={onTouchStart}
              role="slider"
              aria-valuemin={rangerInstance.options.min}
              aria-valuemax={rangerInstance.options.max}
              aria-valuenow={value}
              css={css`
                position: relative;
                border: none;
                height: 100%;
                aspect-ratio: 1/1;
                transform: translate(-50%, -50%);
                outline: none;
                border-radius: 9999rem;
                z-index: ${isActive ? "1" : "0"};
                top: 50%;
                left: ${rangerInstance.getPercentageForValue(value)}%;
                background-color: white;
                box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.3);
                border-radius: 9999rem;
              `}
            />
          )
        )}
    </div>
  );
};

export default Ranger;
