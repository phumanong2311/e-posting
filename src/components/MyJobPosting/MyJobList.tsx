import { Button, Table } from "@mantine/core";
import { useAppProviderCtx } from "../../app-provider";
import { ROLE } from "../../types/enums/role";
import { useNavigate } from "react-router-dom";
import { Job, paths } from "../../types";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { EmptyBoxMessage, PaginationButton } from "../../ui";
import moment from "moment";

const MyJobList = ({
  jobs = [],
  page,
  maxPage,
  onNextPage,
  onPreviousPage,
  isMyJobList = false,
}: {
  jobs: Array<Job>;
  page: number;
  maxPage: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
  isMyJobList?: boolean;
}) => {
  const {
    data: { user },
  } = useAppProviderCtx();
  const navigate = useNavigate();

  const onViewDetail = (id: string) => {
    if (isMyJobList)
      navigate(
        `/${paths.ROOT}/${paths.DASHBOARD}/${paths.MY_JOB_POSTING}/${id}`
      );
    else
      navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_POSTING}/${id}`);
  };

  const onEdit = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${id}`
    );
  };

  const rows = jobs.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id)}
      >
        {element.jobTitle}
      </Table.Td>
      {!isMyJobList && (
        <Table.Td className="text-center">{element.jobOwner}</Table.Td>
      )}
      <Table.Td className="text-center">
        {moment(element.createdAt).format("MM/DD/YYYY")}
      </Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.role === ROLE.EDITOR && (
          <IconEdit onClick={() => onEdit(element._id)} />
        )}
        {(user?.role === ROLE.EDITOR || user?.role === ROLE.ADMIN) && (
          <IconTrash />
        )}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Description/Job Title</Table.Th>
            {!isMyJobList && <Table.Th className="text-center">Owner</Table.Th>}
            <Table.Th className="text-center">Posted date</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
            {user?.role !== ROLE.USER && (
              <Table.Th className="text-center">Admin</Table.Th>
            )}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {!jobs ||
        (jobs.length === 0 && (
          <div className="w-full flex items-center justify-center mt-8">
            <EmptyBoxMessage />
          </div>
        ))}

      <PaginationButton
        pagination={{ page, maxPages: maxPage }}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default MyJobList;
