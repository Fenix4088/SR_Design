export const compose =
  <F extends Array<Function>, A extends Array<any>>(...fns: F): any =>
  (...args: A) =>
    fns.reduce((value, func) => func(value), args);
