/// <reference types="cypress" />

import loc from '../../support/locator';

describe('Test Sistema de cobrança de aluguel', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'teste@1010');
        cy.contasReset();
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

    it('Logout sistem', () =>{
        cy.wait(5000);
        cy.get(loc.MENU.SETINGS).click();
        cy.get(loc.MENU.LOGOUT).click();
        cy.alert(loc.MESSAGE, 'Até Logo!');
    });
});