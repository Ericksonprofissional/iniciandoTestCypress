/// <reference types="cypress" />

describe('Test Sistema de cobrança de aluguel', () => {
    before(() => {
        //cy.barrigaLogin('ericksonprofissional@gmail.com', 'teste@1010');
    });
    beforeEach(() => {
        //cy.contasReset();
    });

    it('Should login',() => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "ericksonprofissional@gmail.com",
                redirecionar: false,
                senha: "teste@1010",
            }
        }).its('body.token').should('not.be.empty');
    });
});