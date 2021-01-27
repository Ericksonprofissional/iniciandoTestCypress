/// <reference types="cypress" />

import loc from '../../support/locator';

describe('Dinamic test', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin();
    });

    it('Should create an account',() => {
        cy.get(loc.MENU.SETINGS).click();
        cy.get(loc.MENU.CONTAS).click();
        cy.get(loc.CONTAS.NOME).type(`Aline${loc.RANDOM}`);
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'Conta inserida com sucesso');
    });

    it('Should alter an account', () => {
        cy.xpath(loc.CONTAS.XP).click();
        cy.get(loc.CONTAS.NOME).type(` Martinez`);
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'Conta atualizada com sucesso');
    });

    it('Reset accounts', () => {
        cy.wait(5000);
        cy.get(loc.MENU.SETINGS).click();
        cy.get(loc.MENU.RESET).click();
        cy.alert(loc.MESSAGE, 'Dados resetados com sucesso');
    });

    it('Logout sistem', () =>{
        cy.wait(5000);
        cy.get(loc.MENU.SETINGS).click();
        cy.get(loc.MENU.LOGOUT).click();
        cy.alert(loc.MESSAGE, 'Até Logo!');
    });
});