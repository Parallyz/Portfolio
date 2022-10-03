export const sortedArray = <T>(
  arr: Array<T>,
  key: keyof T,
  orderByIncrement: boolean = true
): Array<T> => {
  const copy: Array<T> = JSON.parse(JSON.stringify(arr));
  return copy.sort((a, b) => {
    if (orderByIncrement) return a[key] > b[key] ? 1 : -1;
    else {
      return a[key] < b[key] ? 1 : -1;
    }
  });
};
