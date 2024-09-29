import {fetchExchangeRates} from '../../src/api/exchangeRates';

describe('api/exchangeRates', () => {
  it('should parse data correctly', () => {
    cy.fixture("rates.json").then((parsed) => {
      // Step 1: Intercept the API call and mock the response with "rates.txt"
      cy.intercept("/proxy/**", {
        fixture: "rates.txt",  // Mock response with the contents of rates.txt
        statusCode: 200,
      })

      cy.wrap(fetchExchangeRates()).then((transformedData) => {
        // Assert that the transformed data is correct
        expect(transformedData).to.deep.equal(parsed);
      });
    });
  })
})