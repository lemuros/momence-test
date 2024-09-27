import styled from "styled-components";
import { Flex } from "./Flex";

export const SelectorButtonsWrapper = styled(Flex)`
  display: inline-flex;
  overflow: hidden;
  border: 1px solid;
  border-color: var(--color-border-dark);
  border-radius: var(--spacing-sm);
`;

export const SelectorButton = styled.button`
  appearance: none;
  border: 0;
  outline: none;
  cursor: pointer;
  padding: var(--spacing-sm) var(--spacing-md);

  border-color: var(--color-primary);
  background: transparent;
  color: var(--color-primary);

  &:disabled {
    color: var(--color-border-dark);
    border-color: var(--color-border-dark);
    cursor: default;
  }
`;
