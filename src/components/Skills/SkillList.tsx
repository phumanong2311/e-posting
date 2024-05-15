import { Button, Table, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState, useMemo } from "react";
import { useAppProviderCtx } from "../../app-provider";
import { Skill, SkillPagination, paths } from "../../types";
import { skillServices } from "../../services";
import { EmptyBoxMessage } from "../../ui";

const SkillList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState<Array<Skill> | null>([]);
  const [skillPagination, setSkillPagination] = useState<SkillPagination>({
    page: 1,
  });
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading } = useQuery({
    queryKey: ["skillList", skillPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      skillServices
        .getSkills({
          page: skillPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { skills, ...pagination } = res.result;
            setSkills(skills);
            setSkillPagination(pagination);
            if (!res.result.skills.length) setSkills(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setSkillPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (skillPagination?.maxPages && skillPagination?.page) {
      setSkillPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (skillPagination?.page! > 1) {
      setSkillPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.SKILLS_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.SKILLS_EDIT}/${id}`);
  };

  const onAddSkill = () => {
    navigate(`/${paths.ROOT}/${paths.SKILLS_CREATE}`);
  };

  const rows = useMemo(() => {
    if (isLoading) {
      return (
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td className="text-center">
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm" }}
            />
          </Table.Td>
          <Table.Td></Table.Td>
        </Table.Tr>
      );
    }

    if (skills === null) {
      return (
        <tr>
          <td colSpan={3}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return skills.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td
          className="text-ellipsis cursor-pointer"
          onClick={() => onViewDetail(element.skillId!)}
        >
          {element.skillName}
        </Table.Td>
        <Table.Td className="text-center">{element.functionalArea}</Table.Td>
        <Table.Td className="text-center">{element.skillCategory}</Table.Td>
      </Table.Tr>
    ));
  }, [skills, isLoading]);

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
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Skill Description</Table.Th>
              <Table.Th className="text-center">Functional Area</Table.Th>
              <Table.Th className="text-center">Skill Category</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {skillPagination.page! > 1 ? (
            <Button
              variant="outline"
              className="w-fit"
              size="sm"
              onClick={onPreviousPage}
            >
              &lt; previous page
            </Button>
          ) : (
            <div></div>
          )}
          {skillPagination.maxPages! > 1 &&
            skillPagination.page! < skillPagination.maxPages! && (
              <Button
                variant="outline"
                className="w-fit float-right"
                size="sm"
                onClick={onNextPage}
              >
                next page &gt;
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SkillList;
