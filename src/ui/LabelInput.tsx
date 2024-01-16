import { Input, TextInput } from "@mantine/core";

interface LabelInputProps {
  label: string;
  register: any;
  name: string;
  wrapperClass?: string;
  inputClass?: string;
}

export const LabelInput = ({
  label,
  register,
  name,
  wrapperClass,
  inputClass,
}: LabelInputProps) => {
  return (
    <Input.Wrapper className={`flex items-center ${wrapperClass}`}>
      <span className="mr-2 w-1/3 text-right font-semibold">{label}:</span>
      <TextInput
        {...register(name)}
        className={`w-full rounded-md ${inputClass}`}
      />
    </Input.Wrapper>
  );
};
