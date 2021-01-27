/// <reference types="cypress" />

describe('Dinamic test', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin();
    });
    const uid = Cypress._.random(0, 1e6);
    console.log(uid)

    it('Should create an account',() => {
        cy.get('[data-test=menu-settings]').click();
        cy.get('[href="/contas"]').click();
        cy.get('[data-test=nome]', {timeout:5000}).type(`Aline${uid}`);
        cy.get('.btn').click();
        cy.alert('.toast-message', 'Conta inserida com sucesso');
    });

    it('Should alter an account', () => {
        cy.xpath(`//table//td[contains(., 'Aline${uid}')]/..//i[@class='far fa-edit']`).click();
        cy.get('[data-test=nome]', {timeout:5000}).type(` Martinez`);
        cy.get('.btn').click();
        cy.alert('.toast-message', 'Conta atualizada com sucesso');
    });
});