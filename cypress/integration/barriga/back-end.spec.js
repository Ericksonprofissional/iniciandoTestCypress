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
        cy.action('GET', 'reset', token, )
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
        cy.action('GET', 'contas', token, '')
            .as('response');
        cy.get('@response').then(res=>{
            expect(res.status).to.be.equal(200);
            let index = (rand < res.body.length ) ? rand : 0;
            return res.body[index].id;
        }).then(idConta =>{
            cy.action('PUT', `contas/${idConta}`, token, {nome: `Alteradar conta ${idConta}`}).then(res=>{
                expect(res.status).to.be.equal(200);
            })
        });
    });
});