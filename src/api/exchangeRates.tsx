const EXCHANGE_RATES_API_URI =
  "/proxy/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt";
const EXCHANGE_RATES_ROWS_DELIMITER = "\n";
const EXCHANGE_RATES_DATE_SEQUENCE_DELIMITER = "|";

export interface IExchangeRate {
  country: string;
  currency: string;
  amount: number;
  code: string;
  rate: number;
}

export interface IExchangeRatesResponse {
  date: string;
  sequence: string;
  rates: Array<IExchangeRate>;
}

const CZK_RATE: IExchangeRate = {
  country: "Czech Republic",
  currency: "koruna",
  amount: 1,
  code: "CZK",
  rate: 1,
};

const fetchData = () =>
  fetch(EXCHANGE_RATES_API_URI, {
    headers: {
      accept: "plain/text",
    },
    method: "GET",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  });

/**
 * Parse data provided by the API
 * Description of the string data can be found here https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/
 */
const parseData = (data: string): IExchangeRatesResponse => {
  const rows = data.split(EXCHANGE_RATES_ROWS_DELIMITER);

  const ratesResponse: IExchangeRatesResponse = rows.reduce(
    (accumulator, currentValue, currentIndex) => {
      // first row contains metadata
      if (currentIndex === 0) {
        //NOTE: Docs declares that date and sequence is separated by two spaces, which is not true
        const [date, sequence] = currentValue.split(" #");
        return {
          ...accumulator,
          date,
          sequence,
        };
      }
      // second row contains table header
      // NOTE: parse headers to make this code more foolproof (so the app wont break when API changes order of the columns)
      if (currentIndex === 1) {
        return accumulator;
      }
      // last row is empty
      if (currentIndex === rows.length - 1) {
        return accumulator;
      }

      const [country, currency, amount, code, rate] = currentValue.split(
        EXCHANGE_RATES_DATE_SEQUENCE_DELIMITER
      );

      accumulator = {
        ...accumulator,
        rates: [
          ...(accumulator.rates ?? []),
          {
            country,
            currency,
            amount: parseInt(amount, 10),
            code,
            rate: parseFloat(rate),
          },
        ],
      };
      return accumulator;
    },
    {} as IExchangeRatesResponse
  );

  // Push static CZK rate
  ratesResponse.rates.push(CZK_RATE);
  console.log(ratesResponse);
  // NOTE: We might want to use some validator here to ensure data are really in specified format
  // NOTE: such approach can increase application stability
  // NOTE: `z.object(...).parse(ratesResponse)` or `yup.object(...).validate(ratesResponse)`
  return ratesResponse;
};

export const fetchExchangeRates = () => fetchData().then(parseData);
