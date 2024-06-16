import React, { useState } from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { styled } from "@mui/system";

const InputElement = styled("input")(
  ({ theme }) => `
  width: 295px;
  font-size: 1rem;
  line-height: 1.2;
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.2px solid #000;
`
);

const Input = React.forwardRef(function CustomInput(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});

interface InputAddressProps {
  onChange: (value: string) => void;
}

const InputAddress: React.FC<InputAddressProps> = ({ onChange }) => {
  const [inputAddressValue, setinputAddressValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setinputAddressValue(value);
    onChange(value);
  };

  return <Input aria-label="Demo input" placeholder="请输入公钥 (0x)" onChange={handleInputChange} />;
}

export default InputAddress;
