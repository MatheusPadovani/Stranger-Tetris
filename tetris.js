const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

let proxcanvas = document.getElementById('aa');
let proxcontext = proxcanvas.getContext('2d');

proxcontext.fillStyle = "#131313";
proxcontext.fillRect(0, 0, 80, 80);


function playAudio() {
    var audio = new Audio('music.mp3');
    clearInterval(myVar);
}
var myVar = setInterval(playAudio, 500);


var mySound;
var myMusic;


var temp;
const rotl = 0;
const rotc = 0;
var tabuleiro = 10;
context.fillStyle = '#f8f8f8';
context.fillRect(0, 0, canvas.width, canvas.height);
altura = canvas.height / 20;
largura = canvas.width / 20;
let atual = CriarPeca(getRandomInt(1, 7));
let prox = CriarPeca(getRandomInt(1, 7));

const htmlrank = document.getElementById('show');
const htmlpontuacao = document.getElementById('pontuacao');
const htmlnivel = document.getElementById('nivel');
const htmllinhas = document.getElementById('linhas');
let pontuacaotot = 0;
let niveltot = 1;
let arena = CriarMatriz(largura, altura);

var contrank = 0;
var rank;
rank = new Array;
let tempotot = "";
let nomejogador;
const jogador = {
    posicao: { x: largura / 2 - 1, y: altura - 3 },
    matrix: CriarPeca(getRandomInt(1, 7)),
}




let girada = {
    posicao: { x: largura / 2, y: altura / 2 },
    matrix: CriarPeca(1),
}

function mudar() {
    if (tabuleiro == 10) {
        tabuleiro = 22;
        canvas.width = 440;
        canvas.height = 880;
    } else {
        tabuleiro = 10;
        canvas.width = 200;
        canvas.height = 400;
    }

    altura = canvas.height / 20;
    largura = canvas.width / 20;
    arena = CriarMatriz(largura, altura);
    desenhar();
    while (rank.length) {
        rank.pop();
    }
    contrank = 0;
    reiniciar();
    atualizaranking();
    htmlrank.innerHTML = "";
    contrank -= 1;
}
const cores = [
    '#073e1e',
    '#24408f',
    '#e63232',
    '#813162',
    '#0f580c',
    '#916868',
    '#E2A64D'
]


function fundo(canvas2d) {
    canvas2d.fillStyle = 'black';
    canvas2d.fillRect(0, 0, canvas.width, canvas.height);
    for (row = 0; row < altura; row++) {
        var count = 0;
        for (col = 0; col < largura; col++) {
            canvas2d.fillStyle = "#2e2d2d";
            var tam = 20;
            canvas2d.fillRect(col * tam, row * tam, tam - 1, tam - 1);
        }
    }
}
function CriarMatriz(l, a) {
    const matrix = []
    while (a--) {
        matrix.push(new Array(l).fill(0))
    }
    return matrix;
}
function CriarPeca(type) {
    if (type === 1) {
        return [
            //para achar o centro, é melhor ter 3 casas
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
    else if (type === 2) {
        return [
            //para achar o centro, é melhor ter 3 casas
            [2, 0, 2],
            [2, 2, 2],
            [0, 0, 0]
        ];
    }
    else if (type === 3) {
        return [
            //para achar o centro, é melhor ter 3 casas
            [0, 3, 0],
            [0, 3, 0],
            [3, 3, 0]
        ];
    }
    else if (type === 4) {
        return [

            [0, 4, 0],
            [0, 4, 0],
            [0, 4, 4]
        ];
    }
    else if (type === 5) {
        return [
            [5, 5],
            [5, 5]
        ];
    }
    else if (type === 6) {
        return [
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0],
            [0, 6, 0, 0]
        ];
    }

}

function reiniciar() {


    const vazia = CriarMatriz(largura, altura);
    arena = vazia;
    desenhar();
    atualizar();
    do {
        nomejogador = prompt("Por favor insira seu nome", "Jogador 1");
    } while (nomejogador == null);
    tempotot = document.getElementById('minuto').firstChild.data + document.getElementById('segundo').firstChild.data;;

    parar();
    tempo(1);

    resetarjogador();

    salvaranking();
    pontuacaotot = 0;
    pontuacaonivel();

}
let n;

function salvaranking() {

    rank[contrank] = new Object;
    rank[contrank].pontuacao = pontuacaotot;
    rank[contrank].nome = nomejogador;
    rank[contrank].tempo = tempotot;
    rank[contrank].nivel = niveltot;

    contrank++;
    ordenarank();
    atualizaranking();

}



function ordenarank() {
    n = contrank - 1;

    do {
        var troca = false;

        for (let c = 0; c < n; c++) {
            troca = false;
            if (rank[c].pontuacao < rank[c + 1].pontuacao) {


                var temp = rank[c];
                rank[c] = rank[c + 1];
                rank[c + 1] = temp;
                troca = true;
            }

        }
        n--;
    } while (troca);

}

var aux = htmlrank.innerHTML;
function atualizaranking() {
    aux = "<table>" +
        "<th>" +
        "Posição" +
        "</th>" +
        "<th>" +
        "Nome" +
        "</th>" +
        "<th>" +
        "Pontuação" +
        "</th>" +
        "<th>" +
        "Tempo" +
        "</th>" +
        "<th>" +
        "Nível" +
        "</th>"
        ;


    for (let c = 0; c < contrank; c++) {

        aux +=
            "<tr> "
            + " <td> " + Number(c + 1) + " </td>"
            + " <td> " + rank[c].nome + " </td>"
            + " <td> " + rank[c].pontuacao + " </td>"
            + " <td> " + rank[c].tempo + " </td>"
            + " <td> " + rank[c].nivel + " </td>"
            +
            " </tr>"
            ;
    }
    aux += "</table>";
    htmlrank.innerHTML = aux;

}

function merge(arena, jogador) {
    if (arena[altura - 1][largura / 2] !== 0) {
        reiniciar();
        return;
    }
    jogador.matrix.forEach((row, y) => {
        if (arena[altura - 1][largura / 2] !== 0) {
            reiniciar();
            return;
        }
        row.forEach((value, x) => {

            if (value !== 0) {
                arena[y + jogador.posicao.y][x + jogador.posicao.x] = value;


            }
        });
    });

}

function roda(matrix, cc, ll) {
    let rot = [];
    if (matrix.length == 3) {
        rot = [

            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    } else
        if (matrix.length == 4) {
            rot = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        }
        else
            if (matrix.length == 2) {
                rot = [
                    [0, 0],
                    [0, 0]
                ]
            }


    temp = 0;
    for (var mc = 0; mc < matrix.length; mc++) {
        for (var ml = matrix.length - 1; ml >= 0; ml--) {

            temp = matrix[mc][ml];
            rot[ll][cc] = temp;
            ll++;

        }
        ll = 0;
        cc++;
    }

    return rot;
}
let pontuacao = 0;
let apagadastot = 0;
let apagadas = 0;

function apagarlinha() {


    outer: for (let y = altura - 1; y >= 0; y--) {
        let cont = 0;
        for (let x = 0; x < largura; x++) {
            if (arena[y][x] != 0) {
                cont += 1;


                if (cont == largura) {
                    for (let lin = y; lin < altura - 1; lin++) {
                        for (let x = 0; x < largura; x++) {
                            arena[lin][x] = arena[lin + 1][x];
                        }
                    }
                    pontuacao += tabuleiro;
                    apagadas++;
                    cont = 0;
                    continue outer;
                }
            }
            else {
                break;
            }

        } cont = 0;


    }
    apagadastot += apagadas;
    pontuacao = pontuacao * apagadas;
    pontuacaotot = pontuacaotot + pontuacao;
    apagadas = 0;
    pontuacao = 0;

    aumentarvelocidade();
    pontuacaonivel();
}


function pontuacaonivel() {
    htmlpontuacao.innerText = pontuacaotot;
    htmlnivel.innerHTML = niveltot;
    htmllinhas.innerHTML = apagadastot;
}


function desenhar() {

    fundo(context);
    fundo(proxcontext);
    DesenharMatriz(jogador.matrix, jogador.posicao, context);
    DesenharMatriz(arena, { x: 0, y: 0 }, context);
    DesenharMatriz(prox, { x: 0, y: 0 }, proxcontext);
}


function DesenharMatriz(matriz, offset, context2d) {
    matriz.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context2d.fillStyle = cores[value];
                context2d.fillRect((x + offset.x) * 20,
                    (y + offset.y) * 20,
                    20, 20);
            }
        });
    });
}


let dropCounter = 0;
let dropIntervalo = 1000;

let Ultimotempo = 0;


function aumentarvelocidade() {
    if (pontuacaotot < 500) {
        dropIntervalo = 1000;
        niveltot = 1;
    } else
        if (pontuacaotot >= 500 && pontuacaotot <= 1000) {
            dropIntervalo = 900;
            niveltot = 2;
        }
        else if (pontuacaotot > 1000 && pontuacaotot <= 1500) {
            dropIntervalo = 800;
            niveltot = 3;
        }
        else if (pontuacaotot > 1500 && pontuacaotot <= 2000) {
            dropIntervalo = 700;
            niveltot = 4;
        }
        else if (pontuacaotot > 2000 && pontuacaotot <= 2500) {
            dropIntervalo = 600;
            niveltot = 5;
        }
        else if (pontuacaotot > 2500 && pontuacaotot <= 3000) {
            dropIntervalo = 500;
            niveltot = 6;
        }
        else if (pontuacaotot > 3000 && pontuacaotot <= 3500) {
            dropIntervalo = 400;
            niveltot = 7;
        }
        else if (pontuacaotot > 3500 && pontuacaotot <= 4000) {
            dropIntervalo = 300;
            niveltot = 8;
        }
        else if (pontuacaotot > 4000) {
            dropIntervalo = 200;
            niveltot = 9;
        }
}

function paratempo() {
    if (parartempo === 1) {

        parartempo = 0;
        document.getElementById("botao_tempo").innerHTML = "Parar Tempo";
    } else if (parartempo === 0) {
        parartempo = 1;
        document.getElementById("botao_tempo").innerHTML = "Voltar Tempo";
    }
}


let parartempo = 0;
function JogadorDrop() {

    if (parartempo === 0) {
        jogador.posicao.y--;
        if (colidir(arena, jogador)) {
            jogador.posicao.y++;
            merge(arena, jogador);
            resetarjogador();

        }
        dropCounter = 0;
    }
}

function colidir(arena, jogador) {
    const [m, o] = [jogador.matrix, jogador.posicao];
    for (let y = 0; y < m.length; ++y) {
        for (let x = 0; x < m[y].length; ++x) {
            if (m[y][x] !== 0 &&
                (arena[y + o.y] &&
                    arena[y + o.y][x + o.x]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function proxima() {
    if (prox !== undefined) {
        atual = prox;
    }
    prox = CriarPeca(getRandomInt(1, 7));
    return atual;
}

function resetarjogador() {
    apagarlinha();
    jogador.matrix = proxima();
    jogador.posicao.y = altura - 3;
    jogador.posicao.x = (largura / 2) - 1;
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function atualizar(time = 0) {
    const deltatempo = time - Ultimotempo;
    Ultimotempo = time;
    dropCounter += deltatempo;

    if (dropCounter > dropIntervalo) {
        JogadorDrop();
        desenhar();
    }
    requestAnimationFrame(atualizar);

}

function verifica() {
    if (colidir(arena, jogador)) {
        jogador.posicao.y++;
        merge(arena, jogador);
        resetarjogador();

    }
}


document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        jogador.posicao.x--;
        if (colidir(arena, jogador)) {
            jogador.posicao.x++;
        }
        desenhar();
    } else if (event.keyCode === 39) {
        jogador.posicao.x++;
        if (colidir(arena, jogador)) {
            jogador.posicao.x--;
        }
        desenhar();
    }
    else if (event.keyCode === 38) {
        jogador.posicao.y--;
        verifica();
        desenhar();
    } else if (event.keyCode === 40) {


        girada.matrix = roda(jogador.matrix, rotc, rotl);
        girada.posicao = jogador.posicao;

        if (colidir(arena, girada)) {
        } else {
            jogador.matrix = roda(jogador.matrix, rotc, rotl);

        }
        desenhar();

    }
    if (event.keyCode === 32) {

        dropIntervalo = 0;
        if (colidir(arena, jogador)) {
            aumentarvelocidade();
        }
    }
});

desenhar();
atualizar();

var intervalo;

function tempo(op) {

    var s = 0;
    var m = 0;
    intervalo = window.setInterval(function () {
        if (s == 60) { m++; s = 0; }
        if (s < 10) document.getElementById("segundo").innerHTML = "0" + s;
        else document.getElementById("segundo").innerHTML = s;
        if (m < 10) document.getElementById("minuto").innerHTML = "0" + m + ":";
        else document.getElementById("minuto").innerHTML = m + ":";
        s++;
    }, 1000);

}

function parar() {
    window.clearInterval(intervalo);
}



window.onload = tempo;
