import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { assert } from "../utils/assert";

export enum ThemeValueEnum {
  dark = "dark",
  light = "light",
}

interface IThemeContext {
  theme: ThemeValueEnum;
  setTheme: (theme: ThemeValueEnum) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeContextProvider = (props: PropsWithChildren) => {
  const [theme, setTheme] = useState<ThemeValueEnum>(ThemeValueEnum.light);
  const ctxValue = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return (
    <ThemeContext.Provider value={ctxValue}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  assert(ctx !== undefined, "Cannot use ThemeContext outside its provider");
  return ctx;
};
