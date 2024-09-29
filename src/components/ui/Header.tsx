import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { H1, Note } from "../ui/Text";
import { useExchangeRates } from "../../context/ExchangeRatesContext";
import { Flex } from "../ui/Flex";

export const Header = () => {
  const { t } = useTranslation();
  const { date, sequence } = useExchangeRates();

  return (
    <Flex direction="row" gap={24} alignItems="center">
      <Logo />
      <Flex gap={8}>
        <H1>{t("header.title")}</H1>
        <Note id="rates-version">
          {t("header.dataVersion", { sequence, date })}
        </Note>
      </Flex>
    </Flex>
  );
};

const Logo = styled.span`
  &:after {
    padding-left: 1px;
    content: "$";
    display: inline-block;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    text-align: center;
    line-height: 45px;
    font-size: 40px;
    font-weight: bold;
    background: #ffd700;
    color: #daa520;
    border: 4px double;
    box-sizing: border-box;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  }
`;
