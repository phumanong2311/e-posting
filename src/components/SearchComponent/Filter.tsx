import { Button, Select } from "@mantine/core";
import { SearchParameter } from "../../types";
interface FilterProps {
  searchParameter: SearchParameter;
  onChangeParameter: (name: string, value: string) => void;
  onResetFilter?: () => void;
}

export const Filter = ({
  searchParameter,
  onChangeParameter,
  onResetFilter,
}: FilterProps) => {
  return (
    <div className="w-full px-16 flex justify-between items-center gap-4 mt-5">
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
        name="workLocationType"
        value={searchParameter.workLocationType}
        onChange={(value) =>
          onChangeParameter("workLocationType", value as string)
        }
      />
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
        name="employmentType"
        value={searchParameter.employmentType}
        onChange={(value) =>
          onChangeParameter("employmentType", value as string)
        }
      />
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
        name="yearsOfExperience"
        value={searchParameter.yearsOfExperience}
        onChange={(value) =>
          onChangeParameter("yearsOfExperience", value as string)
        }
      />
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
        name="closingDate"
        value={searchParameter.closingDate}
        onChange={(value) => onChangeParameter("closingDate", value as string)}
      />
      <Button
        variant="outline"
        className="w-[500px]"
        size="sm"
        onClick={() => onResetFilter && onResetFilter()}
      >
        Reset filters
      </Button>
    </div>
  );
};
