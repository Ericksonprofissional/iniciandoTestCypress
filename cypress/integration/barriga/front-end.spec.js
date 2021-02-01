/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';

describe('Test Sistema de cobrança de aluguel', () => {
    after(()=>{
        cy.clearLocalStorage();
    })
    before(() => {
        cy.server();
        cy.rotas(
            'POST',
            'signin',
           {
               id: 1000,
               nome: 'Usuario falso',                
               token: 'Uma string muito grande que não deveria ser aceito mas no teste vai'
            },
            'login'
        );
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
        }).as('saldo');
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'testee@1010');
    });


    it('Should create an account',() => {
        cy.rotas(
            'GET',
            'contas',
            [
                {id: '1', nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome:'Poupança', visivel: true, usuario_id: 1}
            ],
            'showAccount'
            );
        cy.rotas(
            'POST',
            'contas',
            [
                {id: 3, nome:'Corrente', visivel: true, usuario_id: 1}
            ],
            'createAccount'
        );

        cy.AcessarMenuContas();
        
        cy.rotas(
            'GET',
            'contas',
            [
                {id: '1', nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome:'Poupança', visivel: true, usuario_id: 1},
                {id: 3, nome:'Corrente', visivel: true, usuario_id: 1}
            ],
            'showAccount'
        );
        cy.inserirContas('Corrente')
        cy.alert(loc.MESSAGE, 'Conta inserida com sucesso');
    });

    it('Should alter an account', () => {
        cy.server();
        cy.rotas(
            'PUT',
            'contas/**',
            [
                {id: 1, nome: 'Carteira Alterada', visivel: true, usuario_id: 1}
            ],
            'alterAccount'
        );
        
        cy.rotas(
            'GET',
            'contas',
            [
                {id: 1, nome: 'Carteira', visivel: true, usuario_id: 1},
                {id: 2, nome:'Poupança', visivel: true, usuario_id: 1},
                {id: 3, nome:'Corrente', visivel: true, usuario_id: 1}
            ],
            'Account'
        );  
      
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALETERAR('Carteira')).click();
        cy.inserirContas('Carteira Alterada');          
        cy.get(loc.CONTAS.BTN_SALVAR).click();  
        cy.alert(loc.MESSAGE, 'Conta atualizada com sucesso');
        
    });

    it.skip('Should not create an account with same name', ()=>{
        cy.AcessarMenuContas();
        /* tentar fazer dinamicamente Pegar o nome na conta
        cy.xpath('//table//tr//td[not(contains(., "Conta")) and not(contains(., " | "))]/text()')
        */
       cy.inserirContas('Erickson Martinez')
       cy.alert(loc.MESSAGE, 'code 400')
        //cy.logoutSytem();
    });

});