//Constantes//

const borde = 25;
const ancho = 50;
const zona = 100;

//Variables//

document.getElementById("nombre").innerHTML = getNombre('username');

var canvas = document.getElementById('campo');
var ctx = canvas.getContext('2d');
var frameNo = 0;
var nivel = 1;
var nmonedas = 0;
//Variables para los obstáculos
var obsX, obsY;
// var obsAbuela = new Image;
var obstaculosH = [];
var obstaculosV = [];
// var obsHX = campo.width - 250;
// var obsHY =  Math.floor(Math.random() * (campo.height-50));
// var obsVX = campo.width - 250;
// var obsVY = Math.floor(Math.random() * (campo.height-50));
var empezar = false;
var contadorAbuela = 0;

tiempo = 0;

//Objetos//

function abuela(obsX, obsY) {
    this.obsX = obsX;
    this.obsY = obsY;
    img = new Image;
    img.src = '../img/abuela1.png';

    this.dibujarAbuela = function () {
        for (var i = 0; i < obstaculosH.length; i++) {
            ctx.drawImage(img, obstaculosH[i].obsX + 70, obstaculosH[i].obsY, 3 * ancho, 2 * ancho);
            if (nivel == 1) {
                obstaculosH[i].obsX -= 1.5;
                console.log(i, obstaculosH[i].obsX)
            } else if (nivel == 2) {
                obstaculosH[i].obsX -= 3;
            } else if (nivel == 3) {
                // ctx.drawImage(img, obstaculosV[j].obsVY + zona, obstaculosV[j].obsVX, 3 * ancho, 2 * ancho);
                obstaculosH[i].obsX -= 4;
                // obstaculosV[j].obsVX -= 2;
                // dibujarOV();
            } else if (nivel == 4) {
                obstaculosH[i].obsX -= 5.5;
                // obstaculosV[j].obsVX -= 3;
                // dibujarOV();
            }
            if (obstaculosH[i].obsX < 0) {
                obstaculosH.splice(i, 1);
            }
            // if (obstaculosV[j].obsVY < 0) {
            //     obstaculosV.splice(j, 1);
            // }
        }
    },

        this.colisionAbuelaH = function (x, y) {
            for (var i = 0; i < obstaculosH.length; i++) {
                if (((obstaculosH[i].obsX - (x - ancho) < borde) && ((x - (obstaculosH[i].obsX + 3 * ancho)) < borde))) {
                    if (((x + ancho) < obstaculosH[i].obsX) || (x > (obstaculosH[i].obsX + 3 * ancho))) {
                        if (((y > obstaculosH[i].obsY) && (y + ancho) < (obstaculosH[i].obsY + 2 * ancho)) || ((y > obstaculosH[i].obsY) && ((y + ancho) < (obstaculosH[i].obsY + 2 * ancho)))) {
                            obstaculosH.splice(i, 1);
                            tiempo++;
                            contadorAbuela++;
                        }
                    }
                }
            }
            document.getElementById('abuela').innerHTML = contadorAbuela;
        },

        this.colisionAbuelaV = function (x, y) {
            for (var j = 0; j < obstaculosV.length; j++) {
                if ((obstaculosV[j].obsVX - (y - ancho) < borde) && (y - (obstaculosV[i].obsVX + 2 * ancho) < borde)) {
                    if (((y + ancho) > obstaculosV[j].obsVX) || (y < (obstaculosV[j].obsVX + 2 * ancho))) {
                        if ((((x + ancho) > obstaculosV[j].obsVY)) || (x < (obstaculosV[j].obsVY + ancho))) {
                            obstaculosV.splice(j, 1);
                            tiempo++;
                            contadorAbuela++;
                        }
                    }
                }
            }
            document.getElementById('abuela').innerHTML = contadorAbuela;
        }
}

var jugador = {
    x: zona / 2,
    y: campo.height / 2,
    img: new Image,
    bono: false,

    dibujarJugador: function () {
        jugador.img.src = '../img/icono.png';
        ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    },

    colisionJugador: function (x) {
        if (jugador.bono) {                                          //Colisiona con tren

        } else {
            if (x > (campo.width - 2 * zona - borde)) {                //Colisionar borde
                jugador.x = campo.width - 2 * zona - 3 * borde;
            }
        }
    }
};

var tren = {
    x: 850,
    y: 0,
    img: new Image,
    tocaTren: false,

    dibujarTren: function () {
        tren.img.src = '../img/trenes1.png';
        ctx.drawImage(tren.img, tren.x, tren.y, campo.width - 850, campo.height);
    },

    colisionTorno: function (x) {
        if (jugador.bono) {
            if (x > (campo.width - 80)) {
                window.location.href = 'hasGanado.html';
            }
        }

    }
};

var rail = {
    x: 760,
    y: 0,
    img: new Image,
    tocaRail: false,

    dibujarRail: function () {
        rail.img.src = '../img/tracks.png';
        ctx.drawImage(rail.img, rail.x, rail.y, campo.width - 700, campo.height);
    }
};

var torno = {
    x: campo.width - 2 * zona - borde,
    y: 0,
    img: new Image,
    tocaTorno: false,

    dibujarTorno: function () {
        if (jugador.bono) {
            sonido.tornito.play();
            torno.img.src = null;
        } else {
            torno.img.src = '../img/torno1.jpg';
        }
        ctx.drawImage(torno.img, torno.x, torno.y, ancho, campo.height);
    }
};

var zonaS = {
    x: 30,
    y: 0,
    img: new Image,

    dibujarZona: function () {
        zonaS.img.src = "../img/barranym.png";
        ctx.drawImage(zonaS.img, zonaS.x, zonaS.y, 100, campo.height);
    }
};

var ladron = {
    x: nAleatorio(zonaS.x + ancho + zona, campo.width - 2 * zona - ancho - borde),
    y: nAleatorio(ancho + borde, campo.height - ancho - borde),
    img: new Image,
    velx: 3,
    vely: 3,

    dibujarLadron: function () {
        ladron.img.src = '../img/ladron.png';
        ctx.drawImage(ladron.img, ladron.x, ladron.y, ancho, ancho);
    },

    bordesLadron: function () {
        if (jugador.bono) {
            if ((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - borde - ancho))) {
                ladron.velx = -ladron.velx;
            }
        } else {
            if ((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - 2 * zona - borde - ancho))) {
                ladron.velx = -ladron.velx;
            }
        }

        if (ladron.y < ancho || (ladron.y > (campo.height - ancho))) {
            ladron.vely = -ladron.vely;
        }
    },

    robaMoneda: function () {                                                               //Ladrón roba monedas con las que choca
        if ((ladron.x < (moneda.x + ancho)) && (ladron.x > (moneda.x - ancho))) {
            if ((ladron.y < (moneda.y + ancho)) && (ladron.y > (moneda.y - ancho))) {
                aleatoriaM();
            }
        }
    },

    colisionLadron: function (x, y) {
        if ((x < (ladron.x + ancho)) && ((x + ancho) > ladron.x)) {
            if ((y < (ladron.y + ancho)) && ((y + ancho) > ladron.y)) {
                if (nmonedas > 0) {
                    nmonedas--;
                    ladron.velx = -ladron.velx;
                    ladron.velx = -ladron.vely;
                }
            }
        }
    }
};

var moneda = {
    x: nAleatorio(zonaS.x + zona, campo.width - 2 * zona - 2 * borde),
    y: nAleatorio(borde, campo.height - 2 * borde),
    img: new Image,

    dibujarMoneda: function () {
        if (jugador.bono) {
            moneda.img.src = null;
        } else {
            moneda.img.src = '../img/moneda.png';
        }
        ctx.drawImage(moneda.img, moneda.x, moneda.y, borde, borde)
    },

    colisionMoneda: function (x, y) {
        if ((x < (moneda.x + ancho)) && (x > (moneda.x - borde))) {
            if ((y < (moneda.y + ancho)) && (y > (moneda.y - borde))) {
                sonido.moneda.play();
                nmonedas++;
                aleatoriaM();
            }
        }

        niveles(nmonedas);
        document.getElementById("monedas").innerHTML = nmonedas;
    }
};

var sonido = {
    moneda: new Audio('../sonido/Moneda.mp3'),
    // abuela: new Audio('../sonido/GolpeAbuela.mp3'),
    // abuela: new Audio('../sonido/GolpeAbuela1.mp3'),
    // abuela: new Audio('../sonido/GolpeAbuela2.wav'),
    // abuela: new Audio('../sonido/GolpeAbuela3.wav'),
    abuela: new Audio('../sonido/abuelaPaula.wav'),
    //abuela: new Audio('../sonido/gameOver.mp3'),
    tornito: new Audio('../sonido/torno.wav'),
};


//Main//

function main() {
    empezar = true;

    obsX = canvas.height;
    obsY = canvas.width;
    musFondo = new sound("trenpasando.wav");
    musFondo.play();

    obsHX = canvas.height;
    obsHY = canvas.width;

    obsVX = canvas.height;
    obsVY = canvas.width;

    setInterval(dibujar, 10);
    setInterval(creaAbuelas, 3000);
    setTimeout(contar, 1000);
}

function dibujar() {
    clear();

    ladron.x += ladron.velx;
    ladron.y += ladron.vely;

    moneda.dibujarMoneda();
    torno.dibujarTorno();

    zonaS.dibujarZona();
    rail.dibujarRail();
    tren.dibujarTren();
    jugador.dibujarJugador();
    ladron.dibujarLadron();

    //Colisiones:

    ladron.bordesLadron();
    ladron.robaMoneda();
}

//Funciones//

//DIBUJAR//
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}

//Obstáculos

/*COLISIONES*/

//Obstaculos
function creaAbuelas() {                                       //Crea las abuelas
    var abuelaH = new abuela(campo.width - 250, Math.floor(Math.random() * (campo.height - 50)));
    // var abuelaV = new abuela(campo.width - 250, Math.floor(Math.random() * (campo.height - 50)));
    abuelaH.dibujarAbuela();
    // abuelaV.dibujarAbuela();
    obstaculosH.push(abuelaH);
    // obstaculosV.push(abuelaV);
    console.log(obstaculosH);
    // console.log(obstaculosV);
}

/*NIVELES*/
function niveles(nmonedas) {
    if (nmonedas == 10) {
        nivel = 2;
    }
    if (nmonedas == 20) {
        nivel = 3;
    }
    if (nmonedas == 30) {
        nivel = 4;
    }
    if (nmonedas == 40) {
        jugador.bono = true;
        document.getElementById("bono").innerHTML = "Cargado";
    }
    document.getElementById("nivel").innerHTML = nivel;
}

/*Movimiento jugador*/
document.addEventListener("mousemove", moverJ, false);

function moverJ(e) {
    var ratonX = e.pageX - campo.offsetLeft;
    var ratonY = e.pageY - campo.offsetTop;

    if (ratonX > 0 && ratonX < campo.width - 45) {
        jugador.x = ratonX - 10;
    }

    if (ratonY > 5 && ratonY < campo.height - 40) {
        jugador.y = ratonY - 10;
    }


    if (empezar) {
        jugador.colisionJugador(jugador.x);
        moneda.colisionMoneda(jugador.x, jugador.y);
        tren.colisionTorno(jugador.x);
        // abuela.colisionAbuelaH(jugador.x, jugador.y);
        // abuela.colisionAbuelaV(jugador.x, jugador.y);
        if (nivel % 2 == 0) {
            ladron.colisionLadron(jugador.x, jugador.y);
        }
    }
}

/*Contador*/
function contar() {
    tiempo++;
    document.getElementById("contador1").innerHTML = String(tiempo);
    if (tiempo > 0) {
        setTimeout(contar, 1000);
    }

    if ((tiempo > 15) && (nmonedas < 10)) {
        window.location.href = "gameOver.html";
    } else if ((tiempo > 30) && (nmonedas < 20)) {
        window.location.href = "gameOver.html";
    }else if((tiempo >45 ) && (nmonedas <30)){
        window.location.href = "gameOver.html";
    } else if (tiempo == 60) {
        window.location.href = "gameOver.html";
    }
}

/*Auxiliares*/

function aleatoriaM() {                                                      //Aleatorizar moneda
    moneda.x = nAleatorio(zonaS.x + zona, campo.width - 2 * zona - 2 * borde);
    moneda.y = nAleatorio(borde, campo.height - borde);
}

function nAleatorio(min, max) {                                             //Número aleatorio
    return Math.random() * (max - min) + min;
}

function clear() {                                                           //Limpiar canvas
    ctx.clearRect(0, 0, campo.width, campo.height);
}


/*Relacionados con HTML*/

function getNombre(name, url) {
    if (!url) {
        url = window.location.href;
    }

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);

    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '*indefinido*';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

//JQUIRE
// $(document).ready(function () {

//     var resultado = $('#resultado');

//     $('.button').click(function () {
//         $('.caja').animate({
//             right: '100px',
//             opacity: '0.5',
//             height: '0', // se agranda 150 px
//             weight: '0'
//         }, '2000');
//     });
// });



