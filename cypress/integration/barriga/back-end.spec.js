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
        cy.action('GET', 'extrato/202101', token,'', 'orderBy: data_pagamento').then(res => {
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
        });
    });

    it('Should get balance', () => {
        cy.action(
            'GET',
            'saldo',
            token
        ).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')
                    saldoConta = c.saldo;               
            });
            expect(saldoConta).to.be.equal('534.00')
        });
        
        cy.action(
            'GET',
            'transacoes',
            token,
        ).then(res => {
            let movimentacao = null
            res.body.forEach( mov => {
                if(mov.descricao == 'Movimentacao 1, calculo saldo'){
                    movimentacao = {
                            id: mov.id,
                            conta_id: mov.conta_id,
                            data_pagamento: Cypress.moment().format('DD/MM/YYYY'),
                            data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                            descricao: mov.descricao,
                            envolvido: mov.envolvido,
                            status: true,
                            tipo: mov.tipo,
                            valor: mov.valor,                       
                    }
                }
            });
            return movimentacao
        }).then( mov=> {
            cy.action(
                    'PUT',
                    `transacoes/${mov.id}`,
                    token,
                    mov
                ).as('response');    
                cy.get('@response').its('status').should('be.equal', 200);
            });
        
    });

    it('Should get balance, with alter a transiction', () => {
        cy.action(
            'GET',
            'saldo',
            token
        ).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')
                    saldoConta = c.saldo;               
            });
            expect(saldoConta).to.be.equal('4034.00')
        });
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
        });
    });

    it('Should DELETE transaction', () => {
        cy.action(
            'GET',
            'saldo',
            token
        ).then(res => {
            let saldoConta = null;
            res.body.forEach(c => {
                if(c.conta === 'Conta para movimentacoes')
                    saldoConta = c.saldo;               
            });
            expect(saldoConta).to.be.equal('-1500.00')
        });
        
        cy.action(
            'GET',
            'transacoes',
            token,
        ).then(res => {
            let movimentacao = null
            res.body.forEach( mov => {
                if(mov.descricao == 'Movimentacao para exclusao'){
                    movimentacao = mov.id;
                }
            });
            return movimentacao
        }).then( mov=> {
            cy.action(
                    'DELETE',
                    `transacoes/${mov}`,
                    token,
                ).as('response');    
                cy.get('@response').its('status').should('be.equal', 204);
            });        
    });

});