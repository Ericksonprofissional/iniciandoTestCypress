/// <reference types="cypress" />

describe('Work with Alert', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() =>{
        cy.reload();
    })

    it.only('Alert', ()=>{
        cy.clickAlert('#alert', 'Alert Simples');
    })

    it('Alert com Mock', ()=>{
        const stub = cy.stub().as('alerta');

        cy.on('window:alert', stub);
        cy.get('#alert').click().then(()=>{
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
        })
    })

    it('Alert with Confirm', ()=>{
        const stub = cy.stub().as('alerta');

        cy.on('window:confirm', msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Confirm Simples')
        })
        
        cy.on('window:alert',msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Confirmado')
        })
        
        cy.get('#confirm').click()
    })

    it('Deny', ()=>{
        const stub = cy.stub().as('alerta');

        cy.on('window:confirm', msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Confirm Simples')
            return false
        })
        
        cy.on('window:',msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Negado')
        })
        
        cy.get('#confirm').click()
    })

    it('Alert with prompt', ()=>{
       cy.window().then(win =>{
        cy.stub(win, 'prompt').returns(42)

       })

        cy.on('window:confirm', msg =>{
            console.log(msg);
            expect(msg).to.be.equal('Era 42?')
            return false
        })
        
        cy.on('window:alert',msg =>{
            console.log(msg);
            expect(msg).to.be.equal(':(')
        })
        cy.get('#prompt').click();

    })

    it('Validando MSG',() =>{
        const stub = cy.stub().as('alerta');

        cy.on('window:alert',stub);
        cy.get('#formCadastrar').click()
            .then(()=>{
                expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio');
            });
        cy.get("#formNome").type("Wagner");
        cy.get('#formCadastrar').click()
        .then(()=>{
            expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio');
        });
        cy.get('[data-cy=dataSobrenome]').type("Aquino");
        cy.get('#formCadastrar').click()
        .then(()=>{
            expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio');
        });
        cy.get('#formSexoMasc').click();
        cy.get('#formCadastrar').click()
        
        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!');
    });

})