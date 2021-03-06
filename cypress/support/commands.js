// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locator';

const rand = Cypress._.random(1, 1e1);
   

Cypress.Commands.add('clickAlert', (locator, message) => {
    cy.get(locator).click();
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    });
});

Cypress.Commands.add('barrigaLogin', (login, senha) => {
    cy.visit('http://barrigareact.wcaquino.me/');
    cy.get(loc.LOGIN.USER).type(login);
    cy.get(loc.LOGIN.SENHA).type(senha);
    cy.get(loc.LOGIN.BTN_LOGIN).click();
    cy.alert(loc.MESSAGE, 'Bem vindo, ');
});

Cypress.Commands.add('alert', (locator, message) => {
    cy.get(locator).should('contain',message);
})

Cypress.Commands.add('contasReset', () => {
    cy.get(loc.MENU.SETINGS).click();
    cy.get(loc.MENU.RESET).click();
    cy.alert(loc.MESSAGE, 'Dados resetados com sucesso')
})

Cypress.Commands.add('logoutSytem', () => {
    cy.wait(5000);
    cy.get(loc.MENU.SETINGS).click();
    cy.get(loc.MENU.LOGOUT).click();
    cy.alert(loc.MESSAGE, 'Até Logo!');
});

Cypress.Commands.add('action', (metodo, rota, corpy, query, faosc) => {
    cy.request({
        method: `${metodo}`,
        url: `https://barrigarest.wcaquino.me/${rota}`,
        body: corpy,
        qs: query,
        failOnStatusCode: faosc
    });
});

Cypress.Commands.add('getConta', () => {
    cy.action('GET', 'contas')
        .as('response');
    cy.get('@response').then(res=>{
        expect(res.status).to.be.equal(200);
        let index = (rand < res.body.length ) ? rand : 0;
        return res.body[index].id;
    });
});

Cypress.Commands.add('getToken', (email, senha) => {
    cy.action(
        'POST',
        'signin',
        '',
        {email: email, redirecionar: false, senha: senha}
    
    ).its('body.token').should('not.be.empty')
        .then(token => {
            Cypress.env('token', token);
            return token;
        });
});

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
    if(options.length === 1){
        if(Cypress.env('token')){
             options[0].headers = {
                    Authorization: `JWT ${Cypress.env('token')}`
                }            
        }
    }
    return originalFn(...options);
});

Cypress.Commands.add('rotas',(metodo, rota, resp, title, code)=>{
    cy.route({
        method: metodo,
        url: rota,
        response: resp,
        status: code
    }).as(`${title}`);
});