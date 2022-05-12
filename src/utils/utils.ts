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

export const readFile = (file: File): Promise<string | ArrayBuffer | null> => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onabort = () => reject('file reading was aborted');
    reader.onerror = () => reject('file reading has failed');

    reader.onloadend = (e) => {
      resolve(e.target!.result);
    };

    reader.readAsDataURL(file);
  });
};

export const convertToBase64 = async (files: File[]): Promise<(string | ArrayBuffer)[]> => {
  const base64Arr: (string | ArrayBuffer)[] = [];

  for await (const file of files) {
    try {
      const base64 = await readFile(file);
      if (!base64) continue;
      base64Arr.push(base64);
    } catch (e) {
      console.error(e);
    }
  }

  return base64Arr;
};
