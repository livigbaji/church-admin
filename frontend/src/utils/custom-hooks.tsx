import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useCustomState<T>(_value: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(_value);

  useEffect(() => {
    setValue(_value);
  }, [_value]);

  return [value, setValue];
}
