/// <reference types="cypress"/>

it('Equality', ()=>{
    const a =1;
    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(1).not.to.be.equal('2');
    expect(a).to.be.equal(1)
})

it('Truthy', ()=>{
    const a = true;
    const b = null;
    let c;

    expect(a).true;
    expect(true).to.true;
    expect(b).to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
});

it("Object equality",()=>{
    const obj = {a:1,b:2}

    expect(obj).equal(obj);
    expect(obj).equals(obj)
    expect(obj).eq(obj)
    expect(obj).to.be.eq(obj)
    expect(obj).to.be.deep.equal({a:1, b:2})
    expect(obj).to.be.eql({a:1, b:2});
    expect(obj).include({a:1});
    expect(obj).have.property('b')
    expect(obj).have.property('b',2)
    expect(obj).to.be.not.empty
    expect({}).to.be.empty

})

it("Array",()=>{
    const arr = [1,2,3];

    expect(arr).to.have.members([1,2,3])
    expect(arr).to.include.members([1,3]);
    expect(arr).to.not.be.empty
    expect([]).empty
})

it('Types',()=>{
    const num = 1;
    const str = 'String';

    expect(num).to.be.a('number')
    expect(str).to.be.a('string');
    expect({}).to.be.a('object');
    expect([]).to.be.a('array');

})


it('String', ()=>{
    const str = 'String de teste';
    expect(str).equal('String de teste');
    expect(str).to.be.length(15);
    expect(str).not.to.be.equal(1);
    expect(str).to.be.contains('de');
    expect(str).to.match(/^String/)
    expect(str).to.match(/teste$/)
})

it("number",()=>{
    const number = 4;
    const floatNumber = 5.2145;

    expect(number).equal(4)
    expect(number).above(3) // a cima
    expect(number).below(7) //abaixo
    expect(floatNumber).to.closeTo(5.2, 0.1)


})