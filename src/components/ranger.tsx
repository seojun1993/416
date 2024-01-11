/** @jsxImportSource @emotion/react */
import { css, useTheme } from "@emotion/react";
import {
  RangerOptions,
  Ranger as RangerType,
  useRanger,
} from "@tanstack/react-ranger";
import React, { HTMLAttributes, useMemo } from "react";

interface RangerProps extends HTMLAttributes<HTMLDivElement> {
  options?: Omit<RangerOptions<HTMLDivElement>, "getRangerElement"> &
    (
      | {
          stepSize: number;
        }
      | {
          steps: ReadonlyArray<number>;
        }
    );
}

const DefaultRangerOptions = {
  min: 0,
  max: 100,
  values: [10],
  steps: [0, 25, 50, 75, 100],
};

const Ranger = ({ options = DefaultRangerOptions, ...rest }: RangerProps) => {
  const [values, setValues] = React.useState<ReadonlyArray<number>>(
    options.values ?? [0]
  );
  const rangerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const defaultRangerOptions = {
    values,
    min: 0,
    max: 100,
    steps: [0, 25, 50, 75, 100],
    onDrag: (instance: RangerType<HTMLDivElement>) => {
      setValues(instance.sortedValues);
    },
  };
  const { values: v, ...optionsProps } = options;
  const rangerInstance = useRanger<HTMLDivElement>({
    ...defaultRangerOptions,
    ...optionsProps,
    getRangerElement: () => rangerRef.current,
  });

  return (
    <div
      ref={rangerRef}
      {...rest}
      css={css`
        height: 1.54em;
        display: flex;
        align-items: center;
        border-radius: 1rem;
        padding: 0.15em;
        cursor: pointer;
        column-gap: 1rem;
        user-select: none;
        position: relative;
      `}
    >
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
            <div
              key={i}
              css={css`
                width: 100%;
                height: 100%;
              `}
            >
              <div
                css={css`
                  height: 0.3em;
                  border-radius: 0.8em;
                  background-color: ${theme.color.switch.disable};
                  position: absolute;
                  width: 100%;
                  top: 50%;
                  transform: translateY(-50%);
                `}
              >
                <div
                  css={css`
                    border-radius: 0.8em;
                    position: absolute;
                    height: 100%;
                    width: ${values[0]}%;
                    transition: width 0.1s ease-in-out;
                    background-color: ${theme.color.switch.enable};
                  `}
                />
              </div>
              <div
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
                  transition: left 0.1s ease-in-out;
                  background-color: white;
                  box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.3);
                  border-radius: 9999rem;
                `}
              />
            </div>
          )
        )}
    </div>
  );
};

export default Ranger;
