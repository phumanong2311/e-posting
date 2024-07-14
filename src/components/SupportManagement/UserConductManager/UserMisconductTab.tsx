import { useState } from "react";
import { SelectSearchField } from "../../../ui";
import UserMisconductList from "./UserMisconductList";

export const UserMisConductTab = () => {
  const searchTypeOptions = [
    {
      value: "",
      label: "All",
    },
    {
      value: "userId",
      label: "User ID",
    },
    {
      value: "username",
      label: "User Name",
    },
  ];
  const [searchType, setSearchType] = useState(searchTypeOptions[0].value);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col">
        <SelectSearchField
          searchType={searchType}
          searchKeyword={searchKeyword}
          options={searchTypeOptions}
          onChangeSearchKeyword={(e) =>
            setSearchKeyword((e.target as any).value)
          }
          onChangeSearchType={setSearchType}
        />
      </div>

      <UserMisconductList
        searchType={searchType}
        searchKeyword={searchKeyword}
      />
    </>
  );
};
