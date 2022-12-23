describe('Login Site', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Login Site Visible', () => {
    cy.title().should('eq', 'CityBillSystem');
    cy.get('app-root > app-login > div > h1').contains('Login');
  });

  describe('Invalide Username Validation Message', () => {
    afterEach(() => {
      cy.get('form > div.alert').should('exist');
    });
    it('invalide char', () => {
      cy.get('#username').type('wrongUserName!');
      cy.get('#password').type('Hansi123');
      cy.get('form > div.alert > div').should(
        'contain.text',
        'Benutzername kann nur aus folgenden Zeichen bestehen. a-Z 0-9'
      );
    });
    it('to short', () => {
      cy.get('#username').type('f');
      cy.get('#password').type('Hansi123');
      cy.get('form > div.alert > div').should(
        'contain.text',
        'Benutzername muss mindestens 6 Zeichen lang sein.'
      );
    });
    it('to long', () => {
      cy.get('#username').type('Hansi123Hansi123Hansi123Hansi123');
      cy.get('#password').type('Hansi123');
      cy.get('form > div.alert > div').should(
        'contain.text',
        'Benutzername kann maximal 16 Zeichen lang sein.'
      );
    });
    it('empty', () => {
      cy.get('#username').type('Hansi123').clear();
      cy.get('#password').type('Hansi123');
      cy.get('form > div.alert > div').should(
        'contain.text',
        'Benutzername muss eingegeben werden.'
      );
    });
  });
});
