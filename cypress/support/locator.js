const uid = Cypress._.random(1, 1e3);

const locators = {
    CONTAS: {
        NOME: '[data-test=nome]',
        BTN_SALVAR: '.btn',
        FN_XP_BTN_ALETERAR: nome => `//table//td[contains(., '${nome}')]/..//i[@class='far fa-edit']`
    },
    EXTRATO:{
        REGISTROS: '',
        FN_XP_BUSCA_ELEMENTO: (desc, value) => `//span[contains(., '${desc}')]/following-sibling::small[contains(., '${value}')]`,    
        FN_XP_EXCLUIR_ELEMENTO: conta => `//span[contains(., '${conta}')]/../../..//i[@class="far fa-trash-alt"]`,    
    },
    LOGIN:{
        USER: '[data-test=email]',
        SENHA:'[data-test=passwd]',
        BTN_LOGIN: '.btn'
    },
    MESSAGE: '.toast-message',
    MENU: {
        HOME: '[data-test=menu-home]',
        SETINGS: '[data-test=menu-settings]',
        CONTAS: '[href="/contas"]',
        RESET: '[href="/reset"]',
        LOGOUT: '[href="/logout"]',
        MOVIMENTACAO: '[data-test=menu-movimentacao]'
    },
    MOVIMENTACAO: {
        DESCRICAO: '[data-test=descricao]',
        VALOR: '[data-test=valor]',
        INTERESSADO: '[data-test=envolvido]',
        STATUS: '[data-test=status]',
        CONTA: '[data-test=conta]',
        BTN_SALVAR: '.btn-primary'
    },
    RANDOM: uid,
    SALDO:{
        FN_XP_SALDO_CONTA: nome => `//td[contains(., '${nome}')]/../td[2]`,
    }
}

export default locators;