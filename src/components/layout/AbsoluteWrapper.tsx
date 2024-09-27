import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Flex } from "../ui/Flex";

export const AbsoluteWrapper = (props: PropsWithChildren) => (
  <Absolute>
    <Flex direction="row" gap={8}>
      {props.children}
    </Flex>
  </Absolute>
);

const Absolute = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--spacing-sm);
`;
