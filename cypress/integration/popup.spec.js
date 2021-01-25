/// <reference types="cypress" />

describe('Work with PopUp', () => {
    before(() => {
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    })
    beforeEach(() =>{
        cy.reload();
    })

    it('Deve testar PopUp diretamente',()=>{
        cy.window().then(win=>{
            cy.stub(win, 'open').as('winOpen');
        });
        cy.get('#buttonPopUp').click();
        cy.get('@winOpen').should('be.called');
    })

    it('Deve testar frame diretamente',()=>{
        cy.visit('http://wcaquino.me/cypress/frame.html');
        cy.get('#tfield')
            .type('Funciona!')
        cy.get('#otherButton')
            .click();
        cy.on('window:alert', msg => {
            console.log(msg);
            expect(msg).to.be.equal('Click OK!')
        })
    })
});

describe.only('With Links',()=>{
    beforeEach(()=>{
        cy.visit('http://wcaquino.me/cypress/componentes.html');
    });

    it('Check link', ()=>{
        cy.contains('Popup2')
            .should('have.prop', 'href')
            .and('equal', 'http://wcaquino.me/cypress/frame.html')
    });

    it('Should access popup dinamically', () => {
        cy.contains('Popup2')
            .then( $a =>{
                const href = $a.prop('href');
                cy.visit(href);
                cy.get('#tfield').type('Erickson');
            });
    });

    it('Should force link on same page', () => {
        cy.contains('Popup2')
            .invoke('removeAttr', 'target')
            .click();
    })
})