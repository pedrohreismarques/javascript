/**
 * 
 * ESTUDO DAS FUNÇÕES
 * 
 * @author Pedro Henrique
 * 
 */

function hello() {

    // ---- Função Simples ----
    console.log("Hello function")

}

console.log(typeof (hello))
hello()

// ---- Função Anônima ----
//
// Podemos usar "let" ou "const" para criar uma função anônima.
//
// A vantagem de criar uma função dessa forma é armazenar o resultado
// da execução.

const hello2 = function () {

    console.log("Hello função anônima")

}

console.log(typeof (hello2))
hello2()

    // Simplificação da Função Anônima (arrow function)
    //
    // function ()    simplificado para:     ()=>

const hello3 = () => {

    console.log("Hello função anônima simplificada")

}

console.log(typeof (hello3))
hello3()

    // Simplificação 2 da função anônima
    //
    // Neste caso só uma linha de código é processada.
    // 
    // Simplificação: _ no lugar de () e omissão de chaves

const hello4 = _=> console.log("Hello função anônima simplificada 2")

console.log(typeof (hello4))
hello4()

// ---- Função com parâmetros e retorno ----
function somar(num1, num2) {

    return console.log(num1 + num2) 

}

console.log(typeof (somar))
somar(2, 2)

// ---- Função Anônima com Parâmetros e Retorno Simplificada ----
const somarA = (num1, num2) => {

    return console.log(num1 + num2)

} 

console.log(typeof (somarA))
somarA(3, 4)

// ---- Função Anônima com Parâmetros e Retorno Simplificada 2 ----
//
// Nesse caso omitimos chaves e o retorno é implícito.
//
// CUIDADO!!! NÃO é uma função simples. A dica é os parâmetros.

const somarAS = (num1, num2) => console.log(num1 + num2)

console.log(typeof (somarAS))
somarAS(5, 10)