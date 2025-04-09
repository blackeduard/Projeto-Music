// Galeria
const wrapper = document.getElementById('img-wrapper');
const prevBtn2 = document.getElementById('prev2');
const nextBtn2 = document.getElementById('next2');
// Layout música
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev1');
const nextBtn = document.getElementById('next1');
const albumImg = document.querySelector('.album');
const artistText = document.querySelector('.artist b');

const totalImagens = wrapper.children.length;
let indiceAtual = 0;

function atualizarSlide() {
    const deslocamento = -indiceAtual * 325; // 300px é a largura de cada imagem
    wrapper.style.transform = `translateX(${deslocamento}px)`;
}

nextBtn2.addEventListener('click', () => {
    indiceAtual = (indiceAtual + 1) % totalImagens;
    atualizarSlide();
});

prevBtn2.addEventListener('click', () => {
    indiceAtual = (indiceAtual - 1 + totalImagens) % totalImagens;
    atualizarSlide();
});

// Lista de músicas
const musicas = [
  {
    titulo: "You Are The Reason",
    src: "musics/You Are The Reason.mp3",
    capa: "img/album1.jpeg"
  },
  {
    titulo: "The Perfect Fan",
    src: "musics/The perfect fan.mp3",
    capa: "img/album2.jpeg"
  },
  {
    titulo: "Barking at the Moon",
    src: "musics/Barking at the Moon.mp3",
    capa: "img/album3.jpeg"
  }
];

let indexAtual = 0;
let isPlaying = false;

// Função para carregar música
function carregarMusica(index) {
  const musica = musicas[index];
  audio.src = musica.src;
  albumImg.src = musica.capa;
  artistText.textContent = musica.titulo;
}

// Tocar música
function tocarMusica() {
  audio.play().then(() => {
    isPlaying = true;
    playBtn.innerHTML = `<i class='bx bx-pause-circle btn-musica'></i>`;
    albumImg.classList.remove('paused');
    albumImg.classList.add('spin');
  }).catch((e) => {
    console.log("Erro ao tentar tocar a música:", e);
  });
}

// Botão Play / Pause
playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playBtn.innerHTML = `<i class='bx bx-play-circle btn-musica'></i>`;
    albumImg.classList.add('paused');
  } else {
    tocarMusica();
  }
  isPlaying = !isPlaying;
});

// Próxima música
nextBtn.addEventListener('click', () => {
  indexAtual = (indexAtual + 1) % musicas.length;
  carregarMusica(indexAtual);
  audio.addEventListener('canplaythrough', tocarMusica, { once: true });
});

// Música anterior
prevBtn.addEventListener('click', () => {
  indexAtual = (indexAtual - 1 + musicas.length) % musicas.length;
  carregarMusica(indexAtual);
  audio.addEventListener('canplaythrough', tocarMusica, { once: true });
});

// Quando a música acabar, vai para a próxima
audio.addEventListener('ended', () => {
  indexAtual = (indexAtual + 1) % musicas.length;
  carregarMusica(indexAtual);
  audio.addEventListener('canplaythrough', tocarMusica, { once: true });
});

// Carregar a primeira música e já tocar
window.addEventListener('DOMContentLoaded', () => {
  carregarMusica(indexAtual);
  // só toca se o usuário já tiver interagido antes (por causa das políticas do navegador)
  setTimeout(() => {
    tocarMusica();
  }, 200);
});