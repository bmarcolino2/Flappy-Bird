const bird = document.getElementById("bird");
const pipeTop = document.querySelector(".pipe-top");
const pipeBottom = document.querySelector(".pipe-bottom");
const scoreDisplay = document.getElementById("score");

let birdY = 200;
let birdVelocity = 0;
let gravity = 0.4; // Gravidade
let pipeX = 320; // Posição inicial do cano
let score = 0;
let gameRunning = true; // Estado do jogo

// Adiciona sons
const jumpSound = new Audio('https://www.soundjay.com/button/beep-07.wav');  // Som de pulo
const hitSound = new Audio('https://www.soundjay.com/button/beep-05.wav');   // Som de colisão

// Função para detectar clique e fazer o pássaro subir
document.addEventListener("click", function() {
    if (gameRunning) {
        birdVelocity = -6;  // Ajuste na força do pulo
        jumpSound.play();   // Toca o som de pulo
    }
});

// Atualização do movimento do jogo
function updateGame() {
    birdVelocity += gravity;
    birdY += birdVelocity;
    pipeX -= 2;  // Movimento dos canos para a esquerda

    // Atualiza a posição do pássaro e dos canos
    bird.style.top = birdY + "px";
    pipeTop.style.right = pipeX + "px";
    pipeBottom.style.right = pipeX + "px";

    // Reposiciona os canos quando eles saem da tela
    if (pipeX < -60) {
        pipeX = 320;
        // Gera alturas aleatórias para os canos
        let randomHeight = Math.floor(Math.random() * 250) + 100;
        pipeTop.style.height = randomHeight + "px";
        pipeBottom.style.height = 640 - randomHeight - 150 + "px"; // Ajusta a altura do cano de baixo
        score++;
        scoreDisplay.textContent = score; // Atualiza a pontuação
    }

    // Detecção de colisão
    const birdRect = bird.getBoundingClientRect();
    const pipeTopRect = pipeTop.getBoundingClientRect();
    const pipeBottomRect = pipeBottom.getBoundingClientRect();

    // Verifica se o pássaro colidiu com os canos ou saiu da tela
    if (birdRect.bottom >= 640 || birdRect.top <= 0 ||
        (birdRect.right >= pipeTopRect.left && birdRect.left <= pipeTopRect.right && birdRect.top <= pipeTopRect.bottom) ||
        (birdRect.right >= pipeBottomRect.left && birdRect.left <= pipeBottomRect.right && birdRect.bottom >= pipeBottomRect.top)) {
        endGame();
    }

    // Continua a atualização do jogo enquanto ele estiver rodando
    if (gameRunning) {
        requestAnimationFrame(updateGame);
    }
}

// Função para encerrar o jogo
function endGame() {
    gameRunning = false;  // Para o loop do jogo
    hitSound.play();      // Toca o som de colisão
    setTimeout(() => {
        alert("Fim de jogo! Sua pontuação foi: " + score);
    }, 500);  // Mostra o alerta após 0,5 segundos para dar tempo de tocar o som
}

// Inicia o jogo
updateGame();
