// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignoriere React-Fehler #418, #421 und #422
    if (
      err.message.includes('Minified React error #418') ||
      err.message.includes('Minified React error #421') ||
      err.message.includes('Minified React error #422')
    ) {
      return false; // Verhindert, dass der Test stoppt
    }
  });
import './commands'