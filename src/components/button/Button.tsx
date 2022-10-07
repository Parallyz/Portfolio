import React from "react";

interface ButtonProps {
  children?: React.ReactElement;
  disabled: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ children, disabled, onClick }: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={() => onClick}>
      {children}
    </button>
  );
};

export default Button;
