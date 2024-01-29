import { Button, Select } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { SearchParameter } from "../../types";
interface FilterProps {
  searchParameter: SearchParameter;
  onChangeParameter: (name: string, value: string) => void;
}

export const Filter = ({ onChangeParameter }: FilterProps) => {
  const { control, reset } = useForm({});

  const onReset = () => {
    console.log('asdasdas')
    reset({
      workLocationType: null,
      employmentType: null,
      yearsOfExperience: null,
      closingDate: null,
    });
  };

  return (
    <form className="w-full px-16 flex justify-between items-center gap-4 mt-5">
      <Controller
        name="workLocationType"
        control={control}
        render={({ field: { name, value, onChange } }) => (
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
            onChange={(value) => {
              console.log('value', value)
              onChange(value)
              onChangeParameter(name, value ? value : "")
            }}
            value={value}
          />
        )}
      />
      <Controller
        name="employmentType"
        control={control}
        render={({ field: { name, value, onChange } }) => (
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
            onChange={(value) => {
              onChange(value)
              onChangeParameter(name, value ? value : "")
            }}
            value={value}
          />
        )}
      />
      <Controller
        name="yearsOfExperience"
        control={control}
        render={({ field: { name, value, onChange } }) => (
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
            value={value}
            onChange={(value) => {
              onChange(value)
              onChangeParameter(name, value ? value : "")
            }}
          />
        )}
      />
      <Controller
        name="closingDate"
        control={control}
        render={({ field: { name, value, onChange } }) => (
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
            value={value}
            onChange={(value) => {
              onChange(value)
              onChangeParameter(name, value ? value : "")
            }}
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
