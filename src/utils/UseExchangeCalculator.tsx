import { useCallback, useEffect, useState } from "react";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { useRateByCurrency } from "../utils/useRateByCurrency";

const DEFAULT_CZK_VALUE = 500;
const CZK_CODE = "CZK";

const round = (value: number) => Math.round(value * 100) / 100;

export const useExchangeCalculator = () => {
  const { rates } = useExchangeRates();
  const rateByCurrency = useRateByCurrency();

  const [firstCurrency, setFirstCurrency] = useState<string>(CZK_CODE);
  const [secondCurrency, setSecondCurrency] = useState<string>(rates[0].code);

  const [firstValue, setFirstValue] = useState<number>(DEFAULT_CZK_VALUE);
  const [secondValue, setSecondValue] = useState<number>(0);

  const [lastChangedValue, setLastChangedValue] = useState<"first" | "second">(
    "first"
  );

  const changeCurrency = useCallback(
    (currency: string, place: "first" | "second") => {
      if (place === "first") {
        setFirstCurrency(currency);
        if (currency !== CZK_CODE) {
          setSecondCurrency(CZK_CODE);
        }
      }
      if (place === "second") {
        setSecondCurrency(currency);
        if (currency !== CZK_CODE) {
          setFirstCurrency(CZK_CODE);
        }
      }
      setFirstValue(NaN);
      setSecondValue(NaN);
    },
    [setFirstCurrency, setSecondCurrency]
  );

  useEffect(() => {
    const firstCurrencyData = rateByCurrency[firstCurrency];
    const secondCurrencyData = rateByCurrency[secondCurrency];

    if (!firstCurrencyData || !secondCurrencyData) {
      return;
    }

    let foreignRate;
    if (firstCurrency === CZK_CODE) {
      foreignRate = secondCurrencyData.rate / secondCurrencyData.amount;
    } else if (secondCurrency === CZK_CODE) {
      foreignRate = firstCurrencyData.rate / firstCurrencyData.amount;
    } else {
      throw new Error(
        `Cannot convert between ${firstCurrency} and ${secondCurrency}.`
      );
    }

    if (lastChangedValue === "first") {
      let newSecondValue;
      // Converting from the first currency to the second
      if (firstCurrency === CZK_CODE) {
        newSecondValue = firstValue / foreignRate;
      } else {
        // Foreign -> CZK: Multiply foreign value by foreign rate to get CZK
        newSecondValue = firstValue * foreignRate;
      }
      const rounded = round(newSecondValue);
      setSecondValue(rounded);
    }

    if (lastChangedValue === "second") {
      let newFirstValue;
      // Converting from the second currency to the first
      if (secondCurrency === CZK_CODE) {
        // CZK -> Foreign: Divide CZK value by foreign rate to get foreign currency
        newFirstValue = secondValue / foreignRate;
      } else {
        // Foreign -> CZK: Multiply foreign value by foreign rate to get CZK
        newFirstValue = secondValue * foreignRate;
      }
      const rounded = round(newFirstValue);
      setFirstValue(rounded);
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
    changeSecondValue: (value: number) => {
      setLastChangedValue("second");
      setSecondValue(value);
    },
  };
};
