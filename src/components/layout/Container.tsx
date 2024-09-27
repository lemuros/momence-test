import styled from "styled-components";

export type ContainerProps = {
  horizontalGap?: number;
};

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "horizontalGap",
})<ContainerProps>`
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--spacing-md);
  padding-right: var(--spacing-md);
  padding-top: ${(props) => `${props.horizontalGap}px`};
  padding-bottom: ${(props) => `${props.horizontalGap}px`};
  width: 100%;
  min-width: 430px;
  max-width: 600px;
`;
