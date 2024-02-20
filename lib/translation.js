const supportedLocales = ['en', 'pt']
let translations = {}
// When the page content is ready...
document.addEventListener("DOMContentLoaded", () => {
  const initialLocale = browserLocales(true)
  const locale = initialLocale.find(val => supportedLocales.includes(val))
  translate(locale)
})

async function fetchTranslationsFor(newLocale) {
  const response = await fetch(`/assets/translations/${newLocale}.json`);
  return await response.json();
}

async function translate(locale = "en") {
  translations = await fetchTranslationsFor(locale)

  document
    // Find all elements that have the key attribute
    .querySelectorAll("[data-i18n-key]")
    .forEach(translateElement)
}

function translateElement(element) {
  const keys = element.getAttribute("data-i18n-key").split(".");
  let value = translations;

  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = value[k];
    } else {
      return undefined;
    }
  }

  element.innerText = value;
}

/**
 * Retrieve user-preferred locales from the browser
 */
function browserLocales(languageCodeOnly = false) {
  return navigator.languages.map((locale) =>
    languageCodeOnly ? locale.split("-")[0] : locale,
  );
}
