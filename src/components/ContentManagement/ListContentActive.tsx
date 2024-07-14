import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { contentManagementServices } from "../../services/";
import { ContentType, paths } from "../../types";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";

const ListContentActive = () => {
  const navigate = useNavigate();
  const { pagination, setPagination, onNextPage, onPreviousPage } =
    usePagination();

  const { isLoading, data } = useQuery({
    staleTime: 1,
    queryKey: ["contentList", pagination.page],

    queryFn: () => {
      return contentManagementServices
        .getActiveContents({ page: pagination?.page })
        .then((res: any) => {
          if (res.result) {
            const { media, ...pagination } = res.result;
            setPagination(pagination);
            return media;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get content failed");
          return [];
        });
    },
  });

  const transformData = (data: any) => {
    if (!data) return [];
    return data.map((content: ContentType) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(content.contentId)}
      >
        {content.title}
      </p>,
      content.contentType,
      content.publisherName,
      content.lastModifiedBy,
      content.mediaStatus,
      moment(content.publishDate).format("MM/DD/YYYY"),
      moment(content.endDate).format("MM/DD/YYYY"),
    ]);
  };

  const onViewDetail = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.CONTENT_DETAIL}/${id}`
    );
  };

  return (
    <div className="w-full h-full px-14 mt-5">
      <TableWithPagination
        head={[
          "Title",
          "Type",
          "Created By",
          "Last Modified By",
          "Status",
          "Publish Date",
          "End Date",
        ]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default ListContentActive;
