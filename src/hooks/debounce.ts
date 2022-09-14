import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300): string {
  const [debounced, SetDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      SetDebounced(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
