import {
  Ranger,
  RangerChangeEvent,
  RangerConfig,
  RangerInterpolator,
} from "@tanstack/react-ranger";

const linearInterpolator: RangerInterpolator = {
  getPercentageForValue: (val: number, min: number, max: number) => {
    return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  },
  getValueForClientX: (
    clientX: number,
    trackDims: { width: number; left: number },
    min: number,
    max: number
  ) => {
    const { left, width } = trackDims;
    const percentageValue = (clientX - left) / width;
    const value = (max - min) * percentageValue;
    return value + min;
  },
  getValueForClientY: (
    clientY: number,
    trackDims: { bottom: number; height: number },
    min: number,
    max: number
  ) => {
    const { bottom, height } = trackDims;
    const percentageValue = (bottom - clientY) / height;
    const value = (max - min) * percentageValue;
    return value + min;
  },
};

const sortNumList = (arr: ReadonlyArray<number | string>) =>
  [...arr].map(Number).sort((a, b) => a - b);

const getBoundingClientRect = (element: any) => {
  const rect = element.getBoundingClientRect();
  return {
    left: Math.ceil(rect.left),
    width: Math.ceil(rect.width),
    bottom: Math.ceil(rect.bottom),
    height: Math.ceil(rect.height),
  };
};

export type RangerOption<TTrackElement> = Omit<
  RangerConfig<TTrackElement>,
  "interpolator"
> & {
  tickSize?: number;
  interpolator?: typeof linearInterpolator;
  onChange?: RangerChangeEvent<TTrackElement>;
  debug?: boolean;
} & (
    | {
        stepSize: number;
      }
    | {
        steps: ReadonlyArray<number>;
      }
  );

export class Range<TTrackElement = unknown> extends Ranger<TTrackElement> {
  private element: TTrackElement | null = null;
  direction: "horizontal" | "vertical" = "horizontal";

  constructor(
    options: RangerOption<TTrackElement> & {
      direction?: "horizontal" | "vertical";
    }
  ) {
    const { direction, ...option } = options;
    super(option);
    this.element = option.getRangerElement();
    this.direction = direction ?? "horizontal";
    this.setOptions(options);
  }
  setOptions(opts: RangerOption<TTrackElement>) {
    Object.entries(opts).forEach(([key, value]) => {
      if (typeof value === "undefined") delete (opts as any)[key];
    });

    this.options = {
      debug: false,
      tickSize: 10,
      interpolator: linearInterpolator,
      onChange: () => {},
      ...opts,
    };
  }

  handlePress = (_e: any, i: number) => {
    this.activeHandleIndex = i;
    this.options.rerender();

    const handleRelease = () => {
      const { tempValues, handleDrag } = this;

      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("touchmove", handleDrag);
      document.removeEventListener("mouseup", handleRelease);
      document.removeEventListener("touchend", handleRelease);
      this.sortedValues = sortNumList(tempValues || this.options.values);
      if (this.options.onChange) {
        this.options.onChange(this);
      }
      if (this.options.onDrag) {
        this.options.onDrag(this);
      }
      this.activeHandleIndex = undefined;
      this.tempValues = undefined;
      this.options.rerender();
    };
    const { handleDrag } = this;
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("touchmove", handleDrag);
    document.addEventListener("mouseup", handleRelease);
    document.addEventListener("touchend", handleRelease);
  };

  handleDrag = (e: any) => {
    if (this.activeHandleIndex === undefined) {
      return;
    }

    const client = e.type === "touchmove" ? e.changedTouches[0] : e;
    // e.type === "touchmove" ? e.changedTouches[0].
    const clientPosition =
      this.direction === "horizontal" ? client.clientX : client.clientY;
    const newValue =
      this.direction === "horizontal"
        ? this.getValueForClientX(clientPosition)
        : this.getValueForClientY(clientPosition);
    const newRoundedValue = this.roundToStep(newValue);
    this.sortedValues = [
      ...this.options.values.slice(0, this.activeHandleIndex),
      newRoundedValue,
      ...this.options.values.slice(this.activeHandleIndex + 1),
    ];

    if (this.options.onDrag) {
      this.options.onDrag(this);
    } else {
      this.tempValues = this.sortedValues;
      this.options.rerender();
    }
  };

  getValueForClientX = (clientX: number) => {
    const trackDims = getBoundingClientRect(this.element);
    return this.options.interpolator.getValueForClientX(
      clientX,
      trackDims,
      this.options.min,
      this.options.max
    );
  };
  getValueForClientY = (clientY: number) => {
    const trackDims = getBoundingClientRect(this.element);
    return this.options.interpolator.getValueForClientY(
      clientY,
      trackDims,
      this.options.min,
      this.options.max
    );
  };
  handles = () => {
    return (this.tempValues || this.options.values).map((value, i) => ({
      value,
      isActive: i === this.activeHandleIndex,
      onKeyDownHandler: (e: any) => {
        this.handleKeyDown(e, i);
      },
      onMouseDownHandler: (e: any) => {
        this.handlePress(e, i);
      },
      onTouchStart: (e: any) => {
        this.handlePress(e, i);
      },
    }));
  };

  _willUpdate = () => {
    const rangerElement = this.options.getRangerElement();

    if (this.element !== rangerElement) {
      this.element = rangerElement;
    }
  };
}
