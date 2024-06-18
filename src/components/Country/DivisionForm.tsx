import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { LabelInput } from "../../ui";
import { Division } from "../../types";

type DivisionFormProps = {
  onSubmit: (value: any) => void;
  division?: Division;
};

export const DivisionForm = ({ onSubmit, division }: DivisionFormProps) => {
  const methods = useForm({});
  const { register, handleSubmit, reset, formState } = methods;

  const { isDirty } = formState;

  useEffect(() => {
    if (division) {
      reset({
        ...division,
      });
    }
  }, [division]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <LabelInput label="Name:" name="divisionName" register={register} />
        <LabelInput
          label="Division Abbreviation:"
          name="divisionAbbreviation"
          register={register}
        />
        <LabelInput
          label="Division Type:"
          name="divisionType"
          register={register}
        />
        <LabelInput label="Country:" name="countryName" register={register} />
        <LabelInput label="Status:" name="status" register={register} />
      </div>

      <div className="flex justify-end gap-5 items-center">
        <Button
          type="submit"
          className={`rounded-lg border-1 cursor-pointer ${
            !isDirty ? "border-red-200 text-gray-300" : ""
          }`}
          title="Save"
          variant="outline"
          size="sm"
        >
          Save
        </Button>
      </div>
    </form>
  );
};
