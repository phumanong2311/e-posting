import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { LabelInput } from "../../ui";
import { Country } from "../../types";

type CountryFormProps = {
  onSubmit: (value: any) => void;
  country?: Country;
};

export const CountryForm = ({ onSubmit, country }: CountryFormProps) => {
  const methods = useForm({});
  const { register, handleSubmit, reset, formState } = methods;

  const { isDirty } = formState;

  useEffect(() => {
    if (country) {
      reset({
        ...country,
      });
    }
  }, [country]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <LabelInput label="Name:" name="countryName" register={register} />
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
