import { useCallback, useMemo, useState } from "react";

export type useOfflinePagingProps = {
  page: number;
  perPage: number;
};

const defaultInitialValues: useOfflinePagingProps = {
  page: 1,
  perPage: 10,
};

export function useOfflinePaging<T = unknown>(
  dataset: Array<T>,
  initialValues?: Partial<useOfflinePagingProps>
) {
  const options = { ...defaultInitialValues, ...initialValues };

  const total = useMemo(() => dataset.length, [dataset]);
  const [page, setPage] = useState<number>(options.page);
  const [perPage, setPerPage] = useState<number>(options.perPage);

  const handlePerPageChange = useCallback((newPerPage: number) => {
    setPage(0);
    setPerPage(newPerPage);
  }, []);

  const data: Array<T> = useMemo(() => {
    const start = perPage * (page - 1);
    const end = start + perPage;
    return dataset.slice(start, end);
  }, [perPage, page, dataset]);

  return {
    total,
    perPage,
    page,
    data,
    handlePageChange: setPage,
    handlePerPageChange,
  };
}
