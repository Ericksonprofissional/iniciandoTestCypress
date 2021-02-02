/// <reference types="cypress" />

const renda = 3000;
const dividasTitulos = ['luz', 'agua', 'faculdade', 'carro', 'Financiamento Casa']
const dividasValor = [150, 50, 550, 550, 900]

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

    it('inserindo Divida parcelado',()=>{
     
           
                cy.get('[name=tituloDivida]').type('Wise UP');
                cy.get('.vdivida').type(900);
                cy.get('#parceladoSim').check();
                cy.get('select').select('12 vezes')
                cy.get('#aVistaSim').check();
                cy.get('form > button').click();              
        
    })

    it('inserindo Divida a vista',()=>{
        cy.wrap(dividasTitulos).then( divida => {
            divida.forEach( div =>{
                let id = dividasTitulos.indexOf(div);
                cy.get('[name=tituloDivida]').type(`${div}`);
                cy.get('.vdivida').type(dividasValor[id]);
                cy.get('#parceladoNao').check();
                cy.get('#aVistaSim').check();
                cy.get('form > button').click();              
            })
        })
    })


    it('Exportando os dados', () => {
        cy.get('#exportar')
    })
})