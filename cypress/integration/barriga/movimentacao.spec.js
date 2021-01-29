/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';

describe('Registrando movimentações', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'teste@1010');
        cy.contasReset();
    });

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Erickson');
        cy.get(loc.MOVIMENTACAO.STATUS).click();
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta mesmo nome');
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'sucesso');
    });

    it('Confirmando lista',() => {
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', 123)).should('exist');
    });

    it('Remove a transaction', () => {
        cy.xpath(loc.EXTRATO.FN_XP_EXCLUIR_ELEMENTO('Movimentacao de conta')).click();
        cy.alert(loc.MESSAGE,'removida com sucesso');
    });

})