/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-types */

type WithTimerResult = {
  result: any;
  time: number; // in ms
};

export function withTimer(fn: Function) {
  return (...args: any[]): WithTimerResult => {
    const a = performance.now();
    const result = fn(...args);
    const b = performance.now();
    return {
      result,
      time: b - a,
    };
  };
}
