/// <reference types="cypress" />

describe('Work with ifame', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() =>{
        cy.reload();
    })

    it('Deve preencher campo de texto',()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#frame1')
            .then(iframe =>{
                const body = iframe.contents()
                    .find('body');

            cy.wrap(body)
                .find('#tfield')
                .type('Funciona?')
                .should('to.have.value', 'Funciona?');
            cy.on('window:alert', msg =>{
                console.log(msg);
                expect(msg).to.be.equal('Alert Simples')
            })
            //cy.wrap(body)
            //  .find('#otherButton').click();
        });
    })
    it('Deve testar frame diretamente',()=>{
        cy.visit('http://wcaquino.me/cypress/frame.html');
        cy.get('#tfield')
            .type('Funciona!')
        cy.get('#otherButton')
            .click();
        cy.on('window:alert', msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Click OK!')
        })
    })
});