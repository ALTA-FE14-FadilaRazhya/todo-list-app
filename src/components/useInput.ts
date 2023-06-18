import { useState } from "react";

const useInput = (initalValue: string) => {
  const [value, setValue] = useState(initalValue);

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const set = (data : string) => {
    setValue(data)
  }

  return {value, onChange, set}
};

export default useInput;
