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

describe('RWA - Real World App - Login e Cadastro', () => {

  it('Exibe mensagem de erro ao usar credenciais inválidas', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('testerror');
    cy.get(selectorList.passwordInput).type('error123');
    cy.get(selectorList.signinButton).click();
    cy.get(selectorList.errorMessage).should('be.visible');
    cy.get(selectorList.errorMessage).should('contain', 'Username or password is invalid');
  });

  it('Exibe erros ao tentar registrar sem preencher campos obrigatórios', () => {
    cy.visit('/signup');
    cy.get(selectorList.signupButton).click();
    cy.get(selectorList.usernameInput).should('be.visible');
    cy.get(selectorList.lastnameInput).should('be.visible');
    cy.get(selectorList.passwordInput).should('be.visible');
    cy.get(selectorList.confirmPasswordInput).should('be.visible');
  });

  it('Registra um novo usuário com informações válidas', () => {
    cy.visit('/signup');
    cy.get(selectorList.firstnameInput).type('Gabriel');
    cy.get(selectorList.lastnameInput).type('Scoot');
    cy.get(selectorList.usernameInput).type('GabrielScoot_'); 
    cy.get(selectorList.passwordInput).type('teste123');
    cy.get(selectorList.confirmPasswordInput).type('teste123');
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 
  });

  it('Login com usuário válido e cadastro de conta bancária (primeira vez apenas)', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('GabrielScoot_');   
    cy.get(selectorList.passwordInput).type('teste123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');

    // Esse fluxo só acontece uma vez no primeiro login
    cy.get("body").then(($body) => {
      if ($body.find("[data-test='user-onboarding-next']").length > 0) {
        cy.get("[data-test='user-onboarding-next']").click();
        cy.get("[name='bankName']").type('Banco do Brasil');   
        cy.get("[name='routingNumber']").type('987654321');
        cy.get("[name='accountNumber']").type('123456789');    
        cy.get("[type='submit']").click(); 
        cy.get("[type='button']").eq(2).click();
      }
    });
  });

});

describe('RWA - Dashboard e Nova Transação', () => {
  it('Deve registrar usuário, logar e criar uma nova transação', () => {
    // Cadastro
    cy.visit('/signup');
    cy.get(selectorList.firstnameInput).type('Gabriel');
    cy.get(selectorList.lastnameInput).type('Scoot');
    cy.get(selectorList.usernameInput).type('GabrielScoot_'); 
    cy.get(selectorList.passwordInput).type('teste123');
    cy.get(selectorList.confirmPasswordInput).type('teste123');
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 

    // Login
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('GabrielScoot_');   
    cy.get(selectorList.passwordInput).type('teste123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');

    // Nova transação
    cy.get("[href='/transaction/new']").click();
    cy.get("[type='text']").type('Darrel Ortiz');
    cy.contains('.MuiListItemText-multiline', 'Darrel Ortiz').click();
    cy.get("[name='amount']").type('500');
    cy.get("[placeholder='Add a note']").type('deposit');
    cy.get("[data-test='transaction-create-submit-payment']").click();
    cy.get("[data-test='new-transaction-create-another-transaction']").click();
  });
});
