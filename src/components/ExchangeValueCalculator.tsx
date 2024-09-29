import { Flex } from "./ui/Flex";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { CardContent } from "./ui/Card";
import { Input, InputWrapper, Select } from "./form/Input";
import { useTranslation } from "react-i18next";
import { Section } from "./ui/Section";
import { Note } from "./ui/Text";
import { useExchangeCalculator } from "../utils/UseExchangeCalculator";

export const ExchangeValueCalculator = () => {
  const { t } = useTranslation();

  const { rates } = useExchangeRates();
  const calculator = useExchangeCalculator();

  return (
    <Section label={t("exchangeValueCalculator.label")}>
      <CardContent>
        <Flex gap={8}>
          <Flex
            direction="row"
            gap={8}
            alignItems="center"
            justifyContent="space-between"
          >
            <InputWrapper>
              <Input
                id="value-1"
                value={calculator.firstValue}
                type="number"
                onChange={(e) =>
                  calculator.changeFirstValue(parseFloat(e.target.value))
                }
              />
              <Select
                id="currency-1"
                value={calculator.firstCurrency}
                onChange={(e) =>
                  calculator.changeCurrency(e.target.value, "first")
                }
              >
                {rates.map((rate) => (
                  <option key={rate.code}>{rate.code}</option>
                ))}
              </Select>
            </InputWrapper>

            <span>=</span>

            <InputWrapper>
              <Input
                id="value-2"
                value={calculator.secondValue}
                type="number"
                onChange={(e) =>
                  calculator.changeSecondValue(parseFloat(e.target.value))
                }
              />
              <Select
                id="currency-2"
                value={calculator.secondCurrency}
                onChange={(e) =>
                  calculator.changeCurrency(e.target.value, "second")
                }
              >
                {rates.map((rate) => (
                  <option key={rate.code}>{rate.code}</option>
                ))}
              </Select>
            </InputWrapper>
          </Flex>
          <Note>{t("exchangeValueCalculator.note")}</Note>
        </Flex>
      </CardContent>
    </Section>
  );
};
