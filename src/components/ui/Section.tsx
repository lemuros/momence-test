import { PropsWithChildren } from "react";
import { Flex } from "./Flex";
import { Card } from "./Card";
import { Caption, H2 } from "../ui/Text";

export type SectionProps = PropsWithChildren & {
  label: string;
};

export const Section = (props: SectionProps) => (
  <Flex gap={8}>
    <Caption>{props.label}</Caption>
    <Card>{props.children}</Card>
  </Flex>
);
