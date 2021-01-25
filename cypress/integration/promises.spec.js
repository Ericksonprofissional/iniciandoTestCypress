it('Sem teste', () => {

})

const getSomething = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('responde agora...')
            resolve(12);
        }, 1000);
    })
}


const system = () => {

    console.log('init');

    getSomething()
        .then(some => {
            console.log(`Something ${some}`);
            console.log('end');
    })

}

system();



const getSomething1 = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('responde agora...')
            resolve(12);
        }, 1000);
    })
}


const system1 = async () => {

    console.log('init1');
    const some = await getSomething1();
    console.log(`Something1 ${some}`);
    console.log('end1');


}

system1();