const selectorList = {
  firstnameInput: "[name='firstName']",
  usernameInput: "[name='username']",  
  lastnameInput: "[name='lastName']",
  passwordInput: "[name='password']",
  signinButton: '[data-test="signin-submit"]',
  signupButton: '[data-test="signup-submit"]', 
  errorMessage: '[data-test="signin-error"]',
  confirmPasswordInput: "[name='confirmPassword']",
};
/*
describe('RWA - Real World App - Login valido, invalid', () => {

  it('Display error message when using invalid credentials', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('testerror');
    cy.get(selectorList.passwordInput).type('error123');
    cy.get(selectorList.signinButton).click();
    cy.get(selectorList.errorMessage).should('be.visible');
    cy.get(selectorList.errorMessage).should('contain', 'Username or password is invalid');
  });

  it('Error messages displayed when trying to register without filling in required fields', () => {
    cy.visit('/signup');
    cy.get(selectorList.signupButton).click();
    cy.get(selectorList.usernameInput).should('be.visible');
    cy.get(selectorList.lastnameInput).should('be.visible');
    cy.get(selectorList.passwordInput).should('be.visible');
    cy.get(selectorList.confirmPasswordInput).should('be.visible');
  });

  it('Register a new user with valid information', () => {
    cy.visit('/signup');
    cy.get(selectorList.firstnameInput).type('Gabriel');
    cy.get(selectorList.lastnameInput).type('Scoot');
    cy.get(selectorList.usernameInput).type('GabrielScoot_'); 
    cy.get(selectorList.passwordInput).type('teste123');
    cy.get(selectorList.confirmPasswordInput).type('teste123');
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 
  });

  it('Login with a valid username', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('GabrielScoot_');   
    cy.get(selectorList.passwordInput).type('teste123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');
  });
});
*/

// dashboard
describe('Registraction - success', () => {
  it('should login and registro to dashboard', () => {
    cy.visit('/signup');
    cy.get(selectorList.firstnameInput).type('Gabriel');
    cy.get(selectorList.lastnameInput).type('Scoot');
    cy.get(selectorList.usernameInput).type('GabrielScoot_'); 
    cy.get(selectorList.passwordInput).type('teste123');
    cy.get(selectorList.confirmPasswordInput).type('teste123');
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('GabrielScoot_');   
    cy.get(selectorList.passwordInput).type('teste123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');

   //new transação
    cy.get("[href='/transaction/new']").click();
    cy.get("[type='text']").type('Darrel Ortiz');
    cy.contains('.MuiListItemText-multiline', 'Darrel Ortiz').click();
    cy.get("[name='amount']").type('500');
    cy.get("[placeholder='Add a note']").type('deposit');
    cy.get("[data-test='transaction-create-submit-payment']").click();
    cy.get("[data-test='new-transaction-create-another-transaction']").click();
    
  });
});
