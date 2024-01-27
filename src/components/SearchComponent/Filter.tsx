import { Button, Select } from "@mantine/core";
import { SearchParameter } from "../../types";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
interface FilterProps {
  searchParameter: SearchParameter;
  onChangeParameter: (name: string, value: string) => void;
  onResetFilter?: () => void;
}

export const Filter = ({ onChangeParameter, onResetFilter }: FilterProps) => {
  const { control, getValues, reset, setValue } = useForm({});

  const onReset = () => {
    if (onResetFilter) {
      onResetFilter();
      // Set null to the value to make sure the UI will clear the selected value
      reset({
        workLocationType: null,
        employmentType: null,
        yearsOfExperience: null,
        closingDate: null,
      });
    }
  };

  const onChange = (name: keyof SearchParameter, value: string) => {
    setValue(name, value);
    onChangeParameter(name, value);
  };

  return (
    <form className="w-full px-16 flex justify-between items-center gap-4 mt-5">
      <Controller
        name="workLocationType"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Onsite/Remote"
            data={[
              {
                value: "Onsite",
                label: "Onsite",
              },
              {
                value: "Remote",
                label: "Remote",
              },
              {
                value: "Hybrid",
                label: "Hybrid",
              },
            ]}
            radius={100}
            className="w-full"
            {...field}
            onChange={(value) => onChange("workLocationType", value as string)}
          />
        )}
      />
      <Controller
        name="employmentType"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Full Time/Contract"
            data={[
              {
                value: "Full Time",
                label: "Fulltime",
              },
              {
                value: "Part Time",
                label: "Part Time",
              },
              {
                value: "Contract",
                label: "Contract",
              },
            ]}
            radius={100}
            className="w-full"
            {...field}
            onChange={(value) => onChange("employmentType", value as string)}
          />
        )}
      />
      <Controller
        name="yearsOfExperience"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Experience Level"
            data={[
              {
                value: "Entry",
                label: "Entry",
              },
              {
                value: "Entry-Mid",
                label: "Entry-Mid",
              },
              {
                value: "Mid-Senior",
                label: "Mid-Senior",
              },
              {
                value: "Senior",
                label: "Senior",
              },
            ]}
            radius={100}
            className="w-full"
            {...field}
            onChange={(value) => onChange("yearsOfExperience", value as string)}
          />
        )}
      />
      <Controller
        name="closingDate"
        control={control}
        render={({ field }) => (
          <Select
            placeholder="Closing Date"
            data={[
              {
                value: "24-hours",
                label: "24 Hours",
              },
              {
                value: "1-week",
                label: "1 Week",
              },
              {
                value: "2-week",
                label: "2 Weeks",
              },
              {
                value: "4-week",
                label: "4 Weeks",
              },
            ]}
            radius={100}
            className="w-full"
            {...field}
            onChange={(value) => onChange("closingDate", value as string)}
          />
        )}
      />
      <Button
        variant="outline"
        className="w-[500px]"
        size="sm"
        onClick={() => onReset()}
      >
        Reset filters
      </Button>
    </form>
  );
};
