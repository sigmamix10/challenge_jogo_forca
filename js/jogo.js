var palavras = [
  'PROGRAMACAO',  
  'CARRO',  
  'ALURA',
  'JAVASCRIPT',
  'TECLADO',
]

let resposta = '';
let tentativas = 6;
let erros = 0;
let letraCorreta = [];
let verificaPalavra = null;

function sorteiaPalavra() {
  resposta = palavras[Math.floor(Math.random() * palavras.length)];
}

function criarBotoes() {
  let botoes = 'ABCDEFGHIJKLMNOPQRSTUVXWZ'.split('').map(letra =>
    `
      <button
        class="btn btn-lg btn-dark m-1"
        id='` + letra + `'
        onClick="letraEscolhida('` + letra + `')"
      >
        ` + letra + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = botoes;
}

function letraEscolhida(escolheLetra) {
  letraCorreta.indexOf(escolheLetra) === -1 ? letraCorreta.push(escolheLetra) : null;
  document.getElementById(escolheLetra).setAttribute('disabled', true);

  if (resposta.indexOf(escolheLetra) >= 0) {
    palavraCorreta();
    verificaVitoria();
  } else if (resposta.indexOf(escolheLetra) === -1) {
    erros++;
    atualizaErros();
    verificaDerrota();
    atualizaImage();
  }
}

function atualizaImage() {
  document.getElementById('jogoImage').src = './images/' + erros + '.png';
}

function verificaVitoria() {
  if (verificaPalavra === resposta) {
    document.getElementById('keyboard').innerHTML = 'Parabéns! Você Venceu!!!';
  }
}

function verificaDerrota() {
  if (erros === tentativas) {
    document.getElementById('palavraVerificada').innerHTML = 'A Palavra Correta é:  ' + resposta;
    document.getElementById('keyboard').innerHTML = 'Você Perdeu! Tente Novamente!';
  }
}

function palavraCorreta() {
  verificaPalavra = resposta.split('').map(letra => (letraCorreta.indexOf(letra) >= 0 ? letra : " ___ ")).join('');

  document.getElementById('palavraVerificada').innerHTML = verificaPalavra;
}

function atualizaErros() {
  document.getElementById('erros').innerHTML = erros;
}

function reset() {
  erros = 0;
  letraCorreta = [];
  document.getElementById('jogoImage').src = './images/0.png';

  sorteiaPalavra();
  palavraCorreta();
  atualizaErros();
  criarBotoes();
}

var campo = document.querySelector("#InserirPalavra")
var but = document.querySelector("#inserir")

but.onclick = function(){
  palavras.push(campo.value);
  campo.value = ''
}

document.getElementById('tentativas').innerHTML = tentativas;

sorteiaPalavra();
criarBotoes();
palavraCorreta();
