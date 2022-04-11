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
var obsHX,obsHY;
var obsVX,obsVY;
var obsAbuela = new Image;
var obstaculosH = [];
var obstaculosV = [];
var empezar = false;
var contadorAbuela = 0;

tiempo = 0;

//Objetos//

var jugador = {
    x: zona/2,
    y: campo.height/2,
    img: new Image,
    bono: false
};



var tren = {
    x: 850,
    y: 0,
    img: new Image,
    tocaTren : false
};

var rail = {
    x: 760,
    y: 0,
    img: new Image,
    tocaRail : false
};

var torno = {
    x: campo.width - 2*zona - borde,
    y: 0,
    img: new Image,
    tocaTorno: false
};

var zonaS = {
    x: 30,
    y: 0,
    img: new Image
};

var ladron = {
    x: nAleatorio(zonaS.x + ancho + zona, campo.width - 2*zona - ancho - borde),
    y: nAleatorio(ancho + borde, campo.height - ancho - borde),
    img: new Image,
    velx: 3,
    vely: 3
};

var moneda = {
    x: nAleatorio(zonaS.x + zona, campo.width - 2*zona - 2*borde),
    y: nAleatorio(borde, campo.height - 2*borde),
    img: new Image
};

var sonido = {
    moneda: new Audio('../sonido/Moneda.mp3'),
    abuela: new Audio('../sonido/gameOver.mp3'),
    torno: null
};


//Main//

function main(){
    empezar = true;

    obsHX = canvas.height;
    obsHY = canvas.width;

    obsVX = canvas.height;
    obsVY = canvas.width;
    
    setInterval(dibujar, 10);
    setInterval(creaObstaculo, 1000);
    setTimeout(contar,1000);
}

function dibujar() {
    clear();

    ladron.x += ladron.velx;
    ladron.y += ladron.vely;
    
    dibujarM();
    dibujarP();
    if (obstaculosH.length != 0) {
        dibujarO();
        i= 0;
    }
    dibujarZ();
    dibujarR();
    dibujarT();
    dibujarJ();
    dibujarL();

    //Colisiones:

    bordesL();
    robaM();
}
    
//Funciones//

function obst (posJugadorX, posJugadorY) {                              //Constructor obstáculos
    this.posJugadorX = posJugadorX;
    this.posJugadorY = posJugadorY;
}

/*DIBUJAR*/

//Jugador
function dibujarJ(){
    jugador.img.src = '../img/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    //canvas.style.cursor = "none";
}

//Moneda
function dibujarM(){
    if(jugador.bono){
        moneda.img.src = null;
    }else{
        moneda.img.src = '../img/moneda.png';
    }
    ctx.drawImage(moneda.img, moneda.x, moneda.y, borde, borde)
}


//Obstáculos
function dibujarO(){
    //Funcion para dibujar los obstáculos
    for(var i = 0; i < obstaculosH.length; i++) {
        ctx.drawImage(obsAbuela, obstaculosH[i].obsHX + 70, obstaculosH[i].obsHY, 3*ancho, 2*ancho);
        //3 niveles, 3 velocidades distintas? con case o if se hace
        if(nivel ==1){
            obstaculosH[i].obsHX -= 1.5;
        }else if(nivel == 2){
            obstaculosH[i].obsHX -= 3;
        }else if(nivel == 3){
            obstaculosH[i].obsHX -= 4;
            dibujarOV();
        }else if(nivel == 4){
            obstaculosH[i].obsHX -= 5.5;
            dibujarOV();
        }
        if(obstaculosH[i].obsHX < 0) {
            obstaculosH.splice(i,1);
        }
      
    }

}

function dibujarOV(){
    for( var i = 0; i < obstaculosV.length; i++){
        ctx.drawImage(obsAbuela, obstaculosV[i].obsVY + zona, obstaculosV[i].obsVX, 3*ancho, 2*ancho);
        if(nivel == 3){
            obstaculosV[i].obsVX -=2;
        }else if(nivel == 4){
            obstaculosV[i].obsVX -=3;
        }
        if(obstaculosV[i].obsVY < 0){
            obstaculosV.splice(i,1);
        } 
    }
}

//Zona de seguridad
function dibujarZ(){
    zonaS.img.src = "../img/barranym.png";
    ctx.drawImage(zonaS.img,zonaS.x,zonaS.y,100,campo.height);
}

//Torno de metro
function dibujarP(){
    if(jugador.bono){
        torno.img.src = null;
    }else{
        torno.img.src = '../img/torno1.jpg';
    }
    
    ctx.drawImage(torno.img, torno.x, torno.y, ancho, campo.height);
}

//Tren
function dibujarT(){
    tren.img.src = '../img/trenes1.png';
    ctx.drawImage(tren.img, tren.x, tren.y, campo.width - 850, campo.height);
}

//Ladrón
function dibujarL(){
    ladron.img.src = '../img/ladron.png';
    ctx.drawImage(ladron.img, ladron.x, ladron.y, ancho, ancho);
} 
    
//Railes
function dibujarR(){
    rail.img.src = '../img/tracks.png';
    ctx.drawImage(rail.img, rail.x, rail.y, campo.width - 700, campo.height);
}
   
/*COLISIONES*/

//Jugador
function colisionJ(x){
    if(jugador.bono){                                          //Colisiona con tren

    }else{
        if(x > (campo.width - 2*zona - borde)){                //Colisionar borde
            jugador.x = campo.width - 2*zona - 3*borde;
        }
    }
}

//Moneda
function colisionM(x, y){
    if((x < (moneda.x + ancho)) && (x > (moneda.x - borde))){
        if((y < (moneda.y + ancho)) && (y > (moneda.y - borde))){
            sonido.moneda.play();
            nmonedas++;
            aleatoriaM();
        }
    }

    niveles(nmonedas);
    document.getElementById("monedas").innerHTML = nmonedas;
}

//Obstaculos
function creaObstaculo (){                                          //Crea las abuelas
    var obstA = new obst (obsHX, obsHY);
    var obstB = new obst (obsVX,obsVY);
    obsAbuela.src = '../img/abuela1.png';
    obstA.obsHX = campo.width - 250;
    obstA.obsHY = Math.floor(Math.random() * (campo.height-50));
    obstB.obsVX = campo.width - 250;
    obstB.obsVY = Math.floor(Math.random() * (campo.height-50));
    obstaculosH.push(obstA);
    obstaculosV.push(obstB);
}

function colisionAbuelaH(x,y){
    for(i = 0; i < obstaculosH.length;i++){
        if(((obstaculosH[i].obsHX - (x-ancho) < borde) && (( x- (obstaculosH[i].obsHX + 3*ancho)) < borde))){
            if(((x+ancho) < obstaculosH[i].obsHX) || (x > (obstaculosH[i].obsHX + 3*ancho))){
                if(((y > obstaculosH[i].obsHY) && (y + ancho) < (obstaculosH[i].obsHY +2*ancho)) || ((y > obstaculosH[i].obsHY) &&((y+ancho) < (obstaculosH[i].obsHY+2*ancho)))){
                    obstaculosH.splice(i,1);
                    tiempo++;
                    contadorAbuela++;
                    
                }
            }
        }
    }
    document.getElementById('abuela').innerHTML = contadorAbuela;
}

function colisionAbuelaV(x,y){
    for(j = 0; j < obstaculosV.length;j++){
        if((obstaculosV[j].obsVX - (y-ancho) < borde) && (y - (obstaculosV[i].obsVX + 2*ancho) < borde)){
            if(((y + ancho) > obstaculosV[j].obsVX) || (y< (obstaculosV[j].obsVX + 2*ancho))){
                if((((x + ancho) > obstaculosV[j].obsVY)) || ( x < (obstaculosV[j].obsVY + ancho))){
                    obstaculosV.splice(j,1);
                    tiempo++;
                    contadorAbuela++;
                }
            }
        } 
    }
    document.getElementById('abuela').innerHTML = contadorAbuela;
}



//Tren
function colisionT(x){
    if(jugador.bono){
        if(x > (campo.width - 80)){
            window.location.href = 'hasGanado.html';
        }
    }
   
}

//Ladron

//Ladrón te roba 1 moneda y rebota, pero cuando lo pillas en diagonal te roba todas y no te rebota
function colisionL(x, y){
    if((x < (ladron.x + ancho)) && ((x+ancho) > ladron.x)){
        if((y < (ladron.y + ancho)) && ((y+ ancho) > ladron.y)){
            if(nmonedas > 0){
                nmonedas--;
                ladron.velx = -ladron.velx;
                ladron.velx = -ladron.vely;
            }
        }
    }
}

function bordesL(){
    if(jugador.bono){
        if((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - borde - ancho))){
            ladron.velx = -ladron.velx;
        }
    }else{
        if((ladron.x < (zona + zonaS.x)) || (ladron.x > (campo.width - 2*zona - borde - ancho))){
            ladron.velx = -ladron.velx;
        }
    }
    
    if(ladron.y <  ancho|| (ladron.y > (campo.height - ancho))){
        ladron.vely = -ladron.vely;
    }
}

function robaM(){                                                               //Ladrón roba monedas con las que choca
    if((ladron.x < (moneda.x + ancho)) && (ladron.x > (moneda.x - ancho))){
        if((ladron.y < (moneda.y + ancho)) && (ladron.y > (moneda.y - ancho))){
            aleatoriaM();
        }
    }
}

/*NIVELES*/
function niveles(nmonedas){
    if(nmonedas ==10){
        nivel = 2;  
    }
    if(nmonedas == 20){
        nivel = 3;
    }
    if(nmonedas == 30){
        nivel = 4;
    }
    if(nmonedas == 40){
        jugador.bono = true;
        document.getElementById("bono").innerHTML = "Cargado";
    }
    document.getElementById("nivel").innerHTML = nivel;
}

/*Movimiento jugador*/
document.addEventListener("mousemove", moverJ, false);

function moverJ(e){
    var ratonX = e.pageX - campo.offsetLeft;
    var ratonY = e.pageY - campo.offsetTop;

    if(ratonX > 0 && ratonX < campo.width-45){
        jugador.x = ratonX - 10;
    }

    if(ratonY > 5 && ratonY < campo.height-40){
        jugador.y = ratonY - 10;
    }
    

    if(empezar){
        colisionJ(ratonX);
        colisionM(ratonX, ratonY);
        colisionT(ratonX);
        colisionAbuelaH(ratonX,ratonY);
        colisionAbuelaV(ratonX,ratonY);
        if(nivel % 2 == 0){
            colisionL(ratonX, ratonY);
        }
    }  
}

/*Contador*/
function contar(){
    tiempo++;
    document.getElementById("contador1").innerHTML = String(tiempo);
    if(tiempo>0){
        setTimeout(contar,1000);
    }

    if((tiempo > 15) && (nmonedas <10)){
        window.location.href = "gameOver.html";
    }else if((tiempo > 30) && (nmonedas <20)){
        window.location.href = "gameOver.html";
    }else if((tiempo >45 ) && (nmonedas <30)){
        window.location.href = "gameOver.html";
    }else if(tiempo == 60){
        window.location.href = "gameOver.html";
    }   
}

/*Auxiliares*/

function aleatoriaM(){                                                      //Aleatorizar moneda
    moneda.x = nAleatorio(zonaS.x + zona, campo.width - 2*zona - 2*borde);
    moneda.y = nAleatorio(borde, campo.height - borde);
}

function nAleatorio(min, max) {                                             //Número aleatorio
    return Math.random() * (max - min) + min;
}

function clear(){                                                           //Limpiar canvas
    ctx.clearRect(0, 0, campo.width, campo.height);
}


/*Relacionados con HTML*/

function getNombre(name, url){
    if (!url){
        url = window.location.href;
    } 

    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);

    if (!results){
        return null;
    } 
    if (!results[2]){
        return '*indefinido*';
    } 
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}




