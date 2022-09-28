export const sortedArrayInc = <T>(arr: Array<T>, key: keyof T): Array<T> => {
  return [...arr].sort((a, b) => {
    return a[key] > b[key] ? 1 : -1;
  });
};

export const sortedArrayDec = <T>(arr: Array<T>, key: keyof T): Array<T> => {
  return [...arr].sort((a, b) => {
    return a[key] < b[key] ? 1 : -1;
  });
};
