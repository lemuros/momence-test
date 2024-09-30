import { useMemo } from "react";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { IExchangeRate } from "../api/exchangeRates";

export const useRateByCurrency = (): Record<string, IExchangeRate> => {
  const { rates } = useExchangeRates();
  return useMemo(
    () =>
      rates.reduce((accumulator, rateData) => {
        accumulator[rateData.code] = rateData;
        return accumulator;
      }, {} as Record<string, IExchangeRate>),
    [rates]
  );
};
