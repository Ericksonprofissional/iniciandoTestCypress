const buildEnv = () => {
    cy.server();
    cy.rotas(
        'POST',
        'signin',
       {
           id: 1000,
           nome: 'Usuario falso',                
           token: 'Uma string muito grande que não deveria ser aceito mas no teste vai'
        },
        'login'
    );
    cy.route({
        method: 'GET',
        url: 'saldo',
        response: [{
            conta_id: 1000,
            conta: 'Carteira',
            saldo: '10050.00'
        },
        {
            conta_id: 1001,
            conta: 'Poupança',
            saldo:  '1500.12'
        }
    ]
    }).as('saldo');

    cy.rotas(
        'GET',
        'contas',
        [
            {id: '1', nome: 'Carteira', visivel: true, usuario_id: 1},
            {id: 2, nome:'Poupança', visivel: true, usuario_id: 1}
        ],
        'showAccount'
        );

    cy.rotas(
        'GET',
        'extrato/**',
        [{"conta":"Conta para movimentacoes","id":363941,"descricao":"Movimentacao para exclusao","envolvido":"AAA","observacao":null,"tipo":"DESP","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":397991,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta com movimentacao","id":363942,"descricao":"Movimentacao de conta","envolvido":"BBB","observacao":null,"tipo":"DESP","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"-1500.00","status":true,"conta_id":397992,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":363943,"descricao":"Movimentacao 1, calculo saldo","envolvido":"CCC","observacao":null,"tipo":"REC","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"3500.00","status":false,"conta_id":397993,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":363944,"descricao":"Movimentacao 2, calculo saldo","envolvido":"DDD","observacao":null,"tipo":"DESP","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"-1000.00","status":true,"conta_id":397993,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para saldo","id":363945,"descricao":"Movimentacao 3, calculo saldo","envolvido":"EEE","observacao":null,"tipo":"REC","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"1534.00","status":true,"conta_id":397993,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null},
        {"conta":"Conta para extrato","id":363946,"descricao":"Movimentacao para extrato","envolvido":"FFF","observacao":null,"tipo":"DESP","data_transacao":"2021-02-01T03:00:00.000Z","data_pagamento":"2021-02-01T03:00:00.000Z","valor":"-220.00","status":true,"conta_id":397994,"usuario_id":13113,"transferencia_id":null,"parcelamento_id":null}]
    );
}

export default buildEnv;