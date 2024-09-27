import styled from "styled-components";

export const IconButton = styled.button`
  appearance: none;
  border: none;
  outline: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  border: 1px solid;
  border-color: var(--color-primary);
  background: transparent;
  color: var(--color-primary);
  padding: 0;

  &:disabled {
    cursor: default;
    color: var(--color-border-dark);
    border-color: var(--color-border-dark);
  }
`;
