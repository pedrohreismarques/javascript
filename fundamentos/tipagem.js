/**
 * 
 * TUTORIAL DE JavaScript
 * 
 * Estudo da tipagem dinâmica
 * 
 * @author Pedro Henrique
 * 
 */

console.log("---- STRINGS ----")

let nome = "Pedro"
console.log(typeof (nome))
console.log(nome)

console.log(nome.replace("Pedro", "Pedrinho"))

// Concatenação (União)
console.log("Aluno(a): " + nome) //NÃO seguro

console.log(`Aluno(a): ${nome}`) //seguro


console.log("---- NÚMEROS ----")

let peso = 60
let altura = 1.78
console.log(typeof (peso))
console.log(typeof (altura))

console.log(Number.isInteger(peso))
console.log(Number.isInteger(altura))

// Exemplo: Cálculo de IMC
let imc
imc = peso / (altura * altura)
console.log(`IMC: ${imc.toFixed(2)}`)

//ATENÇÃO
console.log(10 / 0)
console.log("3" + 2)
console.log("3" - 2)
console.log("3x" - 2)
console.log("3" * 2)
console.log("10" / 2)
console.log(0.5 + 0.5)
console.log(0.1 + 0.2)
console.log(0.1 + 0.7)


console.log("---- BOOLEANOS ----")

let led = false
typeof (led)

console.log("Comparadores Especiais")

let x = 2
let y = "2"
console.log(typeof (x))
console.log(typeof (y))
console.log(x == y)
console.log(x === y)

console.log("Problemas no uso do var")

console.log("var permite redeclarar uma variável!!!")
var media = 9
console.log(typeof (media))
console.log(media)

var media = 8
console.log(typeof (media))
console.log(media)

// Uso de chaves na linguagem JS
let mediaFinal = 3

console.log(`Média: ${mediaFinal}`)

if (mediaFinal < 5) {

    console.log("REPROVADO")

}

else { 

    console.log("APROVADO")
    console.log("Emitir certificado")

}

for (let i = 1; i <= 10; i++)
    console.log(i)
console.log("Não processado na estrutura for")