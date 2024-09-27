import "./i18n";

import { Reset } from "styled-reset";
import { Flex } from "../components/ui/Flex";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ExchangeRateContextProvider } from "../context/ExchangeRatesContext";
import { QueryClient } from "./QueryClient";
import { LoaderOverlay } from "../components/layout/LoaderOverlay";
import { ExchangeRatesList } from "../components/ExchangeRatesList";
import { ExchangeValueCalculator } from "../components/ExchangeValueCalculator";
import { Container } from "../components/layout/Container";
import { LanguageSelector } from "../components/LanguageSelector";
import { AbsoluteWrapper } from "../components/layout/AbsoluteWrapper";
import { ThemeSelector } from "../components/ThemeSelector";
import { ThemeContextProvider } from "../context/ThemeContext";
import { Header } from "../components/ui/Header";
import { ErrorFallback } from "./ErrorFallback";
import { GlobalStyles } from "./GlobalStyles";

export const App = () => (
  <ErrorBoundary fallback={<ErrorFallback />}>
    <Reset />
    <QueryClient>
      <ThemeContextProvider>
        <GlobalStyles />
        <Suspense fallback={<LoaderOverlay />}>
          <ExchangeRateContextProvider>
            <Container horizontalGap={16}>
              <Flex gap={24}>
                <Header />
                <ExchangeValueCalculator />
                <ExchangeRatesList />
              </Flex>
            </Container>
          </ExchangeRateContextProvider>
          <AbsoluteWrapper>
            <LanguageSelector />
            <ThemeSelector />
          </AbsoluteWrapper>
        </Suspense>
      </ThemeContextProvider>
    </QueryClient>
  </ErrorBoundary>
);
