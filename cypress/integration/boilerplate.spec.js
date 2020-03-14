context(`Test the boilerplate`, function() {
   specify(`it works`, function() {
      cy.visit('/');

      cy.get('h2')
         .contains('react-spa-starter')
         .should('exist');
   });
});
