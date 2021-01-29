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
        }).its('body.token').should('not.be.empty')
            .then(token =>{
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/contas',
                    headers: { Authorization: `JWT ${token}`},
                    body: {
                        nome: 'Erickson API REST1'
                    }
                }).as('response');
            })

            cy.get('@response').then(res=>{
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Erickson API REST1')
            })
    });
});