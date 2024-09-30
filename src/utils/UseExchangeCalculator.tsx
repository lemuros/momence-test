import { useCallback, useEffect, useState } from "react";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { useRateByCurrency } from "../utils/useRateByCurrency";

const DEFAULT_CZK_VALUE = 500;
const CZK_CODE = "CZK";

const round = (value: number) => Math.round(value * 100) / 100;

export const useExchangeCalculator = () => {
  const { rates } = useExchangeRates();
  const rateByCurrency = useRateByCurrency();

  // values of first and second select box (currency code)
  const [firstCurrency, setFirstCurrency] = useState<string>(CZK_CODE);
  const [secondCurrency, setSecondCurrency] = useState<string>(rates[0].code);

  // values of first and second input (nominal value)
  const [firstValue, setFirstValue] = useState<number>(DEFAULT_CZK_VALUE);
  const [secondValue, setSecondValue] = useState<number>(0);

  // last input updated by user
  const [lastChangedValue, setLastChangedValue] = useState<"first" | "second">(
    "first"
  );

  // handles change of currency performed by user
  // setting the other currency to CZK if necessary
  // removes values from both inputs
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

  // perform recalculation
  useEffect(() => {
    const firstCurrencyData = rateByCurrency[firstCurrency];
    const secondCurrencyData = rateByCurrency[secondCurrency];

    if (!firstCurrencyData || !secondCurrencyData) {
      return;
    }

    // determine rate specified in object containing foreign currency
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

    // convert from first currency to the second
    if (lastChangedValue === "first") {
      let newSecondValue;
      if (firstCurrency === CZK_CODE) {
        newSecondValue = firstValue / foreignRate;
      } else {
        // foreign to CZK: multiply foreign value by foreign rate to get CZK
        newSecondValue = firstValue * foreignRate;
      }
      const rounded = round(newSecondValue);
      setSecondValue(rounded);
    }

    // Convert from the second currency to the first
    if (lastChangedValue === "second") {
      let newFirstValue;
      if (secondCurrency === CZK_CODE) {
        newFirstValue = secondValue / foreignRate;
      } else {
        // foreign -> CZK: multiply foreign value by foreign rate to get CZK
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
