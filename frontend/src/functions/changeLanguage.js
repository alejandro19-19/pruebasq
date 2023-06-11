export function changeLanguage(i18n) {
  i18n.language === "es"
    ? i18n.changeLanguage("en")
    : i18n.changeLanguage("es");
}
