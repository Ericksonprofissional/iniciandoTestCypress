/// <reference types="cypress" />

describe('Dinamic test', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin();
    });

    it('Should create an account',() => {
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test=nome]').type('Aline1');
        cy.get('.btn').click();
        cy.alert('.toast-message', 'Conta inserida com sucesso');
    });
});