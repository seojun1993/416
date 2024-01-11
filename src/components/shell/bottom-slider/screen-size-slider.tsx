/** @jsxImportSource @emotion/react */
import React from "react";
import BottomSlider from "./bottom-slider";
import { P4 } from "@/components/ui/text";
import { css, useTheme } from "@emotion/react";
import {
  RangerOptions,
  Ranger as RangerType,
  useRanger,
} from "@tanstack/react-ranger";
import { useCustomRanger } from "@/hooks/use-custom-ranger";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useSettingStore } from "@/contexts/setting.store";
const ScreenSizeSlider = () => {
  const [zoom, setZoom] = useSettingStore((state) => [
    state.zoom,
    state.setZoom,
  ]);
  const [values, setValues] = React.useState<ReadonlyArray<number>>([1]);
  const rangerRef = React.useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [mode] = useThemeMode();
  const defaultRangerOptions = {
    values: [zoom] as number[],
    min: 1,
    max: 2,
  };
  const steps = [1, 1.5, 2];

  const rangerInstance = useCustomRanger<HTMLDivElement>({
    ...defaultRangerOptions,
    direction: "vertical",
    steps,
    getRangerElement: () => rangerRef.current,
    onChange: (instance) => {},
    onDrag: (instance: RangerType<HTMLDivElement>) => {
      setZoom(instance.sortedValues[0]);
      console.log(instance.sortedValues);
    },
  });

  return (
    <BottomSlider
      css={css`
        padding: 0.46em 0.37em;
      `}
    >
      <div
        ref={rangerRef}
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-end;
          cursor: pointer;
          user-select: none;
          position: relative;
          margin: 0.45em 0;
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
                `}
              >
                <div
                  css={css`
                    height: calc(7.72em - 0.9em);
                    border-radius: 0.8em;
                    background-color: ${theme.color.switch.disable};
                    position: relative;
                    width: 0.2em;
                    left: 50%;
                    transform: translateX(-50%);
                  `}
                >
                  <div
                    css={css`
                      border-radius: 0.8em;
                      position: absolute;
                      bottom: 0;
                      height: ${100 *
                      ((zoom - rangerInstance.options.min) /
                        (rangerInstance.options.max -
                          rangerInstance.options.min))}%;
                      width: 100%;
                      transition: height 0.1s ease-in-out;
                      background-color: ${theme.color.switch.enable};
                    `}
                  />
                </div>
                {steps.map((item) => {
                  const keyValue = Math.abs(item);

                  return (
                    <button
                      key={item}
                      onClick={() => {
                        setZoom(keyValue);
                      }}
                      css={css`
                        position: absolute;
                        border: none;
                        height: 1.08em;
                        aspect-ratio: 2/1;
                        transform: translate(-50%, 50%);
                        outline: none;
                        border-radius: 9999rem;
                        z-index: ${isActive ? "1" : "0"};
                        left: 50%;
                        bottom: ${100 *
                        ((item - rangerInstance.options.min) /
                          (rangerInstance.options.max -
                            rangerInstance.options.min))}%;
                        transition: bottom 0.1s ease-in-out;
                        background-color: white;
                        box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.3);
                        border-radius: 9999rem;
                        text-align: center;
                      `}
                    >
                      <P4
                        css={css`
                          font-size: 0.68em;
                          font-weight: bold;
                          ${mode === "dark" && "mix-blend-mode: difference"};
                          color: ${theme.color.text.main};
                        `}
                      >
                        x{keyValue}
                      </P4>
                    </button>
                  );
                })}

                <div
                  onKeyDown={onKeyDownHandler}
                  onMouseDown={onMouseDownHandler}
                  onTouchStart={onTouchStart}
                  role="slider"
                  aria-valuemin={rangerInstance.options.min}
                  aria-valuemax={rangerInstance.options.max}
                  aria-valuenow={value}
                  css={css`
                    position: absolute;
                    border: none;
                    height: 1.08em;
                    aspect-ratio: 2/1;
                    transform: translate(-50%, 50%);
                    outline: none;
                    border-radius: 9999rem;
                    z-index: ${isActive ? "1" : "0"};
                    left: 50%;
                    bottom: ${rangerInstance.getPercentageForValue(value)}%;
                    transition: bottom 0.1s ease-in-out;
                    background-color: ${theme.color.switch.enable};
                    box-shadow: 0 0 0.2em rgba(0, 0, 0, 0.3);
                    border-radius: 9999rem;
                    text-align: center;
                    mix-blend-mode: multiply;
                  `}
                ></div>
              </div>
            )
          )}
      </div>
      <P4
        css={css`
          mix-blend-mode: difference;
          font-size: 0.68em;
        `}
      >
        화면크기
      </P4>
    </BottomSlider>
  );
};

export default ScreenSizeSlider;
