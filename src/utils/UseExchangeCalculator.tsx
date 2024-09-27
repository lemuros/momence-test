import { useCallback, useEffect, useState } from "react";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { useRateByCurrency } from "../utils/useRateByCurrency";

const DEFAULT_CZK_VALUE = 500;
const CZK_CODE = "CZK";

export const useExchangeCalculator = () => {
  const { rates } = useExchangeRates();
  const rateByCurrency = useRateByCurrency();

  const [firstCurrency, _setFirstCurrency] = useState<string>(CZK_CODE);
  const [secondCurrency, _setSecondCurrency] = useState<string>(rates[0].code);

  const [firstValue, setFirstValue] = useState<number>(DEFAULT_CZK_VALUE);
  const [secondValue, setSecondValue] = useState<number>(0);

  const [lastChangedValue, setLastChangedValue] = useState<"first" | "second">(
    "first"
  );

  const changeCurrency = useCallback(
    (currency: string, place: "first" | "second") => {
      if (place === "first") {
        _setFirstCurrency(currency);
        if (currency !== CZK_CODE) {
          _setSecondCurrency(CZK_CODE);
        }
      }
      if (place === "second") {
        _setSecondCurrency(currency);
        if (currency !== CZK_CODE) {
          _setFirstCurrency(CZK_CODE);
        }
      }
    },
    [_setFirstCurrency, _setSecondCurrency]
  );

  useEffect(() => {
    const firstCurrencyData = rateByCurrency[firstCurrency];
    const secondCurrencyData = rateByCurrency[secondCurrency];

    if (!firstCurrencyData || !secondCurrencyData) {
      return;
    }

    const firstRate = firstCurrencyData.rate / firstCurrencyData.amount;
    const secondRate = secondCurrencyData.rate / secondCurrencyData.amount;

    if (lastChangedValue === "first") {
      const newSecondValue = (firstValue / firstRate) * secondRate;
      if (newSecondValue !== secondValue) {
        setSecondValue(newSecondValue);
      }
    }
    if (lastChangedValue === "second") {
      const newFirstValue = (secondValue / secondRate) * firstRate;
      if (newFirstValue !== firstValue) {
        setFirstValue(newFirstValue);
      }
    }
  }, [
    firstValue,
    secondValue,
    setFirstValue,
    setSecondValue,
    rateByCurrency,
    firstCurrency,
    secondCurrency,
    lastChangedValue,
  ]);

  return {
    firstValue,
    firstCurrency,
    secondValue,
    secondCurrency,
    changeCurrency,
    changeFirstValue: (value: number) => {
      setLastChangedValue("first");
      setFirstValue(value);
    },
    changeLastValue: (value: number) => {
      setLastChangedValue("second");
      setSecondValue(value);
    },
  };
};
