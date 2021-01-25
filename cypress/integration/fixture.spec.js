/// <reference types="cypress" />

describe('Fixture test', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() =>{
        cy.reload();
    });

    it('Get data form fixture file', function () {
        cy.fixture('useData')
            .as('usuario')
            .then(() => {
                cy.get('#formNome').type(this.usuario.nome);
                cy.get('#formSobrenome').type(this.usuario.sobreNome);
                cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click();
                cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}]`).click();
                cy.get('#formEscolaridade').select(this.usuario.escolaridade)
                cy.get('#formEsportes').select(this.usuario.esportes)
                cy.get('#formCadastrar').click();
                cy.get('#resultado > :nth-child(1)').should('contain','Cadastrado')
            });
    });
});