import { useTranslation } from "react-i18next";
import { IconButton } from "./ui/IconButton";
import { useCallback } from "react";
import { CsIcon, EnIcon } from "./ui/Icon";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = useCallback(() => {
    if (i18n.language === "cs") {
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("cs");
    }
  }, [i18n]);

  return (
    <IconButton onClick={changeLanguage}>
      {i18n.language === "cs" ? <EnIcon /> : <CsIcon />}
    </IconButton>
  );
};
