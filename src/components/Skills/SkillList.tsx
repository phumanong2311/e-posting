import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect } from "react";
import { Skill, paths } from "../../types";
import { skillServices } from "../../services";
import { TableWithPagination } from "../../ui";
import { toast } from "../../lib/toast";
import usePagination from "../../hooks/usePagination";

const SkillList = ({ keyword = "" }: { keyword: string }) => {
  const navigate = useNavigate();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["skillList", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      skillServices
        .getSkills({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          console.log(res);
          if (res.result) {
            const { skills, ...pagination } = res.result;
            setPagination(pagination);
            return skills;
          }
          return [];
        })
        .catch(() => {
          toast.error("Fetching skills failed");
          return [];
        }),
  });

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.SKILLS_DETAIL}/${id}`);
  };

  const onAddSkill = () => {
    navigate(`/${paths.ROOT}/${paths.SKILLS_CREATE}`);
  };

  const transformData = (data: Array<Skill>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element.skillId!)}
      >
        {element.skillName}
      </p>,
      element.functionalArea,
      element.skillCategory,
    ]);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddSkill}
        >
          Add Skill
        </Button>
      </div>

      <div className="w-full px-14 mt-2">
        <TableWithPagination
          head={["Skill Description", "Functional Area", "Skill Category"]}
          body={transformData(data)}
          pagination={pagination}
          loading={isLoading}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};

export default SkillList;
