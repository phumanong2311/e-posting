import { Table } from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContentPagination, ContentType, paths } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { contentManagementService } from "../../services";

export const ListContentActive = () => {
  const navigate = useNavigate();

  const [contents, setContents] = useState<Array<ContentType>>([]);
  const [contentPagination, setContentPagination] = useState<ContentPagination>(
    {
      page: 1,
    }
  );

  useQuery({
    queryKey: ["contentList", contentPagination.page],
    queryFn: () =>
      contentManagementService
        .getContents({ page: contentPagination?.page })
        .then((res) => {
          if (res.result) {
            const { media, ...pagination } = res.result;
            setContents(media);
            setContentPagination(pagination);
            return res.result;
          }
          return null;
        }),
  });

  const onNextPage = () => {
    if (contentPagination?.maxPages && contentPagination?.page) {
      setContentPagination((prev: any) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (contentPagination?.page! > 1) {
      setContentPagination((prev: any) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onViewDetail = (id: string) => {
    navigate(`/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.CONTENT_DETAIL}/${id}`);
  };

  const rows = contents.map((element, index) => (
        <Table.Tr key={index}>
          <Table.Td
            className="text-ellipsis cursor-pointer"
            onClick={() => onViewDetail(element.contentId)}
          >
            {element.title}
          </Table.Td>
          <Table.Td className="text-center">{element.contentType}</Table.Td>
          <Table.Td className="text-center">{element.createdAt}</Table.Td>
          <Table.Td className="text-center">{element.lastModifiedBy}</Table.Td>
          <Table.Td className="text-center">{element.mediaStatus}</Table.Td>
          <Table.Td className="text-center">
            {moment(element.publishDate).format("MM/DD/YYYY")}
          </Table.Td>
          <Table.Td className="text-center">
            {moment(element.endDate).format("MM/DD/YYYY")}
          </Table.Td>
        </Table.Tr>
      ));
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Title</Table.Th>
            <Table.Th className="text-center">Type</Table.Th>
            <Table.Th className="text-center">Created By</Table.Th>
            <Table.Th className="text-center">Last Modified By</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
            <Table.Th className="text-center">Publish Date</Table.Th>
            <Table.Th className="text-center">End Date</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
};

export default ListContentActive;
