import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@mantine/core";
import { LabelInput } from "../../ui";
import { City } from "../../types";

type CityFormProps = {
  onSubmit: (value: any) => void;
  city?: City;
};

export const CityForm = ({ onSubmit, city }: CityFormProps) => {
  const methods = useForm({});
  const { register, handleSubmit, reset, formState } = methods;

  const { isDirty } = formState;

  useEffect(() => {
    if (city) {
      reset({
        ...city,
      });
    }
  }, [city]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <LabelInput label="Name:" name="cityName" register={register} />
        <LabelInput
          label="Division Name:"
          name="divisionName"
          register={register}
        />
        <LabelInput
          label="Division Abbreviation:"
          name="divisionAbbreviation"
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
