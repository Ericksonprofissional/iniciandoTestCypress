/// <reference types="cypress"/>


it.only('A external test...', () => {
    //only deixa o teste ativo
})

describe('Should group test...', ()=>{


    describe("Should group more specific test 2...",()=>{
        it.skip('A external test...', () => {
            //skip deixa o teste inativo
        })
    })
    it('A external test...', () => {

    })
})