context(`Test the boilerplate`, function() {
   beforeEach(function() {
      cy.server();
      cy.route({ method: 'GET', url: '/200**' }).as('fakeAuth'); // fake auth endpoint
   });

   function login() {
      cy.visit('/');
      cy.get(`input[name="username"]`).type('FakeUser');
      cy.get(`input[name="password"]`).type('password');
      cy.get('button')
         .contains('LOGIN')
         .click({ force: true });
      cy.wait('@fakeAuth');
   }

   specify(`User can login and see the app welcome page`, function() {
      login();
      cy.get('h1')
         .contains('Welcome to the App')
         .should('exist');
   });

   specify(`Logging out a user requires re-login`, function() {
      login();
      cy.get('a')
         .contains('Logout')
         .click();
      cy.visit('/app/dogs');
      cy.get(`input[name="username"]`).should('exist');
   });

   specify(`Unauthenticated user is redirected back to the login page`, function() {
      cy.visit('/app');
      cy.get(`input[name="username"]`).should('exist');
      cy.visit('/app/dogs');
      cy.get(`input[name="username"]`).should('exist');
   });

   specify.skip(`Fail the test suite`, function() {
      assert(1 === 2);
   });
});
