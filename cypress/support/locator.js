const uid = Cypress._.random('A', 1e2);

const locators = {

    LOGIN:{
        USER: '[data-test=email]',
        SENHA:'[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MESSAGE: '.toast-message',
    RANDOM: uid,
    MENU: {
        SETINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        LOGOUT: '[href="/logout"]'
    },
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        XP: `//table//td[contains(., 'Aline${uid}')]/..//i[@class='far fa-edit']`
    },

}

export default locators;