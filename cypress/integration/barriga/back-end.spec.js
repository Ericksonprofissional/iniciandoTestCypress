/// <reference types="cypress" />

describe('Test Sistema de cobrança de aluguel', () => {
    let token
    before(() => {
        cy.getToken("ericksonprofissional@gmail.com", "teste@1010")
            .then(tkn => token = tkn)
    });
    beforeEach(() => {
        //cy.contasReset();
    });

    it('Should reset API REST',() => {
        cy.action('GET', 'reset', token, )
    });

    it('Should create an account API rest',() => {
        cy.action('POST', 'contas', token, {nome: 'Erickson API REST3'})
            .as('response');

            cy.get('@response').then(res=>{
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Erickson API REST3')
            })
    });

    
});