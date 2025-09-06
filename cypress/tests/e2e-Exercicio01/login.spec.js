// Defina o selectorList fora do describe para usar em todos os testes
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
    cy.get(selectorList.usernameInput).type('GabrielScoot_'); // faltava username
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


// dashboard
describe('Login - success', () => {
  it('should login and redirect to dashboard', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('GabrielScoot_');   
    cy.get(selectorList.passwordInput).type('teste123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');
    
    cy.get("[name='bankName']").type('Banco do Brasil');   
    cy.get("[name='routingNumber']").type('987654321');
    cy.get("[name='accountNumber']").type('123456789');    
    cy.get(".css-flggza-MuiGrid-root").click();
  });
});
