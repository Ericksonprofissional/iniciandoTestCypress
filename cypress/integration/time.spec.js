/// <reference types="cypress" />

describe('Work with PopUp', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() =>{
        cy.reload();
    })

    it('Goin back to the past', ()=>{
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '25/01/2021');

        cy.clock();
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '31/12/1969');

        const dt = new Date(2021, 1, 22, 15, 23, 50);
        cy.clock(dt.getTime());
        cy.get('#buttonNow').click();
        cy.get('#resultado > span').should('contain', '31/12/1969');
    })

    it('Goes to the future', ()=>{
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').should('contain', '161162');
        cy.get('#resultado > span').invoke('text')
            .should('gt', 161162);
        cy.clock();
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text')
            .should('lte', 0);
        cy.wait(1000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text')
            .should('lte', 1000);
        cy.tick(5000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text')
            .should('gte', 5000);
        cy.tick(10000);
        cy.get('#buttonTimePassed').click();
        cy.get('#resultado > span').invoke('text')
            .should('gte', 15000);

    });
});