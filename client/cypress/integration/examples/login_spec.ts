export {};

describe('Authentication tests', () => {
  it('Should login correctly when proper credentials are provided', () => {
    cy.visit(Cypress.env('TEST_URL'));
    cy.contains('My panel').should('not.exist');
    cy.get('button').contains('Sign in').click();
    cy.get("input[name='email']").type('pewof90552@tonaeto.com');
    cy.get("input[name='password']").type('Test1234@');
    cy.get('[data-cy=login-button]').click();
    cy.contains('My panel').should('exist');
    cy.contains('You have signed in.').should('exist');
  });
  it('Should display invalid credentials if invalid credentials are provided', () => {
    cy.visit(Cypress.env('TEST_URL'));
    cy.get('button').contains('Sign in').click();
    cy.contains('Invalid credentials').should('not.exist');
    cy.get("input[name='email']").type('test@mail.com');
    cy.get("input[name='password']").type('Test1234@');
    cy.get('[data-cy=login-button]').click();
    cy.contains('Invalid credentials').should('exist');
  });
});
