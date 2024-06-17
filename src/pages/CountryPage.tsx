import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectSearchField } from "../ui";
import { CountryList } from "../components/Country";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initSearchType = searchParams.get("searchType") || "country";

  const [searchType, setSearchType] = useState(initSearchType);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const onChangeSearchType = (value: string) => {
    setSearchType(value);
    setSearchParams({
      searchType: value,
    });
  };

  const onChangeSearchKeyword = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    if (!e?.target) return;
    const { value } = e.target as HTMLInputElement;
    setSearchKeyword(value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <SelectSearchField
        searchType={searchType}
        searchKeyword={searchKeyword}
        options={[
          {
            value: "country",
            label: "Country",
          },
          {
            value: "division",
            label: "State/Province",
          },
          {
            value: "city",
            label: "City",
          },
        ]}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSearchType={onChangeSearchType}
      />

      <CountryList keyword={searchKeyword} />
    </div>
  );
};

export default SearchPage;
