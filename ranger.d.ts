export declare module "@tanstack/ranger" {
  interface RangerInterpolator {
    getPercentageForValue: (val: number, min: number, max: number) => number;
    getValueForClientX: (
      clientX: number,
      trackDims: {
        width: number;
        left: number;
      },
      min: number,
      max: number
    ) => number;
    getValueForClientY: (
      clientY: number,
      trackDims: {
        bottom: number;
        height: number;
      },
      min: number,
      max: number
    ) => number;
  }
}
