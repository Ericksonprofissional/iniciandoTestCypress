/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';

describe('Test Sistema de cobrança de aluguel', () => {
    before(() => {
        cy.server();
        cy.route({
            method: 'POST',
            url: 'signin',
            response: {
                id: 1000,
                nome: 'Usuario falso',                
                token: 'Uma string muito grande que não deveria ser aceito mas no teste vai'
            }
        });
        cy.route({
            method: 'GET',
            url: 'saldo',
            response: [{
                conta_id: 1000,
                conta: 'Carteira',
                saldo: '10050.00'
            },
            {
                conta_id: 1001,
                conta: 'Poupança',
                saldo:  '1500.12'
            }
        ]
        })
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'testee@1010');
        //cy.contasReset();
    });

    it('Should create an account',() => {
        cy.AcessarMenuContas();
        cy.inserirContas('Erickson')
        cy.alert(loc.MESSAGE, 'Conta inserida com sucesso');
    });

    it('Should alter an account', () => {
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALETERAR('Conta mesmo nome')).click();
        cy.inserirContas('Martinez')
        cy.get(loc.CONTAS.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'Conta atualizada com sucesso');
    });

    it('Should not create an account with same name', ()=>{
        cy.AcessarMenuContas();
        /* tentar fazer dinamicamente Pegar o nome na conta
        cy.xpath('//table//tr//td[not(contains(., "Conta")) and not(contains(., " | "))]/text()')
        */
       cy.inserirContas('Erickson Martinez')
       cy.alert(loc.MESSAGE, 'code 400')
        //cy.logoutSytem();
    });

});