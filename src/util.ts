/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/ban-types */

type WithTimerResult<T = any> = {
  result: T;
  time: number; // in ms
};

export function withTimer<T>(fn: Function) {
  return (...args: any[]): WithTimerResult<T> => {
    const a = performance.now();
    const result = fn(...args);
    const b = performance.now();
    return {
      result,
      time: b - a,
    };
  };
}

export function byteCount(s: string) {
  return new TextEncoder().encode(s).length;
}

export function bytesToSize(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export const perChange = (prev: number, now: number) =>
  Math.abs((now - prev) / prev);
