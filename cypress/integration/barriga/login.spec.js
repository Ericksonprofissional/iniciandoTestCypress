/// <reference types="cypress" />

describe('Dinamic test', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
    });

    it('Login', ()=>{
        cy.get('.input-group > .form-control').type('ericksonprofissional@gmail.com');
        cy.get(':nth-child(2) > .form-control').type('teste@1010');
        cy.get('.btn').click();
    });

    it('Message success',()=>{
        cy.get('.toast-message').should('contain','Bem vindo, ');
    })
});