import { createContext, PropsWithChildren, useContext } from "react";
import { assert } from "../utils/assert";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  fetchExchangeRates,
  IExchangeRatesResponse,
} from "../api/exchangeRates";

const ExchangeRateContext = createContext<IExchangeRatesResponse | undefined>(
  undefined
);

export const ExchangeRateContextProvider = (props: PropsWithChildren) => {
  const { data } = useSuspenseQuery({
    queryFn: fetchExchangeRates,
    queryKey: ["ExchangeRates"],
  });

  return (
    <ExchangeRateContext.Provider value={data}>
      {props.children}
    </ExchangeRateContext.Provider>
  );
};

export const useExchangeRates = () => {
  const ctx = useContext(ExchangeRateContext);
  assert(
    ctx !== undefined,
    "Cannot use ExchangeRateContext outside its provider"
  );
  return ctx;
};
