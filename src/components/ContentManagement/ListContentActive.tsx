import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contentManagementService } from "../../services";
import { ContentPagination, ContentType, paths } from "../../types";
import { EmptyBoxMessage } from "../../ui";

export const ListContentActive = () => {
  const navigate = useNavigate();
  const [visible, { open, close }] = useDisclosure(false);
  const [contents, setContents] = useState<Array<ContentType>>([]);
  const [contentPagination, setContentPagination] = useState<ContentPagination>(
    {
      page: 1,
    }
  );

  useQuery({
    queryKey: ["contentList", contentPagination.page],
    queryFn: () => {
      open();
      return contentManagementService
        .getActiveContents({ page: contentPagination?.page })
        .then((res) => {
          if (res.result) {
            const { media, ...pagination } = res.result;
            setContents(media);
            setContentPagination(pagination);
            return res.result;
          }
          return null;
        })
        .finally(() => {
          close();
        });
    },
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
    navigate(
      `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.CONTENT_DETAIL}/${id}`
    );
  };

  const rows = useMemo(() => {
    if (visible) {
      return (
        <LoadingOverlay
          visible={visible}
          zIndex={1000}
          overlayProps={{ radius: "sm" }}
        />
      );
    }

    if (!contents.length) {
      return (
        <div className="w-full flex items-center justify-center mt-8">
          <EmptyBoxMessage />
        </div>
      );
    }

    return (
      <>
        {contents.map((element, index) => (
          <Table.Tr key={index}>
            <Table.Td
              className="text-ellipsis cursor-pointer"
              onClick={() => onViewDetail(element.contentId)}
            >
              {element.title}
            </Table.Td>
            <Table.Td className="text-center">{element.contentType}</Table.Td>
            <Table.Td className="text-center">{element.createdAt}</Table.Td>
            <Table.Td className="text-center">
              {element.lastModifiedBy}
            </Table.Td>
            <Table.Td className="text-center">{element.mediaStatus}</Table.Td>
            <Table.Td className="text-center">
              {moment(element.publishDate).format("MM/DD/YYYY")}
            </Table.Td>
            <Table.Td className="text-center">
              {moment(element.endDate).format("MM/DD/YYYY")}
            </Table.Td>
          </Table.Tr>
        ))}
      </>
    );
  }, [visible, contents]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-5">
        <>
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
          <div className="flex w-full justify-between">
            {contentPagination.page! > 1 ? (
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
            {contentPagination.maxPages! > 1 &&
              contentPagination.page! < contentPagination.maxPages! && (
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
        </>
      </div>
    </div>
  );
};

export default ListContentActive;
