/**
 * 
 * JOGO DO DADO
 * 
 * @author Pedro Henrique
 * @version 1.0
 * 
 */

function jogar() {

    // A linha abaixo gera números aleatórios
    // 
    // Math (funções matemáticas)
    // .floor (converte para números inteiros)
    // .random() * 6 (0 1 2 3 4 5 6)

    let sorteio = Math.floor(Math.random() * 6)

    console.log(sorteio)

    // Uso da estrutura switch case
    switch (sorteio) {

        case 0:
            
            document.getElementById("face").src = "./img/face1.png"
            break

        case 1:
            
            document.getElementById("face").src = "./img/face2.png"
            break

        case 2:
            
            document.getElementById("face").src = "./img/face3.png"
            break

        case 3:
            
            document.getElementById("face").src = "./img/face4.png"
            break

        case 4:
            
            document.getElementById("face").src = "./img/face5.png"
            break

        case 5:
            
            document.getElementById("face").src = "./img/face6.png"
            break

    }

}