/**
 * Calculadora FLEX
 * @author Pedro Henrique
 * @version 1.0
 */

function calcular() {

    let etanol = formFlex.inputEtanol.value
    console.log(etanol) //teste

    let gasolina = formFlex.inputGasolina.value
    console.log(gasolina) //teste

    // Lógica Principal: Se o valor do litro do etanol
    // custar até 70% do valor do litro da gasolina,
    // vale mais a pena abastecer com Etanol
    if (etanol < 0,7 * gasolina) {

        console.log("Abateça com Etanol")

        // A linha abaixo identifica o tag e muda a propriedade src
        document.getElementById('status').src = "./img/etanol.png"

    } 
    
    else {

        console.log("Abasteça com Gasolina")

        document.getElementById('status').src = "./img/gasolina.png"

    }

}

function limpar() {

    document.getElementById('status').src = "./img/neutro.png"

}