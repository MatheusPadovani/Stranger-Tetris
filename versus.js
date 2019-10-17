const canvasum = document.getElementById('tetrisum');
const contextum = canvasum.getContext('2d');

let canvasdois = document.getElementById('tetrisdois');
let contextdois = canvasdois.getContext('2d');

contextdois.fillStyle = "#131313";
contextdois.fillRect(0, 0, 80, 80);

var audio = new Audio('music.mp3');

var mySound;
var myMusic;

var temp;
const rotl = 0;
const rotc = 0;
var tabuleiro = 10;

contextum.fillStyle = '#f8f8f8';
contextum.fillRect(0, 0, canvasum.width, canvasum.height);
altura = canvasum.height / 20;
largura = canvasum.width / 20;
let atual = CriarPeca(getRandomInt(1, 7));
let prox = CriarPeca(getRandomInt(1, 7));

const htmlrank = document.getElementById('show');


const htmlpontuacaoum = document.getElementById('pontuacaoum');
const htmlpontuacaodois = document.getElementById('pontuacaodois');


const htmlnivel = document.getElementById('nivel');
const htmllinhas = document.getElementById('linhas');
let pontuacaototum = 0;
let pontuacaototdois = 0;

let niveltotum = 1;
let niveltotdois = 1;

let arenaum = CriarMatriz(largura, altura);
let arenadois = CriarMatriz(largura, altura);

var contrank = 0;
var rank;
rank = new Array;
let tempotot = "";
let nomejogador;
const jogadorum = {
    posicao: { x: largura / 2 - 1, y: altura - 3 },
    matrix: CriarPeca(getRandomInt(1, 7)),
}
const jogadordois = {
    posicao: { x: largura / 2 - 1, y: altura - 3 },
    matrix: CriarPeca(getRandomInt(1, 7)),
}

let giradaum = {
    posicao: { x: largura / 2, y: altura / 2 },
    matrix: CriarPeca(1),
}
let giradadois = {
    posicao: { x: largura / 2, y: altura / 2 },
    matrix: CriarPeca(1),
}


const peca = '123456';
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
    canvas2d.fillRect(0, 0, canvasum.width, canvasum.height);
    for (row = 0; row < altura; row++) {
        var count = 0;
        for (col = 0; col < largura; col++) {
            //context.fillStyle = "#f1f1f1";
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
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ];
    }
    else if (type === 2) {
        return [
            [2, 0, 2],
            [2, 2, 2],
            [0, 0, 0]
        ];
    }
    else if (type === 3) {
        return [
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
    const vazia2 = CriarMatriz(largura, altura);
    arenaum = vazia;
    arenadois = vazia2;
    desenhar();
    atualizar();

    parar();
    tempo(1);
    pontuacaototum = 0;
    pontuacaototdois = 0;
    pontuacaonivel();

}



function merge(arena, pl) {
    var reset;
    reset = pl;
    if (reset == jogadorum) {
        if (arenaum[altura - 1][largura / 2] !== 0) {
            parartempo = 1;
            console.log("fimmm1");
            return;
        }
        jogadorum.matrix.forEach((row, y) => {
            if (arenaum[altura - 1][largura / 2] !== 0) {
                parartempo = 1;
                console.log("fimm1");
                return;
            }
            row.forEach((value, x) => {
                if (value !== 0) {
                    arenaum[y + jogadorum.posicao.y][x + jogadorum.posicao.x] = value;


                }
            });
        });
        resetarjogador(jogadorum);
    } else if (reset == jogadordois) {
        if (arenadois[altura - 1][largura / 2] !== 0) {
            console.log("fimmmmmm2");
            tempodois = 2;
            //reiniciar();
            return;
        }
        jogadordois.matrix.forEach((row, y) => {
            if (arenadois[altura - 1][largura / 2] !== 0) {
                //reiniciar();
                parartempo = 2;
                console.log("fimm2");
                return;
            }
            row.forEach((val, x) => {
                //console.log("jogador 2222");
                if (val !== 0) {
                    arenadois[y + jogadordois.posicao.y][x + jogadordois.posicao.x] = val;


                }
            });

        });
        resetarjogador(jogadordois);
    }


}

function roda(matrix, cc, ll) {
    let rot = [];
    if (matrix.length == 3) {
        rot = [
            //para achar o centro, é melhor ter 3 vetores
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]
    } else
        if (matrix.length == 4) {
            rot = [
                //para achar o centro, é melhor ter 3 vetores
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ]
        }
        else
            if (matrix.length == 2) {
                rot = [
                    //para achar o centro, é melhor ter 3 vetores
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
let pontuacaoum = 0;
let pontuacaodois = 0;
let apagadastotum = 0;
let apagadastotdois = 0;


let apagadasum = 0;
let apagadasdois = 0;
function apagarlinha(arena) {


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
                    if (arena == arenaum) {
                        pontuacaoum += tabuleiro;
                        apagadasum++;
                        cont = 0;
                    } if (arena == arenadois) {
                        pontuacaodois += tabuleiro;
                        apagadasdois++;
                        cont = 0;
                    }

                    continue outer;
                }
            }
            else {
                break;
            }

        } cont = 0;

    }

    apagadastotum += apagadasum;
    pontuacaoum = pontuacaoum * apagadasum;
    pontuacaototum = pontuacaototum + pontuacaoum;
    apagadasum = 0;
    pontuacaoum = 0;

    apagadastotdois += apagadasdois;
    pontuacaodois = pontuacaodois * apagadasdois;
    pontuacaototdois = pontuacaototdois + pontuacaodois;
    apagadasdois = 0;
    pontuacaodois = 0;


    pontuacaonivel();
}


function pontuacaonivel() {

    htmlpontuacaoum.innerText = pontuacaototum;
    htmlpontuacaodois.innerText = pontuacaototdois;

}


function desenhar() {

    fundo(contextum);
    fundo(contextdois);
    DesenharMatriz(jogadorum.matrix, jogadorum.posicao, contextum);
    DesenharMatriz(jogadordois.matrix, jogadordois.posicao, contextdois);

    DesenharMatriz(arenaum, { x: 0, y: 0 }, contextum);
    DesenharMatriz(arenadois, { x: 0, y: 0 }, contextdois);
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







function paratempo() {
    if (parartempo === 1) {
        parartempo = 0;
        document.getElementById("botao_tempo").innerHTML = "Parar Tempo";
    } else if (parartempo === 0) {
    }
}


let parartempo = 0;
let tempodois = 0;
function JogadorDrop() {
    if (parartempo == 1 && tempodois == 2) {
        dropCounter = 1000;
        if (pontuacaototdois == pontuacaototum) {
            alert("Empate!");
            reiniciar();
        } else if (pontuacaototum > pontuacaototdois) {
            alert("Jogador SETAS ganhou!");
            reiniciar();
        }
        else if (pontuacaototum < pontuacaototdois) {
            alert("Jogador WASD ganhou!");
            reiniciar();
        }
        parartempo = 0;
        tempodois = 0;
    }
    else
        if (parartempo == 0 && tempodois == 0) {
            jogadordois.posicao.y--;
            if (colidir(arenadois, jogadordois)) {
                jogadordois.posicao.y++;
                merge(arenadois, jogadordois);
                resetarjogador(arenadois, jogadordois);
            }
            jogadorum.posicao.y--;
            if (colidir(arenaum, jogadorum)) {
                jogadorum.posicao.y++;
                merge(arenaum, jogadorum);
                resetarjogador(arenaum, jogadorum);
            }
            dropCounter = 0;
        }
        else if (parartempo == 1) {
            jogadordois.posicao.y--;
            if (colidir(arenadois, jogadordois)) {
                jogadordois.posicao.y++;
                merge(arenadois, jogadordois);
                resetarjogador(arenadois, jogadordois);
            }
            dropCounter = 0;
        } else if (tempodois == 2) {
            jogadorum.posicao.y--;
            if (colidir(arenaum, jogadorum)) {
                jogadorum.posicao.y++;
                merge(arenaum, jogadorum);
                resetarjogador(arenaum, jogadorum);
            }
            dropCounter = 0;
        }

}


function colidir(arena, jog) {
    var aa;
    aa = arena;
    if (aa == arenaum) {
        const [m, o] = [jog.matrix, jog.posicao];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arenaum[y + o.y] &&
                        arenaum[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
    else if (aa == arenadois) {
        const [m, o] = [jog.matrix, jog.posicao];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arenadois[y + o.y] &&
                        arenadois[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }
}

function proxima() {
    if (prox !== undefined) {
        atual = prox;
    }
    prox = CriarPeca(getRandomInt(1, 7));
    return atual;
}

function resetarjogador(jogador) {
    var reset;
    reset = jogador;
    if (reset == jogadorum) {
        jogadorum.matrix = proxima();
        apagarlinha(arenaum);
        jogadorum.posicao.y = altura - 3;
        jogadorum.posicao.x = (largura / 2) - 1;
    }
    if (reset == jogadordois) {
        jogadordois.matrix = proxima();
        apagarlinha(arenadois);
        jogadordois.posicao.y = altura - 3;
        jogadordois.posicao.x = (largura / 2) - 1;
    }

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

function verifica(arena, jogador) {
    let lala = arena;
    if (lala == arenaum) {
        if (colidir(arenaum, jogadorum)) {
            jogadorum.posicao.y++;
            merge(arenaum, jogadorum);
            resetarjogador(jogadorum);
        }
    }
    else if (lala == arenadois) {
        if (colidir(arenadois, jogadordois)) {
            jogadordois.posicao.y++;
            merge(arenadois, jogadordois);
            resetarjogador(jogadordois);
        }
    }

}



document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        jogadorum.posicao.x--;
        if (colidir(arenaum, jogadorum)) {
            jogadorum.posicao.x++;
        }
        desenhar();
    } else if (event.keyCode === 39) {
        jogadorum.posicao.x++;
        if (colidir(arenaum, jogadorum)) {
            jogadorum.posicao.x--;
        }
        desenhar();
    }
    else if (event.keyCode === 38) {
        jogadorum.posicao.y--;
        verifica(arenaum, jogadorum);
        desenhar();
    } else if (event.keyCode === 40) {


        giradaum.matrix = roda(jogadorum.matrix, rotc, rotl);
        giradaum.posicao = jogadorum.posicao;

        if (colidir(arenaum, giradaum)) {
            console.log("vai bater 111 fodeu");
        } else {
            jogadorum.matrix = roda(jogadorum.matrix, rotc, rotl);

        }

        desenhar();

    }

});

document.addEventListener('keydown', event => {
    if (event.keyCode === 65) {
        jogadordois.posicao.x--;
        if (colidir(arenadois, jogadordois)) {
            jogadordois.posicao.x++;
        }
        desenhar();
    } else if (event.keyCode === 68) {
        jogadordois.posicao.x++;
        if (colidir(arenadois, jogadordois)) {
            jogadordois.posicao.x--;
        }
        desenhar();
    }

    else if (event.keyCode === 87) {
        jogadordois.posicao.y--;
        verifica(arenadois, jogadordois);
        desenhar();
    } else if (event.keyCode === 83) {
        giradadois.matrix = roda(jogadordois.matrix, rotc, rotl);
        giradadois.posicao = jogadordois.posicao;

        if (colidir(arenadois, giradadois)) {
            console.log("vai bater 2 fodeu");
        } else {
            jogadordois.matrix = roda(jogadordois.matrix, rotc, rotl);

        }
        desenhar();

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
