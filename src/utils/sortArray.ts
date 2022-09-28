export const sortedArrayInc = <T>(arr: Array<T>, key: keyof T): Array<T> => {
  const copy: Array<T> = JSON.parse(JSON.stringify(arr));
  return copy.sort((a, b) => {
    return a[key] > b[key] ? 1 : -1;
  });
};

export const sortedArrayDec = <T>(arr: Array<T>, key: keyof T): Array<T> => {
  const copy: Array<T> = JSON.parse(JSON.stringify(arr));
  return copy.sort((a, b) => {
    return a[key] < b[key] ? 1 : -1;
  });
};
