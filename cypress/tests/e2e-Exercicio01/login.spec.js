describe('Login - success', () => {
  it(' login with a valid username', () => {
    cy.visit('/signin');
    cy.get('#username').type('testuser');   
    cy.get('#password').type('secret');     
    cy.get('[data-test="signin-submit"]').click();
  });
});

describe('Login - invalid', () => {
  it('Display error message when using invalid credentials', () => {
    cy.visit('/signin');
    cy.get('#username').type('usuario_invalido');
    cy.get('#password').type('senha_errada');
    cy.get('[data-test="signin-submit"]').click();
    cy.get('[data-test="signin-error"]').should('be.visible');
    cy.get('[data-test="signin-error"]').should('contain', 'Username or password is invalid');
  });
});

describe('New user registration', () => {
  it(' Register a new user with valid information', () => {
    cy.visit('/signup');
    cy.get('#firstName').type('Novo');
    cy.get('#lastName').type('Usuário');
    cy.get('#username').type(`usuario${Date.now()}`);
    cy.get('#password').type('senha123');
    cy.get('#confirmPassword').type('senha123');
    cy.get('[data-test="signup-submit"]').click();
    cy.url().should('include', '/signup'); 
  });
});

describe('Registration with incomplete information', () => {
  it(' Error messages displayed when trying to register without filling in required fields', () => {
    cy.visit('/signup');
    cy.get('[data-test="signup-submit"]').click();

    cy.get("[name='firstName']");
    cy.get("[name='lastName']").should('be.visible');
    cy.get("[name='username']").should('be.visible');
    cy.get("[name='password']").should('be.visible');
    cy.get("[name='confirmPassword']").should('be.visible');
  });
});




