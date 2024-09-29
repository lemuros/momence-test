const ROWS_PER_PAGE = 10;
const ROWS_TOTAL = 30;
const RATES_VERSION = "#189 (27 Sep 2024)";

beforeEach(() => {
  // replace rates response body with testing data
  // intercepting everything on /proxy/* as we only have one api call
  cy.intercept("/proxy/**", {
    fixture: "rates.txt",
    statusCode: 200,
  }).then(() => {
    cy.visit("/");
  });
});

describe("Main E2E tests", () => {
  it("Page can be loaded", () => {
    cy.get("#root").should("exist").not("empty");
  });

  describe("Header", () => {
    it("contains correct Rates version", () => {
      cy.get("#rates-version").contains(RATES_VERSION);
    });
  });

  describe("Exchange Rates List", () => {
    it("contains correct number of rows", () => {
      // 10 items per page
      cy.get("#paging-per-page").contains(ROWS_PER_PAGE.toString());
      // 30 items total
      cy.get("#paging-rows-index").contains(ROWS_TOTAL.toString());
      // pagination working (doing something)
      let rowsIndexText;
      cy.get("#paging-rows-index")
        .invoke("text")
        .then((text) => (rowsIndexText = text));
      cy.get("#paging-next").click({ force: true });
      cy.get("#paging-rows-index")
        .invoke("text")
        .should((text) => expect(text).to.not.eq(rowsIndexText));
      cy.get("#paging-prev").click({ force: true });
      cy.get("#paging-rows-index")
        .invoke("text")
        .should((text) => expect(text).to.eq(rowsIndexText));
    });
  });

  describe("Rates calculations", () => {
    it("always contain CZK currency", () => {
      cy.get("#currency-1").select("JPY");
      cy.get("#currency-2").should("have.value", "CZK");
      cy.get("#currency-2").select("JPY");
      cy.get("#currency-1").should("have.value", "CZK");
    });

    it("should remove values from both inputs when one of the currencies is changed", () => {
      cy.get("#value-1").type(12);
      cy.get("#currency-2").select("JPY");
      cy.get("#value-1").should("have.value", "");

      cy.get("#value-2").type(12);
      cy.get("#currency-1").select("JPY");
      cy.get("#value-2").should("have.value", "");
    });

    // Randomly selected currencies and values, calculated on google
    // much better approach would be to test against large set of data (stored in fixture)
    it.only("converts correctly", () => {
      cy.get("#currency-1").select("BRL");
      cy.get("#value-1").clear().type(12);
      cy.get("#value-2").should("have.value", 49.74);
      cy.get("#currency-1").select("BRL");
      cy.get("#value-2").clear().type(49.74);
      cy.get("#value-1").should("have.value", 12);

      cy.get("#currency-2").select("BGN");
      cy.get("#value-1").clear().type(3);
      cy.get("#value-2").should("have.value", 0.23);
      cy.get("#currency-1").select("BGN");
      cy.get("#value-2").clear().type(3);
      cy.get("#value-1").should("have.value", 0.23);

      cy.get("#currency-1").select("JPY");
      cy.get("#value-1").clear().type(11.99);
      cy.get("#value-2").should("have.value", 1.89);
      cy.get("#currency-1").select("JPY");
      cy.get("#value-2").clear().type(1.89);
      cy.get("#value-1").should("have.value", 11.99);

      cy.get("#currency-2").select("TRY");
      cy.get("#value-1").clear().type(33.122);
      cy.get("#value-2").should("have.value", 50.21);
      cy.get("#currency-2").select("TRY");
      cy.get("#value-2").clear().type(50.21);
      cy.get("#value-1").should("have.value", 33.12);
    });
  });
});
