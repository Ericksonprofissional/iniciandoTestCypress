/// <reference types="cypress" />

describe("Cypress basics", () => {
    it("Should visit a page and assert title", () => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
        //const title = cy.title;
        //console.log(title)

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('be.contain', 'Campo')


        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('be.contain', 'Campo')


        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .and('be.contain', 'Campo')

        let syncTitle;
        cy.title()
            .then(value => {
                console.log(value);
                cy.get('#formNome')
                    .type(value);
                syncTitle = value;
            });
            console.log(syncTitle);
        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })
        
        cy.get('#elementosForm\\:sugestoes').then($el =>{
            cy.wrap($el).type(syncTitle);
        })
        
    })
    it('Should find and interact with',()=>{
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!');
    });

});
