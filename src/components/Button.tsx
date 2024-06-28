import React, { FC } from "react";
import { ButtonProps } from "../types";

const Button: FC<ButtonProps> = ({
  href,
  children,
  className,
  type = "button",
  onClick,
  disabled,
}) => {
  if (href) {
    return (
      <a
        href={href}
        className={`flex bg-custom-green items-center justify-center text-black rounded-full hover:bg-green-500  ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={`bg-custom-green text-black rounded-full hover:bg-green-500 ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
