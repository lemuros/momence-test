import { useTranslation } from "react-i18next";
import { useExchangeRates } from "../context/ExchangeRatesContext";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table";
import { useOfflinePaging } from "../utils/useOfflinePaging";
import { Section } from "./ui/Section";
import { TablePaging } from "./ui/TablePaging";

export const ExchangeRatesList = () => {
  const { t } = useTranslation();
  const { rates } = useExchangeRates();

  const { data, ...paging } = useOfflinePaging(rates);

  return (
    <Section label={t("exchangeRatesList.label")}>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>{t("exchangeRatesList.country")}</TableHeader>
            <TableHeader>{t("exchangeRatesList.currency")}</TableHeader>
            <TableHeader>{t("exchangeRatesList.code")}</TableHeader>
            <TableHeader>{t("exchangeRatesList.amount")}</TableHeader>
            <TableHeader>{t("exchangeRatesList.rate")}</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {data.map((rate) => (
            <TableRow key={rate.code}>
              <TableCell>{rate.country}</TableCell>
              <TableCell>{rate.currency}</TableCell>
              <TableCell>{rate.code}</TableCell>
              <TableCell>{rate.amount}</TableCell>
              <TableCell>{rate.rate}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <TablePaging {...paging} />
    </Section>
  );
};
