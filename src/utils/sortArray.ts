export const sortedArray = <T>(
  arr: Array<T>,
  key: keyof T,
  orderByIncrement: boolean = true
): Array<T> => {
  const copy: Array<T> = JSON.parse(JSON.stringify(arr));
  return copy.sort((a, b) => {
    return a[key] > b[key]
      ? orderByIncrement
        ? 1
        : -1
      : orderByIncrement
      ? -1
      : 1;
  });
};
