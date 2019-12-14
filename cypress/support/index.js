// ***********************************************************
// This example support/watcherSaga.js is processed and
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

// Import watcherSaga.js using ES2015 syntax:
import './commands/index';

/**********************************
 Fail tests when there's an unknown console error
 *********************************/
Cypress.on(`window:before:load`, win => {
   // need this to properly fail test if there's a console.error
   cy.stub(win.console, `error`, msg => {
      // some console errors are known and can't be fixed
      // so if we find the error, just warn in the log
      // otherwise, fail the test and log error
      const knownErrorMessages = [];
      if (!knownErrorMessages.some(errMessage => msg.includes(errMessage))) {
         // log to Command Log & fail the test
         cy.now(`task`, `error`, msg);
         throw new Error(msg);
      } else {
         cy.now(`task`, `warn`, `Known console error --> ${msg}`);
      }
   });

   // log warnings to output
   cy.stub(win.console, `warn`, msg => {
      // ignore known warnings
      const knownWarnings = [];
      if (!knownWarnings.some(errMessage => msg.includes(errMessage))) {
         // log to Command Log
         cy.now(`task`, `warn`, msg);
      }
   });
});
