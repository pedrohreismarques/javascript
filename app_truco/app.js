/**
 *   ---- TRUCO PAULISTA ----
 * 
 * @author Pedro Henrique
 * @version 1.0
 * 
 */

// Variáveis globais do jogo
let deck = [];
let playerHand = [];
let computerHand = [];
let playerScore = 0;
let computerScore = 0;
let roundNumber = 1;
let turnNumber = 1;
let playerCardPlayed = null;
let computerCardPlayed = null;
let roundWinner = null;
let gameActive = false;
let trucoCalled = false;
let trucoValue = 1;

// Elementos do DOM
const playerCardsElement = document.getElementById('player-cards');
const computerCardsElement = document.getElementById('computer-cards');
const tableCardsElement = document.getElementById('table-cards');
const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const roundNumberElement = document.getElementById('round-number');
const turnNumberElement = document.getElementById('turn-number');
const gameStatusElement = document.getElementById('game-status');
const gameLogElement = document.getElementById('game-log');
const newGameBtn = document.getElementById('new-game-btn');
const trucoBtn = document.getElementById('truco-btn');
const nextRoundBtn = document.getElementById('next-round-btn');
const rulesBtn = document.getElementById('rules-btn');
const rulesModal = document.getElementById('rules-modal');
const closeModal = document.querySelector('.close');

// Valores das cartas no Truco (do mais forte para o mais fraco)
const cardValues = {
    '4': 1, '5': 2, '6': 3, '7': 4,
    'Q': 5, 'J': 6, 'K': 7, 'A': 8,
    '2': 9, '3': 10
};

// Naipes das cartas
const suits = ['♠', '♥', '♦', '♣'];
const suitNames = {
    '♠': 'Espadas',
    '♥': 'Copas',
    '♦': 'Ouros',
    '♣': 'Paus'
};

// Inicialização do jogo
function initGame() {
    // Inicializar variáveis
    deck = createDeck();
    playerHand = [];
    computerHand = [];
    playerScore = 0;
    computerScore = 0;
    roundNumber = 1;
    turnNumber = 1;
    playerCardPlayed = null;
    computerCardPlayed = null;
    roundWinner = null;
    gameActive = true;
    trucoCalled = false;
    trucoValue = 1;
    
    // Atualizar interface
    updateScores();
    updateRoundInfo();
    clearTable();
    clearGameLog();
    
    // Embaralhar e distribuir cartas
    shuffleDeck(deck);
    dealCards();
    
    // Atualizar interface das cartas
    displayPlayerCards();
    displayComputerCards();
    
    // Atualizar status
    updateGameStatus('Novo jogo iniciado! Escolha uma carta para jogar.');
    addToGameLog('Novo jogo iniciado!');
    
    // Configurar botões
    trucoBtn.disabled = false;
    nextRoundBtn.disabled = true;
}

// Criar baralho
function createDeck() {
    const deck = [];
    const cardRanks = ['4', '5', '6', '7', 'Q', 'J', 'K', 'A', '2', '3'];
    
    for (const suit of suits) {
        for (const rank of cardRanks) {
            deck.push({
                rank: rank,
                suit: suit,
                value: cardValues[rank],
                name: `${rank} de ${suitNames[suit]}`
            });
        }
    }
    
    return deck;
}

// Embaralhar baralho (usando Fisher-Yates)
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Distribuir cartas
function dealCards() {
    playerHand = [];
    computerHand = [];
    
    // Distribuir 3 cartas para cada jogador
    for (let i = 0; i < 3; i++) {
        playerHand.push(deck.pop());
        computerHand.push(deck.pop());
    }
    
    // Ordenar cartas por valor (do mais forte para o mais fraco)
    playerHand.sort((a, b) => b.value - a.value);
    computerHand.sort((a, b) => b.value - a.value);
}

// Exibir cartas do jogador
function displayPlayerCards() {
    playerCardsElement.innerHTML = '';
    
    playerHand.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.index = index;
        
        // Cor do naipe (vermelho para copas e ouros)
        const suitColor = (card.suit === '♥' || card.suit === '♦') ? 'red' : 'black';
        
        cardElement.innerHTML = `
            <div class="card-value" style="color: ${suitColor}">${card.rank}</div>
            <div class="card-suit" style="color: ${suitColor}">${card.suit}</div>
            <div class="card-value" style="color: ${suitColor}; transform: rotate(180deg)">${card.rank}</div>
        `;
        
        cardElement.addEventListener('click', () => playCard(index));
        playerCardsElement.appendChild(cardElement);
    });
}

// Exibir cartas do computador (viradas)
function displayComputerCards() {
    computerCardsElement.innerHTML = '';
    
    for (let i = 0; i < computerHand.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.className = 'card card-back';
        computerCardsElement.appendChild(cardElement);
    }
}

// Jogar uma carta
function playCard(cardIndex) {
    if (!gameActive) return;
    if (playerCardPlayed !== null) return;
    
    // Jogador joga carta
    playerCardPlayed = playerHand[cardIndex];
    playerHand.splice(cardIndex, 1);
    
    // Computador joga carta (escolhe aleatoriamente)
    const computerCardIndex = Math.floor(Math.random() * computerHand.length);
    computerCardPlayed = computerHand[computerCardIndex];
    computerHand.splice(computerCardIndex, 1);
    
    // Exibir cartas na mesa
    displayCardsOnTable();
    
    // Determinar vencedor da rodada
    determineRoundWinner();
    
    // Atualizar interface
    displayPlayerCards();
    displayComputerCards();
    
    // Atualizar status
    updateGameStatus(`${roundWinner === 'player' ? 'Você' : 'Computador'} venceu a rodada ${turnNumber}!`);
    addToGameLog(`Rodada ${turnNumber}: Jogador jogou ${playerCardPlayed.name}, Computador jogou ${computerCardPlayed.name}. ${roundWinner === 'player' ? 'Jogador' : 'Computador'} venceu!`);
    
    // Atualizar pontuação
    if (roundWinner === 'player') {
        playerScore += trucoValue;
    } else if (roundWinner === 'computer') {
        computerScore += trucoValue;
    }
    
    updateScores();
    
    // Verificar se alguém ganhou o jogo
    checkGameWinner();
    
    // Habilitar botão para próxima rodada
    nextRoundBtn.disabled = false;
    trucoBtn.disabled = true;
}

// Exibir cartas na mesa
function displayCardsOnTable() {
    tableCardsElement.innerHTML = '';
    
    // Carta do jogador
    const playerCardElement = document.createElement('div');
    playerCardElement.className = 'card played-card';
    
    const playerSuitColor = (playerCardPlayed.suit === '♥' || playerCardPlayed.suit === '♦') ? 'red' : 'black';
    
    playerCardElement.innerHTML = `
        <div class="card-value" style="color: ${playerSuitColor}">${playerCardPlayed.rank}</div>
        <div class="card-suit" style="color: ${playerSuitColor}">${playerCardPlayed.suit}</div>
        <div class="card-value" style="color: ${playerSuitColor}; transform: rotate(180deg)">${playerCardPlayed.rank}</div>
    `;
    
    tableCardsElement.appendChild(playerCardElement);
    
    // Espaço entre as cartas
    const vsElement = document.createElement('div');
    vsElement.className = 'vs';
    vsElement.textContent = 'VS';
    tableCardsElement.appendChild(vsElement);
    
    // Carta do computador
    const computerCardElement = document.createElement('div');
    computerCardElement.className = 'card played-card';
    
    const computerSuitColor = (computerCardPlayed.suit === '♥' || computerCardPlayed.suit === '♦') ? 'red' : 'black';
    
    computerCardElement.innerHTML = `
        <div class="card-value" style="color: ${computerSuitColor}">${computerCardPlayed.rank}</div>
        <div class="card-suit" style="color: ${computerSuitColor}">${computerCardPlayed.suit}</div>
        <div class="card-value" style="color: ${computerSuitColor}; transform: rotate(180deg)">${computerCardPlayed.rank}</div>
    `;
    
    tableCardsElement.appendChild(computerCardElement);
}

// Determinar vencedor da rodada
function determineRoundWinner() {
    if (playerCardPlayed.value > computerCardPlayed.value) {
        roundWinner = 'player';
    } else if (playerCardPlayed.value < computerCardPlayed.value) {
        roundWinner = 'computer';
    } else {
        // Empate - quem jogou primeiro vence (no caso, sempre o jogador)
        roundWinner = 'player';
    }
}

// Verificar se alguém ganhou o jogo
function checkGameWinner() {
    if (playerScore >= 12) {
        gameActive = false;
        updateGameStatus('Parabéns! Você venceu o jogo!');
        addToGameLog('Jogador venceu o jogo!');
        nextRoundBtn.disabled = true;
        trucoBtn.disabled = true;
    } else if (computerScore >= 12) {
        gameActive = false;
        updateGameStatus('O computador venceu o jogo! Tente novamente.');
        addToGameLog('Computador venceu o jogo!');
        nextRoundBtn.disabled = true;
        trucoBtn.disabled = true;
    }
}

// Próxima rodada
function nextRound() {
    // Limpar cartas da mesa
    playerCardPlayed = null;
    computerCardPlayed = null;
    roundWinner = null;
    
    // Incrementar turno
    turnNumber++;
    
    // Se for o 4º turno, iniciar nova rodada
    if (turnNumber > 3) {
        turnNumber = 1;
        roundNumber++;
        
        // Se houver cartas suficientes, distribuir novas cartas
        if (deck.length >= 6) {
            dealCards();
            displayPlayerCards();
            displayComputerCards();
            addToGameLog(`Nova rodada ${roundNumber} iniciada.`);
        } else {
            // Fim do jogo - não há cartas suficientes
            gameActive = false;
            updateGameStatus('Fim do jogo! Baralho acabou.');
            addToGameLog('Fim do jogo - baralho acabou.');
            nextRoundBtn.disabled = true;
            trucoBtn.disabled = true;
            return;
        }
    }
    
    // Resetar valor do truco
    trucoCalled = false;
    trucoValue = 1;
    
    // Atualizar interface
    clearTable();
    updateRoundInfo();
    updateGameStatus('Escolha uma carta para jogar!');
    
    // Habilitar/desabilitar botões
    nextRoundBtn.disabled = true;
    trucoBtn.disabled = false;
}

// Pedir truco
function callTruco() {
    if (!gameActive || trucoCalled) return;
    
    trucoCalled = true;
    trucoValue = 3;
    
    updateGameStatus('Truco chamado! Valor da rodada: 3 pontos.');
    addToGameLog('Jogador pediu Truco! Valor da rodada: 3 pontos.');
    
    trucoBtn.disabled = true;
}

// Limpar mesa
function clearTable() {
    tableCardsElement.innerHTML = '<p>Cartas jogadas aparecerão aqui</p>';
}

// Atualizar placar
function updateScores() {
    playerScoreElement.textContent = playerScore;
    computerScoreElement.textContent = computerScore;
}

// Atualizar informações da rodada/turno
function updateRoundInfo() {
    roundNumberElement.textContent = roundNumber;
    turnNumberElement.textContent = turnNumber;
}

// Atualizar status do jogo
function updateGameStatus(message) {
    gameStatusElement.innerHTML = `<p>${message}</p>`;
}

// Adicionar entrada ao histórico
function addToGameLog(message) {
    const logEntry = document.createElement('div');
    logEntry.className = 'log-entry';
    logEntry.textContent = message;
    gameLogElement.prepend(logEntry);
}

// Limpar histórico
function clearGameLog() {
    gameLogElement.innerHTML = '';
}

// Mostrar/ocultar modal de regras
function toggleRulesModal() {
    if (rulesModal.style.display === 'block') {
        rulesModal.style.display = 'none';
    } else {
        rulesModal.style.display = 'block';
    }
}

// Event Listeners
newGameBtn.addEventListener('click', initGame);
trucoBtn.addEventListener('click', callTruco);
nextRoundBtn.addEventListener('click', nextRound);
rulesBtn.addEventListener('click', toggleRulesModal);
closeModal.addEventListener('click', toggleRulesModal);

// Fechar modal clicando fora dele
window.addEventListener('click', (event) => {
    if (event.target === rulesModal) {
        rulesModal.style.display = 'none';
    }
});

// Inicializar jogo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    initGame();
});