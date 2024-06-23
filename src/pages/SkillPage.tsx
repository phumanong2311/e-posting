import { SyntheticEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SelectSearchField } from "../ui/SelectSearchField";
import { SkillList } from "../components/Skills";

const SkillPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initSearchType = searchParams.get("searchType") || "skills";

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
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSearchType={onChangeSearchType}
        options={[{ value: "skills", label: "Skills" }]}
      />

      <SkillList keyword={searchKeyword} />
    </div>
  );
};

export default SkillPage;
