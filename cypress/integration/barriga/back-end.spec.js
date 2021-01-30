/// <reference types="cypress" />


describe('Test Sistema de cobrança de aluguel', () => {
    let token
    let idConta = 0;
    let rand = Cypress._.random(1, 1e1);
    before(() => {
        cy.getToken("ericksonprofissional@gmail.com", "teste@1010")
            .then(tkn => token = tkn)
    });
    beforeEach(() => {
        //cy.contasReset();
    });

    it('Should reset API REST',() => {
        cy.action('GET', 'reset', token)
    });

    it('Should create an account API rest',() => {
        cy.action('POST', 'contas', token, {nome: `Erickson API REST${rand}`})
            .as('response');

            cy.get('@response').then(res=>{
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', `Erickson API REST${rand}`)
            });
    });

    it('Should alter an account API rest',() => {
        cy.getConta(token).then(idConta => {
            cy.action('PUT', `contas/${idConta}`, token, {nome: `Alteradar conta ${idConta}`}).then(res => {
                expect(res.status).to.be.equal(200);
            })
        });
    });

    it('Should alter an account API REST same name',()=>{
        cy.action(
            'PUT',
            `contas/${idConta}`,
            token,
            {nome: `Conta mesmo nome`},
            '',
            false
            ).then( res => {
                expect(res.status).be.equal(400)
            });
    });

    it('Should extrato transaction',() => {
        cy.action('GET', 'extrato/202101', token,'', 'orderBy: data_pagamento').then(res => {console.log(res.body)
        expect(res.status).to.be.equal(200);
        })
    });

    it('Create a transaction',() => {
        cy.getConta(token).then( id => {
            cy.action(
                'POST',
                'transacoes',
                token,
                {
                    conta_id: id,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "Erickson movimentação",
                    envolvido: "Erickson",
                    status: true,
                    tipo: "REC",
                    valor: "10000.00",
                }
            ).as('response');

            cy.get('@response').its('status').should('be.equal', 201);
            cy.get('@response').its('body.id').should('exist');
        })
    })
});