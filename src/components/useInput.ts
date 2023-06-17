import { useState } from "react";

const useInput = (initalValue: string) => {
  const [value, setValue] = useState(initalValue);

  const onChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  return {value, onChange}
};

export default useInput;
