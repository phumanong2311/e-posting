// CustomInput.tsx
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CustomInputProps } from "../../types";

const RichEditor: React.FC<CustomInputProps> = ({
  name,
  label,
  labelClass = "",
  containerClass = "",
}) => {
  const { register, getValues, control, setValue } = useFormContext(); // retrieve all hook methods

  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: getValues(name),
  });
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
          <RichTextEditor
            editor={editor}
            {...field}
            {...register(name)}
            onChange={handleChange}
            className="w-full rounded-md h-[300px]"
          >
            <RichTextEditor.Content />
          </RichTextEditor>
        )}
      />
    </div>
  );
};

export default RichEditor;
