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
}

export default buildEnv;