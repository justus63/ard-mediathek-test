const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy.js,spec.js}",
    baseUrl: "https://www.ardmediathek.de",
    chromeWebSecurity: false, // Sicherheitsbeschränkungen für Cross-Origin deaktivieren
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,   // Timeout für langsame Seiten verlängern
  },
});