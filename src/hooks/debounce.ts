import { useEffect, useState } from "react";

export function useDebounce(
  value: string | number,
  delay: number = 300
): string | number {
  const [debounced, SetDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      SetDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
