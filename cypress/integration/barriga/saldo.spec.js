/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';

describe('Saldo Conta', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'teste@1010');
        cy.contasReset();
    });

    it('Should a transaction', ()=>{
       cy.get(loc.MENU.HOME).click();
       cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '534,00');
    });

    it('Alter saldo',()=>{
        cy.get(loc.MENU.EXTRATO).click();
        cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_ELEMENTO('Movimentacao 1, calculo saldo')).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo');
        cy.get(loc.MOVIMENTACAO.STATUS).click();
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'sucesso');
        cy.wait(1000)
        cy.get(loc.MENU.HOME).click();
        cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo')).should('contain', '4.034,00');

    });

})