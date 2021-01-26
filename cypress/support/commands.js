// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click();
    cy.on('window:alert', msg =>{
        console.log(msg);
        expect(msg).to.be.equal(message)
    });
});

Cypress.Commands.add('barrigaLogin', ()=>{
    cy.get('.input-group > .form-control').type('ericksonprofissional@gmail.com');
    cy.get(':nth-child(2) > .form-control').type('teste@1010');
    cy.get('.btn').click();
    cy.alert('.toast-message', 'Bem vindo, ');
});

Cypress.Commands.add('alert', (locator, message) =>{
    cy.get(locator).should('contain',message);

})