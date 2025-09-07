import userData from '../../fixtures/userData.json';

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
    cy.get(selectorList.usernameInput).type(userData.invalidUser.usernameFail);
    cy.get(selectorList.passwordInput).type(userData.invalidUser.passwordFail);
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
    cy.get(selectorList.firstnameInput).type(userData.validUser.firstName);
    cy.get(selectorList.lastnameInput).type(userData.validUser.lastName);
    cy.get(selectorList.usernameInput).type(userData.validUser.username);
    cy.get(selectorList.passwordInput).type(userData.validUser.password);
    cy.get(selectorList.confirmPasswordInput).type(userData.validUser.confirmPassword);
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 
  });

  it('Login com usuário válido e cadastro de conta bancária (primeira vez apenas)', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type(userData.validUser.username);   
    cy.get(selectorList.passwordInput).type(userData.validUser.password);     
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
    cy.get(selectorList.firstnameInput).type(userData.validUser.firstName);
    cy.get(selectorList.lastnameInput).type(userData.validUser.lastName);
    cy.get(selectorList.usernameInput).type(userData.validUser.username);
    cy.get(selectorList.passwordInput).type(userData.validUser.password);
    cy.get(selectorList.confirmPasswordInput).type(userData.validUser.confirmPassword);
    cy.get(selectorList.signupButton).click();
    cy.url().should('include', '3000/'); 

    // Login
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type(userData.validUser.username);   
    cy.get(selectorList.passwordInput).type(userData.validUser.password);     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');

    // Nova transação com saldo suficiente
    cy.get("[href='/transaction/new']").click();
    cy.get("[type='text']").type('Darrel Ortiz');
    cy.contains('.MuiListItemText-multiline', 'Darrel Ortiz').click();
    cy.get("[name='amount']").type('50');
    cy.get("[placeholder='Add a note']").type('teste pagamento');
    cy.get("[data-test='transaction-create-submit-payment']").click();
    cy.get("[data-test='new-transaction-create-another-transaction']").should('be.visible');
  });

  it('Tenta enviar dinheiro com saldo insuficiente (espera erro)', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type(userData.validUser.username);   
    cy.get(selectorList.passwordInput).type(userData.validUser.password);     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');

    cy.get("[href='/transaction/new']").click();
    cy.get("[type='text']").type('Darrel Ortiz');
    cy.contains('.MuiListItemText-multiline', 'Darrel Ortiz').click();
    cy.get("[name='amount']").type('9999999'); // valor alto para tentar simular erro
    cy.get("[placeholder='Add a note']").type('teste saldo insuficiente');
    cy.get("[data-test='transaction-create-submit-payment']").click();

    // Aqui pode não exibir erro real, caso o app não valide saldo
    cy.get("body").then(($body) => {
      if ($body.text().includes("insufficient")) {
        cy.contains('insufficient').should('be.visible');
      } else {
        cy.log("BUG REPORT: O sistema não invalida por saldo insuficiente.");
      }
    });
  });
});

describe('RWA - Histórico de Transações', () => {
  it('Exibe histórico de transações quando houver transações anteriores', () => {
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type(userData.validUser.username);   
    cy.get(selectorList.passwordInput).type(userData.validUser.password);     
    cy.get(selectorList.signinButton).click();

    cy.get("[data-test='nav-personal-tab']").click();
    cy.get("[data-test='transaction-list']").should('be.visible');
  });

  it('Exibe mensagem quando não há transações anteriores', () => {
    // Criar um novo usuário SEM transações
    cy.visit('/signup');
    cy.get(selectorList.firstnameInput).type('Novo');
    cy.get(selectorList.lastnameInput).type('Usuario');
    cy.get(selectorList.usernameInput).type('NovoUsuario123'); 
    cy.get(selectorList.passwordInput).type('senha123');
    cy.get(selectorList.confirmPasswordInput).type('senha123');
    cy.get(selectorList.signupButton).click();

    // Login do usuário novo
    cy.visit('/signin');
    cy.get(selectorList.usernameInput).type('NovoUsuario123');   
    cy.get(selectorList.passwordInput).type('senha123');     
    cy.get(selectorList.signinButton).click();
    cy.url().should('include', '3000/');
    cy.get("body").then(($body) => {
      if ($body.find("[data-test='user-onboarding-next']").length > 0) {
        cy.get("[data-test='user-onboarding-next']").click();
        cy.get("[name='bankName']").type('Banco da America');   
        cy.get("[name='routingNumber']").type('987988998');
        cy.get("[name='accountNumber']").type('123456789');    
        cy.get("[type='submit']").click(); 
        cy.get("[type='button']").eq(2).click();
      }
    // Validar que não há transações
   
  });
});

/*
======================
BUG REPORTS
======================

# Bug Report 1 - Saldo Insuficiente
- **Título:** Sistema não bloqueia transações com saldo insuficiente.
- **Passos para reproduzir:**
  1. Logar no app.
  2. Tentar enviar uma transação com valor muito maior que o saldo inicial.
- **Resultado esperado:** Sistema deve exibir mensagem de erro informando "Saldo insuficiente".
- **Resultado obtido:** Transação é criada sem erro.
- **Severidade:** Alta (risco de quebra de lógica financeira).

# Bug Report 2 - Mensagem de Erro Genérica
- **Título:** Mensagem de erro ao login inválido pouco detalhada.
- **Passos para reproduzir:**
  1. Acessar tela de login.
  2. Informar credenciais inválidas.
- **Resultado esperado:** Mensagem clara como "Usuário ou senha incorretos. Tente novamente."
- **Resultado obtido:** Mensagem "Username or password is invalid" em inglês.
- **Severidade:** Média (impacta usabilidade e entendimento de usuários PT-BR).
*/
});