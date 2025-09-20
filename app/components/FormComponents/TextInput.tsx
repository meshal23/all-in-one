import React, { type FC } from "react";
import { cn } from "~/lib/utils";

interface TextInputProps {
  title: string;
  type: string;
  id: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeHolder?: string;
  className?: string;
  required?: boolean;
}

const TextInput: FC<TextInputProps> = ({
  title,
  type = "text",
  id,
  name,
  value,
  onChange,
  placeHolder,
  className,
  required = false,
}: TextInputProps) => {
  return (
    <>
      <label
        htmlFor="name"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {title}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={onChange}
        className={cn(
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
          className
        )}
        placeholder={placeHolder}
        required={required}
      />
    </>
  );
};

export default TextInput;
