import styled from "styled-components";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Flex } from "./Flex";
import { IconButton } from "./IconButton";
import { LeftIcon, RightIcon } from "./Icon";

export type TablePagingProps = {
  total: number;
  perPage: number;
  page: number;
  handlePageChange: (page: number) => void;
};

export const TablePaging = ({
  perPage,
  total,
  page,
  handlePageChange,
}: TablePagingProps) => {
  const { t } = useTranslation();
  const isFirstPage = useMemo(() => page === 1, [page]);

  const isLastPage = useMemo(
    () => page >= total / perPage,
    [page, total, perPage]
  );

  const previousPage = useCallback(() => {
    handlePageChange(page - 1);
  }, [page, handlePageChange]);

  const nextPage = useCallback(() => {
    handlePageChange(page + 1);
  }, [page, handlePageChange]);

  const [firstRowIndex, lastRowIndex] = useMemo(() => {
    const firstRow = (page - 1) * perPage + 1;
    const lastRow = Math.min(page * perPage + 1, total);
    return [firstRow, lastRow];
  }, [page, perPage, total]);

  return (
    <TablePagingWrapper
      direction="row"
      gap={32}
      alignItems="center"
      justifyContent="flex-end"
    >
      <span>{t("paging.perPage", { perPage })}</span>

      <span>
        {t("paging.rowsIndex", { firstRowIndex, lastRowIndex, total })}
      </span>

      <Flex direction="row" gap={8}>
        <IconButton disabled={isFirstPage} onClick={previousPage}>
          <LeftIcon />
        </IconButton>
        <IconButton disabled={isLastPage} onClick={nextPage}>
          <RightIcon />
        </IconButton>
      </Flex>
    </TablePagingWrapper>
  );
};

const TablePagingWrapper = styled(Flex)`
  padding: var(--spacing-md);
`;
