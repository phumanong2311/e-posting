// CustomInput.tsx
import { InputWrapper, TextInput } from "@mantine/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomInputProps } from "../../types";

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  isNumber = false,
  labelClass = "",
  containerClass = "",
}) => {
  const { register, getValues, control, setValue } = useFormContext(); // retrieve all hook methods

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(name, value);
  };

  return (
    <div className={"flex gap-4 items-center w-full " + containerClass}>
      <label className={labelClass}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            {...register(name)}
            onChange={handleChange}
            className="w-full rounded-md"
          />
        )}
      />
    </div>
  );
};

export default CustomInput;
