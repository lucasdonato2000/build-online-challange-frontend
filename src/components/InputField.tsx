import React from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { InputFieldProps } from "../types";

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  className,
  hideValue,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="relative w-full">
      {type === "textarea" ? (
        <textarea
          name={name}
          onChange={hideValue ? () => {} : onChange}
          value={hideValue ? "" : value}
          placeholder={placeholder}
          className={`w-full p-2 mt-1 rounded-md focus:outline-none focus:border-green-500 ${className}`}
          style={{ color: hideValue ? "transparent" : "inherit" }}
          readOnly={hideValue}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={hideValue ? "" : value}
          onChange={hideValue ? () => {} : onChange}
          placeholder={placeholder}
          className={`w-full p-2 mt-1 rounded-md focus:outline-none focus:border-green-500 pr-10 ${className}`}
          data-value={value}
          style={{ color: hideValue ? "transparent" : "inherit" }}
          readOnly={hideValue}
        />
      )}
      {type === "text" && name === "profilePicture" && (
        <>
          <MdOutlineFileUpload
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
            size={24}
            onClick={handleIconClick}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
};

export default InputField;
