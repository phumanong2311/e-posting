import { useState } from "react";
import { SelectSearchField } from "../../../ui";
import { Select } from "@mantine/core";
import UserReportingList from "./UserReportingList";

export const UserReportingTab = () => {
  const searchTypeOptions = [
    {
      value: "",
      label: "All",
    },
    {
      value: "reportedUser",
      label: "Reported User",
    },
    {
      value: "reportingUser",
      label: "Reporting User",
    },
  ];

  const reportTopicOptions = [
    {
      value: "",
      label: "All",
    },
    {
      value: "Misrepresentation or fraud",
      label: "Misrepresentation or fraud",
    },
    {
      value: "Plagiarism or IP violations",
      label: "Plagiarism or IP violations",
    },
    {
      value: "Inappropriate or offensive behavior",
      label: "Inappropriate or offensive behavior",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  const [reportTopic, setReportTopic] = useState("");
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

        <Select
          placeholder="Report Topic"
          className="mt-2"
          data={reportTopicOptions}
          value={reportTopic}
          onChange={(value) => setReportTopic(value!)}
        />
      </div>
      <div className="mt-6">
        <UserReportingList
          searchType={searchType}
          searchKeyword={searchKeyword}
          reportTopic={reportTopic}
        />
      </div>
    </>
  );
};
