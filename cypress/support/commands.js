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

import loc from '../support/locator';

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click();
    cy.on('window:alert', msg =>{
        console.log(msg);
        expect(msg).to.be.equal(message)
    });
});

Cypress.Commands.add('barrigaLogin', ()=>{
    cy.get(loc.LOGIN.USER).type('ericksonprofissional@gmail.com');
    cy.get(loc.LOGIN.SENHA).type('teste@1010');
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.alert(loc.MESSAGE, 'Bem vindo, ');
});

Cypress.Commands.add('alert', (locator, message) =>{
    cy.get(locator).should('contain',message);

})