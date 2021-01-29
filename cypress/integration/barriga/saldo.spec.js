/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';

describe('Saldo Conta', () => {
    before(() => {
        cy.visit('http://barrigareact.wcaquino.me/');
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'teste@1010');
    });

    it('Should create a transaction', ()=>{
       cy.get(loc.MENU.HOME).click();
       cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta mesmo nome')).should('contain', '123,00')
    });

})