import { FileInput, Input, TextInput } from '@mantine/core'

interface ImageInputProps {
  label: string
  register: any
  name: string
  wrapperClass?: string
  labelClass?: string
  className?: string
}

export const ImageInput = ({
  label,
  register,
  name,
  wrapperClass,
  labelClass,
  className,
}: ImageInputProps) => {
  return (
    <Input.Wrapper className={`flex items-center ${wrapperClass}`}>
      <span className={`mr-2 w-1/3 text-right font-semibold ${labelClass}`}>
        {label}
      </span>
      <FileInput
        {...register(name)}
        className={`w-full rounded-md ${className}`}
      />
    </Input.Wrapper>
  )
}
