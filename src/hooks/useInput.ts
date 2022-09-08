import { useState } from "react";

function useInput(initialValue: string): any {
  const [value, setValue] = useState<string>(initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const clear = () => setValue("");

  return {
    bind: { value, onChange },
    value,
    clear,
  };
}
