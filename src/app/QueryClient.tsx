import "./i18n";

import { PropsWithChildren } from "react";
import {
  QueryClient as QueryClientConstructor,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClientConstructor();

export const QueryClient = (props: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {props.children}
  </QueryClientProvider>
);
