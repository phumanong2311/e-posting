// src/hooks/usePagination.js
import { useState } from "react";
import { Pagination } from "../types/Pagination";

const usePagination = (initialState: Pagination = {}) => {
  const {
    page = 1,
    maxPages = undefined,
    offset = 0,
    pageSize = 10,
  } = initialState;

  const [pagination, setPagination] = useState({
    page,
    maxPages,
    offset,
    pageSize,
  });

  const resetPage = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (pagination.maxPages && pagination.page < pagination.maxPages) {
      setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (pagination.page > 1) {
      setPagination((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  };

  return { pagination, resetPage, onNextPage, onPreviousPage, setPagination };
};

export default usePagination;
