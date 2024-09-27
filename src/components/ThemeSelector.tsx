import { ThemeValueEnum, useThemeContext } from "../context/ThemeContext";
import { IconMoon, IconSun } from "./ui/Icon";
import { useCallback } from "react";
import { IconButton } from "./ui/IconButton";

export const ThemeSelector = () => {
  const { theme, setTheme } = useThemeContext();

  const toggleTheme = useCallback(() => {
    if (theme === ThemeValueEnum.dark) {
      setTheme(ThemeValueEnum.light);
    } else {
      setTheme(ThemeValueEnum.dark);
    }
  }, [theme, setTheme]);

  return (
    <IconButton onClick={toggleTheme}>
      {theme === ThemeValueEnum.dark ? <IconSun /> : <IconMoon />}
    </IconButton>
  );
};
