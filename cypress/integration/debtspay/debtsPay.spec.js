/// <reference types="cypress" />

const renda = 1000;
const dividasTitulos = ['luz', 'agua', 'faculdade', 'carro', 'Financiamento Casa']

describe('Test Sistema organização de dividas', () => {
    before(() => {
        cy.visit('https://ericksonprofissional.github.io/debtspay/index.html');
    });
    it('Rota para cadastro de dividas',()=>{
        cy.get('.cadastro a')
            .should('contain', 'Cadastre as dividas')
            .click();
            cy.get('h1').contains('Organizando as coisas por aqui');
    });

    it('Validando dados errados na renda mensal',()=>{
        cy.get('h2').should('contain', 'Para começarmos precisamos saber seus principais ganhos');
        cy.get('[name=rendaMensal]').type('teste');
        cy.get('.mostraPassoDois').click();
        cy.get('#vrenda').should('contain', 'Permitido apenas Numeros');
    });

    it('Inserindo renda mensal',()=>{
        cy.get('[name=rendaMensal]')
            .clear()
            .type(renda);
        cy.get('.mostraPassoDois').click();
        cy.get('#vrenda').should('contain', 'Permitido apenas Numeros');
    });

    it('Confirmando valor Renda', () => {
        cy.get('#rendaMensal1').contains(renda);
    });

    it('inserindo Descrição Divida',()=>{
        cy.wrap(dividasTitulos).then( divida => {
            cy.get('[name=tituloDivida]').type('divida');
        })
    })

})