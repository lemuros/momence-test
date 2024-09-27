import styled from "styled-components";

export type FlexProps = {
  direction?: "column" | "row";
  gap?: number;
  alignItems?: "center" | "flex-start" | "flex-end" | "stretch";
  justifyContent?: "center" | "flex-start" | "flex-end" | "space-between";
  alignContent?: "center" | "flex-start" | "flex-end";
};

const hiddenPropNames = [
  "direction",
  "gap",
  "alignItems",
  "justifyContent",
  "alignContent",
];

export const Flex = styled.div.withConfig({
  shouldForwardProp: (prop) => !hiddenPropNames.includes(prop),
})<FlexProps>`
  display: flex;
  flex-direction: ${(props) => props.direction ?? "column"};
  gap: ${(props) => `${props.gap ?? 0}px`};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  align-content: ${(props) => props.alignContent};
`;
