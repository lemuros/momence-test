import { PropsWithChildren } from "react";
import { Caption } from "../ui/Text";
import { Flex } from "./Flex";
import { Card } from "./Card";

export type SectionProps = PropsWithChildren & {
  label: string;
};

export const Section = (props: SectionProps) => (
  <Flex gap={8}>
    <Caption>{props.label}</Caption>
    <Card>{props.children}</Card>
  </Flex>
);
