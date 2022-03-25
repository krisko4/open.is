export {};
describe('Routing tests', () => {
  describe('Home page', () => {
    beforeEach(() => {
      cy.visit(Cypress.env('TEST_URL'));
    });
    it('Should navigate to /contact on contact button click', () => {
      cy.contains('Contact').click();
      cy.url().should('eq', `${Cypress.env('TEST_URL')}/contact`);
      cy.contains('Contact us');
    });
    it('Should navigate to /about on contact button click', () => {
      cy.contains('About us').click();
      cy.url().should('eq', `${Cypress.env('TEST_URL')}/about`);
    });
  });
});
