import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app/App.tsx";

const initialize = (rootElementId: string) => {
  const rootElement = document.getElementById(rootElementId);

  if (!rootElement) {
    throw new Error(`Unable to find application root by #${rootElementId}`);
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

initialize("root");
