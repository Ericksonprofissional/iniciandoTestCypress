/// <reference types="cypress" />

import loc from '../../support/locator';
import '../../support/CommandsConta';
import buildEnv from '../../support/buildEnv'

describe('Test Sistema de cobrança de aluguel', () => {
    after(()=>{
        cy.clearLocalStorage();
    })
    beforeEach(() => {
        buildEnv();
        cy.barrigaLogin('ericksonprofissional@gmail.com', 'testee@1010');

    });

    it('Should create an account',() => {

        cy.rotas(
            'POST',
            'contas',
            [
                {id: 3, nome:'Corrente', visivel: true, usuario_id: 1}
            ],
            'createAccount'
        );

        cy.acessarMenuContas();
        
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
        cy.rotas(
            'PUT',
            'contas/**',
            [
                {id: 1, nome: 'Carteira Alterada', visivel: true, usuario_id: 1}
            ],
            'alterAccount'
        );
        cy.acessarMenuContas()
        cy.xpath(loc.CONTAS.FN_XP_BTN_ALETERAR('Carteira')).click();
    
        cy.inserirContas('Alterada');          
        cy.get(loc.CONTAS.BTN_SALVAR).click();  
        cy.alert(loc.MESSAGE, 'Conta atualizada com sucesso');
        
    });

    it('Should not create an account with same name', ()=>{
        cy.rotas(
            'POST',
            'contas',
            {error: 'Já existe uma conta com esse nome!'}
            ,
            'createSameAccount',
            400
        );    
       
        cy.acessarMenuContas();
        cy.inserirContas('Poupança')
        cy.alert(loc.MESSAGE, 'code 400')
    });

    it('Should create a transaction', () => {

        cy.rotas(
            'POST',
            'transacoes',
            {
                conta_id: 397989,
                data_pagamento: "2021-02-01T03:00:00.000Z",
                data_transacao: "2021-02-01T03:00:00.000Z",
                descricao: "Aline",
                envolvido: "erickson",
                id: 363967,
                observacao: null,
                parcelamento_id: null,
                status: true,
                tipo: "REC",
                transferencia_id: null,
                usuario_id: 13113,
                valor: "600.00",

            }
        )
        cy.rotas(
            'GET',
            'extrato/**',
            'fixture:movimentacaoSalva'        );
        cy.get(loc.MENU.MOVIMENTACAO).click();
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc');
        cy.get(loc.MOVIMENTACAO.VALOR).type('123');
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Erickson');
        cy.get(loc.MOVIMENTACAO.STATUS).click();
        cy.get(loc.MOVIMENTACAO.CONTA).select('Carteira');
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click();
        cy.alert(loc.MESSAGE, 'sucesso');
        cy.xpath(loc.EXTRATO.FN_XP_BUSCA_ELEMENTO('Desc', 123)).should('exist');
    });
});