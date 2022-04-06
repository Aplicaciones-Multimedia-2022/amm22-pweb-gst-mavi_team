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
var posJugadorX, posJugadorY = 0;
var obsX,obsY;
var obsAbuela = new Image;
var obstaculosH = [];
var empezar = false;


tiempo = 0;

//Objetos//

var jugador = {
    x: zona/2,
    y: campo.height/2,
    img: new Image,
    //monedas: 0,
    bono: false
};

var moneda = {
    x: nAleatorio(zona + borde, campo.width - 2*zona - 2*borde),
    y: nAleatorio(borde, campo.height - 2*borde),
    img: new Image
};

var ladron = {
    x: nAleatorio(zona + ancho, campo.width - 2*zona - ancho),
    y: nAleatorio(ancho, campo.height - ancho),
    img: new Image,
    velx: 3,
    vely: 3
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
    tocaTorno: false,
};

var zonaS = {
    x: 30,
    y: 0,
    img: new Image,
};

var ladron = {
    x: nAleatorio(zona + ancho + borde, campo.width - 2*zona - ancho - borde),
    y: nAleatorio(ancho + borde, campo.height - ancho - borde),
    img: new Image,
    velx: 3,
    vely: 3
};


//Main//

function main(){
    empezar = true;

    obsX = canvas.height;
    obsY = canvas.width;
    
    setInterval(dibujar, 10);
    setInterval(creaObstaculo, 1000);

    setTimeout(contar,1000);
    

}

function dibujar() {
    clear();

    ladron.x += ladron.velx;
    ladron.y += ladron.vely;
    
    dibujarM();
    dibujarZ();
    dibujarP();
    dibujarT();
    if (obstaculosH.length != 0) {
        dibujarO();
        i = 0;
    }
    dibujarZ();
    dibujarP();
    dibujarR();
    dibujarT();
    dibujarJ();
    dibujarL();

    //Movimiento del jugador

    //colisionM();

    if((ladron.x < (zona + ancho)) || (ladron.x > (campo.width - 2*zona - borde - ancho))){
        ladron.velx = -ladron.velx;
    }

    if(ladron.y <  ancho|| (ladron.y > (campo.height - ancho))){
        ladron.vely = -ladron.vely;
    }

    //Moneda de mierda

    //Movimiento de los obstáculos
    
    //Colisiones con bordes

    //Colisiones con obstáculos
    }
    

//Funciones//

function obst (posJugadorX, posJugadorY) {
    //Funcion para crear los obstáculos
    this.obsX = posJugadorX;
    this.obsY = posJugadorY;
}

/*DIBUJAR*/

//Jugador
function dibujarJ(){
    jugador.img.src = '../img/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    canvas.style.cursor = "none";
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

function dibujarL(){
    ladron.img.src = '../img/ladron.png';
    ctx.drawImage(ladron.img, ladron.x, ladron.y, ancho, ancho);
}

//Obstáculos
function dibujarO(){
    //Funcion para dibujar los obstáculos
    for(var i = 0; i < obstaculosH.length; i++) {
        ctx.drawImage(obsAbuela, obstaculosH[i].obsX + 70, obstaculosH[i].obsY, 3*ancho, 2*ancho);
        //3 niveles, 3 velocidades distintas? con case o if se hace
        if(nivel ==1){
            obstaculosH[i].obsX -= 3;
        }else if(nivel == 2){
            obstaculosH[i].obsX -= 5;
        }else if(nivel == 3){
            obstaculosH[i].obsX -= 4;
            ctx.drawImage(obsAbuela, obstaculosH[i].obsY + zona, obstaculosH[i].obsX, 3*ancho, 2*ancho);
        }else if(nivel == 4){
            obstaculosH[i].obsX -= 5.5;
            ctx.drawImage(obsAbuela, obstaculosH[i].obsY + zona, obstaculosH[i].obsX, 3*ancho, 2*ancho);
        }
        if(obstaculosH[i].obsX < 0) {
            obstaculosH.splice(i,1);
        }
    }
}

function creaObstaculo (){
    var obstA = new obst (obsX, obsY);
    obsAbuela.src = '../img/abuela1.png';
    obstA.obsX = campo.width - 300;
    obstA.obsY = Math.floor(Math.random() * (campo.height-50));
    obstaculosH.push(obstA);
}

//Zona de seguridad
function dibujarZ(){
    zonaS.img.src = "../img/barranym.png";
    ctx.drawImage(zonaS.img,zonaS.x,zonaS.y,100,campo.height);

}

//Torno de metro
function dibujarP(){
    torno.img.src = '../img/torno1.jpg';
    ctx.drawImage(torno.img, torno.x, torno.y, ancho, campo.height);
}

//Tren
function dibujarT(){
    tren.img.src = '../img/trenes1.png';
    ctx.drawImage(tren.img, tren.x, tren.y, campo.width - 850, campo.height);
}

function dibujarL(){
    ladron.img.src = '../img/ladron.png';
    ctx.drawImage(ladron.img, ladron.x, ladron.y, ancho, ancho);
} 
    

function dibujarR(){
    rail.img.src = '../img/tracks.png';
    ctx.drawImage(rail.img, rail.x, rail.y, campo.width - 700, campo.height);
}

/*COLISIONES*/

//Jugador

function colisionL(x, y){
    if((x < (ladron.x + ancho)) && (x > (ladron.x - borde))){
        if((y < (ladron.y + ancho)) && (y > (ladron.y - borde))){
            if(nmonedas > 0){
                nmonedas--;
            }
        }
    }
}

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
            nmonedas++;
            aleatoriaM();
        }
    }

    if(nmonedas > 9){
    niveles(nmonedas);
    }
    document.getElementById("monedas").innerHTML = nmonedas;
}

function colisionL(x, y){
    if((x < (ladron.x + ancho)) && (x > (ladron.x - borde))){
        if((y < (ladron.y + ancho)) && (y > (ladron.y - borde))){
            if(nmonedas > 0){
                nmonedas--;
            }
        }
    }
}

//Tren
function colisionT(x){
    if(jugador.bono){
        if(x > (campo.width - 80)){
            window.location.href = 'hasGanado.html';
        }
    }
   
}

//Abuelas
function colisionAbuela(x,y){
    for(i = 0; i < obstaculosH.length;i++){
        if(x > (obstaculosH[i].obsX)){
            if((y> obstaculosH[i].obsY) && y < (obstaculosH[i].obsY + borde)){
                obstaculosH.splice(i,1);
                tiempo++;
            }
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

function abrirP(){
    //Borrar tornos
}

function paralizarJ(x, y){
    // 
}

function aleatoriaM(){
    moneda.x = nAleatorio(zona + borde, campo.width - 2*zona - 2*borde);

    moneda.y = nAleatorio(borde, campo.height - borde);
}


//Nombre del formulario

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

//Movimiento jugador

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
        colisionL(ratonX, ratonY);
        colisionT(ratonX);
        colisionAbuela(ratonX,ratonY);
        colisionL(ratonX, ratonY);
    }
   

    
}

//Funciones auxiliares

function nAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function clear(){
    ctx.clearRect(0, 0, campo.width, campo.height);
}

function esperar(mili) {
    return new Promise(resolve => setTimeout(resolve, mili));
}


//Contador

function contar(){
    
    tiempo++;
    document.getElementById("contador1").innerHTML = String(tiempo);
    if(tiempo>0){
        setTimeout(contar,1000);
    }

    if((tiempo == 15) && (nmonedas <10)){
        window.location.href = "gameOver.html";
    }else if((tiempo == 30) && (nmonedas <20)){
        window.location.href = "gameOver.html";
    }else if((tiempo == 45) && (nmonedas <30)){
        window.location.href = "gameOver.html";
    }else if(tiempo == 60){
        window.location.href = "gameOver.html";
    }   
      
}



//JQUIRE

$(document).ready(function(){

var resultado=$('#resultado');

    $('.button').click(function(){
        $('.caja').animate({right:'100px',
                            opacity:'0.5',
                            height:'0', // se agranda 150 px
                            weight:'0'
                            },'2000');
    });


});