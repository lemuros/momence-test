import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
`;

export const TableHead = styled.thead``;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid;
  border-color: var(--color-border-dark);
`;

export const TableCell = styled.td`
  padding: var(--spacing-sm);
`;

export const TableHeader = styled.th`
  text-align: left;
  padding-left: var(--spacing-sm);
  padding-right: var(--spacing-sm);
  padding-top: var(--spacing-md);
  padding-bottom: var(--spacing-md);
`;
