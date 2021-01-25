/// <reference types="cypress" />
// https://docs.cypress.io/api/cypress-api/selector-playground-api.html#Syntax

describe('Work with Alert', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    });
    beforeEach(() =>{
        cy.reload();
    });

    it('Using xpath', () => {
        cy.xpath('//input');
    })
});