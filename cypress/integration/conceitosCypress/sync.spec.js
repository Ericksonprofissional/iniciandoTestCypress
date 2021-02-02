/// <reference types="cypress" />
describe('Esperas', ()=>{
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })

    beforeEach(() => {
        cy.reload(); //limpando os teste
    });

    it('Deve aguardar elemento estar disponivel',()=>{
        cy.get('#novoCampo').should('not.exist');
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo').should('not.exist');
        cy.get('#novoCampo').should('exist');
        //cypress aguarda automaticamente ate que o elemento esteja disponivel
        cy.get('#novoCampo').type('Funcioniou;')
    })

    it('Deve fazer retrys',()=>{
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo')
            //.should('not.exist')
            .should('exist')
            .type('Funcioniou;')
    })

    it('Listar', ()=>{
        cy.get('#buttonList').click();
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
        cy.get('#lista  li span')                                       
            .should('contain', 'Item 2')
    })

    it('Listar', ()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista li span')
            .should('contain', 'Item 1')
        cy.get('#lista  li span')                                       
            .should('contain', 'Item 2')
    })

    it('Uso do timeOut',()=>{
        cy.get('#buttonDelay').click();
        cy.get('#novoCampo', {timeout: 3000})
            .should('exist')
    })

    it('Uso do timeOut',()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista  li span')
            .should('have.length', 1);
        cy.get('#lista  li span')
            .should('have.length', 2);
    })

    it('Click retry',()=>{
        cy.get('#buttonCount')
            .click()
            .should('have.value', '1')
    })
    it('Click retry',()=>{
        cy.get('#buttonListDOM')
        .click();
        cy.get('#lista  li span').should($el =>{
            console.log($el)
            expect($el).to.have.length(1)
        })
        cy.get('#lista  li span').then($el =>{
            console.log($el)
            expect($el).to.have.length(1)
        })
    })
    it('Should vs Then', ()=>{
        cy.get('#buttonListDOM').click();
        cy.get('#lista li span').then($el => {
            console.log($el)
            expect($el).to.have.length(1);
        })
    })
    it('Should vs Then', ()=>{
        cy.get('#buttonListDOM').then($el => { // Should entraria em loop infinito
            console.log($el)
            expect($el).to.have.length(1);
            cy.get('#buttonList');
        })
    })
})



