# MOMENCE Tech Task

This repository contains my solution to the technical task assigned by Momence as part of the job interview process.

## Assignment

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.
   - API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt

   - Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/

2. Parses the downloaded data and clearly displays a list to the user in the UI.

3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.

4. Commit your code throughout your work and upload the resulting codebase into a Github repo.

5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netlify, etc.).
6. Add automated tests which might be appropriate to ensure that your solution is working correctly.

7. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.

## Local Development

To run application on localhost:

```bash
$ npm ci
$ npm run dev
```

## About the Solution

### Tech Stack

The application is built with `TypeScript` and `React`, bundled using `Vite`. Components are styled with `styled-components`, while API calls are handled with `fetch` and `react-query`.

### Code simplicity

The assignment requested a simple solution, but I faced some challenges as I aimed to make the application easily extendable, simulating a real-world project.

Additionally, I implemented both light and dark themes. All text is stored in a dictionary, with support for two localizations (Czech and English). The exchange rate list also features offline pagination.
  
### API data

The application includes an HTTP proxy that forwards all requests from `/proxy/*` to `https://www.cnb.cz/en/*`. This helps bypass CORS errors that occur when the host directly calls the remote API.

### Loading State and Errors

The loading state is managed using a combination of the `Suspense` component and the `useSuspenseQuery` hook.

Global error handling is implemented with the `ErrorBoundary` component.
