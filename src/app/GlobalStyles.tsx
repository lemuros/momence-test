import "@fontsource/noto-sans/300.css";
import "@fontsource/noto-sans/500.css";
import "@fontsource/noto-sans/600.css";
import "@fontsource/noto-sans/700.css";

import { createGlobalStyle } from "styled-components";
import { useMemo } from "react";
import { ThemeValueEnum, useThemeContext } from "../context/ThemeContext";

const darkColors = {
  text: "#e6e7e9",
  borderDark: "#515151",
  borderLight: "#5151514a",
  surface1: "#1b2635",
  surface2: "#233044",
  primary: "#ffd700",
};

const lightColors = {
  text: "#333",
  borderDark: "#e0e0e0",
  borderLight: "#e0e0e04a",
  surface1: "#f7f9fc",
  surface2: "#fff",
  primary: "#daa520",
};

export const GlobalStyles = () => {
  const { theme } = useThemeContext();

  const colors = useMemo(() => {
    if (theme === ThemeValueEnum.dark) {
      return darkColors;
    }
    if (theme === ThemeValueEnum.light) {
      return lightColors;
    }
    // fallback
    return lightColors;
  }, [theme]);

  return <GlobalStylesWrapper colors={colors} />;
};

type GlobalStylesWrapperProps = {
  colors: Record<string, string>;
};

export const GlobalStylesWrapper = createGlobalStyle<GlobalStylesWrapperProps>`
  :root{
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;

    --color-text: ${(props) => props.colors.text};
    --color-border-dark: ${(props) => props.colors.borderDark};
    --color-border-light: ${(props) => props.colors.borderLight};
    --color-surface-1: ${(props) => props.colors.surface1};
    --color-surface-2: ${(props) => props.colors.surface2};
    --color-primary: ${(props) => props.colors.primary};
  }

  body, html, #root {
    height: 100vh;
    font-family: "Noto Sans";
    font-size: 15px;
    font-weight: 300;
    background: var(--color-surface-2);
  }
    
  *{
    color: var(--color-text);
    box-sizing: border-box; 
  }
`;
