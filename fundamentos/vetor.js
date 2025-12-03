/**
 * 
 * VETOR (array)
 * 
 * @author Pedro Henrique
 * 
 */

//                [0]      [1]       [2]        [3]       [4]      [5] 
let alunosEM1 = ["Luiz", "Pedro", "Eliezer", "Melrinn", "Milly", "Spike"]

console.log(typeof(alunosEM1))

// Lendo o valor de um array
console.log(alunosEM1)

console.table(alunosEM1)

console.log(alunosEM1.length) // Exibe o tamanho do vetor

console.log(alunosEM1[3])

// Adicionando dados no array
alunosEM1.push("Tiago") // O push adiciona sempre no fim da lista

console.table(alunosEM1)

// Modificando os dados de um vetor
alunosEM1[1] = "Pedro Henrique"

console.table(alunosEM1)

// Excluindo os dados de um vetor
delete alunosEM1[3] // O comando delete exclui os dados sem alterar os índices

console.table(alunosEM1)

// Percorrendo um vetor
let notas = [2, 5, 8, 7, 9, 4, 10]

console.log(notas.length)

for (let i = 0; i < notas.length; i++) {

    console.log(notas[i])

} // Usamos um laço for para percorrer o índice e extrair os dados

// Simplificação do laço for para percorrer um array
// for each
notas.forEach((notas) => {

    console.log(notas)

})

//in
for (let i in notas) {

    console.log(notas[i])

}