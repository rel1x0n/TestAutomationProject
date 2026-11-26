describe('Порівняння: Cypress', () => {
  beforeEach(() => { cy.visit('/login.html'); }); // localStorage очищується автоматично (testIsolation)

  const login = (user, pass) => {
    cy.get('#username').type(user);
    cy.get('#password').type(pass);
    cy.get('button[type="submit"]').click();
  };

  it('TC1: успішний вхід відкриває Dashboard', () => {
    login('testuser', 'password123');
    cy.url().should('match', /dashboard\.html$/);
    cy.get('h1').should('have.text', 'Dashboard');
  });

  it('TC2: невірний пароль показує помилку', () => {
    login('testuser', 'wrong');
    cy.get('#login-error').should('be.visible').and('have.text', 'Невірний логін або пароль');
  });

  it('TC3: створення публікації', () => {
    login('testuser', 'password123');
    cy.get('#post-title').type('Порівняння фреймворків');
    cy.get('#post-body').type('Звіт ІНДЗ');
    cy.get('#add-post').click();
    cy.get('.post h3').first().should('have.text', 'Порівняння фреймворків');
  });

  it('TC4: пошук публікації за ключовим словом', () => {
    login('testuser', 'password123');
    cy.get('#search').type('автоматизація');
    cy.get('.post').should('have.length', 1);
    cy.get('.post h3').should('have.text', 'Автоматизація тестування');
  });

  it('TC5: вихід із системи', () => {
    login('testuser', 'password123');
    cy.get('#logout').click();
    cy.url().should('match', /login\.html$/);
  });
});
