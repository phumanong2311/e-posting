import { DateTimePicker } from "@mantine/dates";

interface DatePickerUIProps {
  label: string;
  name: string;
  value: any,
  onChange?: any;
  register?: any;
  wrapperClass?: string;
  labelClass?: string;
  className?: string;
}

export const DatePickerUI = ({
  label,
  name,
  onChange,
  value,
  register,
  wrapperClass,
  labelClass,
  className
}: DatePickerUIProps) => {
  return (
    <div className={`flex items-center ${wrapperClass}`}>
      <span className={`mr-2 w-1/3 text-right font-semibold ${labelClass}`}>{label}</span>
      <DateTimePicker
        {...register(name)}
        value={new Date(value)}
        onChange={onChange}
        className={`w-full rounded-md ${className}`}
      />
    </div>
  );
};
