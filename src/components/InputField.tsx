import React from "react";
import { Field, ErrorMessage } from "formik";

interface InputFieldProps {
  type: string;
  name: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ type, name, placeholder }) => {
  return (
    <div className="font-public-sans mb-6">
      <Field
        type={type}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-md bg-custom-grey text-white focus:outline-none focus:border-green-500"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
};

export default InputField;
