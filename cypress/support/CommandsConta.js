import loc from './locator';

Cypress.Commands.add('AcessarMenuContas',()=>{
    cy.get(loc.MENU.SETINGS).click();
    cy.get(loc.MENU.CONTAS).click();
})

Cypress.Commands.add('inserirContas', (nome)=>{
    cy.get(loc.CONTAS.NOME).type(`${nome}`);
    cy.get(loc.CONTAS.BTN_SALVAR).click();
});