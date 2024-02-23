import { useState, useEffect } from 'react'
import {
  FileButton,
  Input,
  TextInput,
  UnstyledButton,
  Image,
} from '@mantine/core'
import { IconPhoto } from '@tabler/icons-react'

interface ImageInputProps {
  label: string
  register: any
  name: string
  wrapperClass?: string
  labelClass?: string
  className?: string
  onChange: (file: File) => void
  value: string | null
}

export const ImageInput = ({
  label,
  register,
  name,
  wrapperClass,
  labelClass,
  value = null,
  onChange,
  className,
}: ImageInputProps) => {
  const [file, setFile] = useState<File | string | null>(value)
  const [previewFile, setPreviewFile] = useState(value)
  const onUploadFile = (e) => {
    setFile(e)
    const src = URL.createObjectURL(e)
    setPreviewFile(src)
    onChange(e)
  }

  useEffect(() => {
    if (value) {
      setFile(value)
      if (typeof value === 'string') {
        setPreviewFile(value)
      }
    }
  }, [value])

  return (
    <Input.Wrapper className={`flex items-center ${wrapperClass}`}>
      <div
        className={`mr-2 w-1/3 text-right font-semibold ${labelClass} flex flex-col items-end`}
      >
        {label}
        <FileButton
          accept="image/*"
          {...register(name)}
          onChange={onUploadFile}
        >
          {(props) => (
            <p {...props} className="text-xs text-cyan-700">
              Upload
            </p>
          )}
        </FileButton>
      </div>
      <div className="w-full">
        <Image
          src={previewFile}
          alt="Company Logo"
          w={80}
          h={80}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
        />
      </div>
    </Input.Wrapper>
  )
}
