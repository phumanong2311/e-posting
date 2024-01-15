// CustomInput.tsx
import { DateTimePicker, DateValue } from "@mantine/dates";
import React, { ReactEventHandler } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CustomInputProps } from "../../types";

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  label,
  labelClass = "",
  containerClass = "",
}) => {
  const { register, getValues, control, setValue } = useFormContext(); // retrieve all hook methods

  const handleChange = (value: DateValue) => {
    setValue(name, value);
  };

  return (
    <div className={"flex gap-4 items-center w-full " + containerClass}>
      <label className={labelClass}>{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DateTimePicker
            {...field}
            {...register(name)}
            value={new Date(getValues(name))}
            onChange={handleChange}
            className="w-full rounded-md"
          />
        )}
      />
    </div>
  );
};

export default CustomInput;
