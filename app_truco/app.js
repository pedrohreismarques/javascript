/**
 * 
 *  ---- TRUCO PAULISTA ----
 * 
 * @author Pedro Henrique
 * @version 1.0
 * 
 */

// FUNÇÃO PARA CALCULAR MANILHA
function calcularManilha(face) {
    const ordem = ["4", "5", "6", "Q", "J", "K", "A", "2", "3"];
    const index = ordem.indexOf(face);
    
    if (index === ordem.length - 1) {
        return ordem[0];
    } else {
        return ordem[index + 1];
    }
}

function sortear() {
    let nipes = ["♥", "♦", "♣", "♠"];
    let faces = ["A", "2", "3", "4", "5", "6", "J", "Q", "K"];

    let nipe = nipes[Math.floor(Math.random() * 4)];
    let face = faces[Math.floor(Math.random() * 9)];

    // DEFINIR COR DO NAIPE
    let corClasse;

    if (nipe === "♥" || nipe === "♦") {
        corClasse = "vermelho";
    } else {
        corClasse = "preto";
    }

    // CANTO SUPERIOR ESQUERDO
    document.getElementById("supESQ").innerHTML = `
        <div class="${corClasse}">${face}</div>
        <div class="${corClasse}">${nipe}</div>
    `;

    // CANTO INFERIOR DIREITO
    document.getElementById("infDIR").innerHTML = `
        <div class="${corClasse}">${face}</div>
        <div class="${corClasse}">${nipe}</div>
    `;

    // CENTRO
    if (face === "J") {
        document.getElementById('centroCarta').innerHTML = `<img src="img/valete.png" class="figura">`;
    } else if (face === "Q") {
        document.getElementById('centroCarta').innerHTML = `<img src="img/dama.png" class="figura">`;
    } else if (face === "K") {
        document.getElementById('centroCarta').innerHTML = `<img src="img/rei.png" class="figura">`;
    } else {
        document.getElementById("centroCarta").innerHTML = `<div class="${corClasse}" style="font-size:6rem">${nipe}</div>`;
    }

    // CALCULAR E MOSTRAR MANILHA
    let manilhaFace = calcularManilha(face);
    
    // Q, J, K EM PORTUGUÊS
    let manilhaTexto = manilhaFace;
    if (manilhaFace === "Q") manilhaTexto = "Dama";
    if (manilhaFace === "J") manilhaTexto = "Valete";
    if (manilhaFace === "K") manilhaTexto = "Rei";
    
    // REVELAÇÃO DA MANILHA
    document.querySelector(".manilha p").innerHTML = 
        `Manilha: <strong>${manilhaTexto}</strong> de ${nipe}`;
}

// FUNÇÃO REINICIAR (atualizada para resetar a manilha também)
function restart() {
    // Limpa os cantos
    document.getElementById("supESQ").innerHTML = "";
    document.getElementById("infDIR").innerHTML = "";
    
    // Limpa o centro
    document.getElementById("centroCarta").innerHTML = "";
    
    // Volta o texto original da manilha
    document.querySelector(".manilha p").innerHTML = "A manilha aparecerá aqui!";
}