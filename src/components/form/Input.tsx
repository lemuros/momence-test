import styled from "styled-components";

export const InputWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;

  border: 1px solid;
  border-color: var(--color-border-dark);
  border-radius: var(--spacing-sm);
  overflow: hidden;

  & *:last-child {
    border-radius: 0 var(--spacing-sm) var(--spacing-sm) 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  border: 0;
  outline: none;
  appearance: none;
  height: 36px;
  padding: var(--spacing-sm);
  background: var(--color-surface-2);
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
`;

export const Select = styled.select`
  border: 0;
  outline: none;
  height: 36px;
  padding: var(--spacing-sm);
  background: var(--color-surface-1);
  cursor: pointer;

  &:disabled {
    cursor: default;
    appearance: none;
  }

  &:focus-visible {
    box-shadow: inset 0 0 2px 1px var(--color-primary);
  }
`;
