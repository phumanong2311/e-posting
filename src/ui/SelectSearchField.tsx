import { Select, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { SyntheticEvent } from "react";

interface SelectSearchFieldProps {
  searchType: string;
  searchKeyword: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  onChangeSearchKeyword: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
  onChangeSearchType: (value: string) => void;
}

export const SelectSearchField = ({
  searchType,
  searchKeyword,
  options,
  onChangeSearchKeyword,
  onChangeSearchType,
}: SelectSearchFieldProps) => {
  return (
    <div className="max-w-[500px] mt-10 flex items-center">
      <TextInput
        leftSection={<IconSearch />}
        radius={100}
        classNames={{
          input: "rounded-tr-none rounded-br-none border-r-0",
        }}
        className="w-[70%]"
        name="keyword"
        value={searchKeyword}
        onChange={(e) => onChangeSearchKeyword(e)}
      />
      <Select
        placeholder="Filters"
        radius={100}
        classNames={{
          input: "rounded-tl-none rounded-bl-none",
        }}
        className="mt-0 w-[40%]"
        data={options}
        value={searchType}
        onChange={(value) => onChangeSearchType(value!)}
      />
    </div>
  );
};
