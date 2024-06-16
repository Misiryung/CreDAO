// InputBalance.tsx
import React, { useState } from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";

const InputElement = styled("input")(({ theme }) => `
  width: 80px;
  font-size: 1rem;
  line-height: 1.2;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.2px solid #000;
`);

const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

interface InputBalanceProps {
  onChange: (value: string) => void;
}

const InputBalance: React.FC<InputBalanceProps> = ({ onChange }) => {
  const [inputBalanceValue, setInputBalanceValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputBalanceValue(value);
    onChange(value);
  };

  return <Input aria-label="Demo input" placeholder="0" onChange={handleInputChange} value={inputBalanceValue} />;
};

export default InputBalance;
