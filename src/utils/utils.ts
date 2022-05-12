export const compose =
  <F extends Array<Function>, A extends Array<any>>(...fns: F): any =>
  (...args: A) =>
    fns.reduce((value, func) => func(value), args);

export const filterByMIME = (files: FileList, predicate: (type: string) => boolean): File[] =>
  Array.from(files).filter((file) => predicate(file.type));

type TMIMECheckerAPI = {
  [Key in 'checkImageMIMEType' | 'checkExcelMIMEType']: (param: string) => boolean;
};

export const MIMECheckerAPI: TMIMECheckerAPI = {
  checkImageMIMEType: (str: string): boolean => /image\/jpeg|png/.test(str),
  checkExcelMIMEType: (str: string): boolean => /vdn\.(ms-excel|openxmlformats)/.test(str),
};
