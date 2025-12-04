/**
 *  Simples Carrossel de Imagens
 * 
 *  @author Pedro Henrique
 * 
 */

let slidesCarrossel = ["slide1.jpg", "slide2.jpg", "slide3.jpg"]
let intervalo = 3000 //300ms = 3s (efeito)
let indice = 0 // apoio a logica

show() // executa uma vez

function show() {

    // uso do JS para adicionar a classe fadeout no CSS
    document.getElementById('slides').className += 'fadeout'

    // função interna de intervalos
    setTimeout(() => {

        // troca a imagem do slide
        document.getElementById('slides').src = (`./img/${slidesCarrossel[indice]}`)
        // remover a classe .fadeout
        document.getElementById('slides').className = ''

    }, 1000) // executa a cada 1s (em tempo real)
    indice++

    //validação para retornar para o início
    if (indice === slidesCarrossel.length) {
        indice = 0
    }


    setTimeout(show, intervalo)

}