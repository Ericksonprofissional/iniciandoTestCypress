/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20 }
        expect(obj).to.have.property('nome');
        cy.wrap(obj).should('have.property', 'nome');
        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Funciona via cypress')
        })

        const promise = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                resolve(10)
            },500);
        })
            cy.get('#buttonSimple').then(()=> console.log('Encontrei primeiro bottão'))

            cy.wrap(promise).then(num => console.log(num));

            cy.get('#buttonList').then(()=> console.log('Encontrei segundo bottão'))
    })

    it.only('Its..',()=>{
        const obj = { nome: 'User', idade: 20 }
        cy.wrap(obj).should('have.property', 'nome','User');
        cy.wrap(obj).its('nome').should('be.equal','User');
        const obj2 = { nome: 'User', idade: 20, endereco: {rua: 'dos bobos'}}
        cy.wrap(obj2)
            .its('endereco') // ou .its('endereco.rua').shoud...
            .its('rua')
            .should('contain','bobo');
    })

    it.only('invoke',()=>{
        const getValue = () => 1;
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue}).invoke('fn').should('equal', 1);
        cy.wrap({ fn: soma}).invoke('fn', 2 , 7).should('equal', 9);

        cy.visit('http://wcaquino.me/cypress/componentes.html');
        cy.get('#formNome').invoke('val', 'Texto via invoke');

        cy.window().invoke('alert', "texto Alerta");
        cy.get('#resultado')
            .invoke('html', '<input type="button" value="hacked!">');
    })
})