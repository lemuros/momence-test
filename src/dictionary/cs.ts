import { enDictionary } from "./en";

export const csDictionary: typeof enDictionary = {
  error: {
    title: "Neočekávaná chyba",
    description:
      "Navzdory všem mým snahám došlo k neočekávané chybě. Vážně přehodnocuji svá životní rozhodnutí.",
  },

  header: {
    title: "Převod měn",
    dataVersion: "Verze dat: #{{sequence}} ({{date}})",
  },
  exchangeRatesList: {
    label: "Aktuální směnné kurzy",
    country: "Země",
    currency: "Měna",
    amount: "Částka",
    code: "Kód",
    rate: "Kurz",
  },
  exchangeValueCalculator: {
    label: "Převod měny",
    note: "* Jedna z vybraných měn musí být vždy CZK",
  },
  paging: {
    perPage: "Řádků na stránku: {{perPage}}",
    rowsIndex: "{{firstRowIndex}} - {{lastRowIndex}} z {{total}}",
  },
};
