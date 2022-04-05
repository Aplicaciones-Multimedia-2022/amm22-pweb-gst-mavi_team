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


tiempo = 25;
tiempo2 = 20;
tiempo3 = 15;

//Objetos//

var jugador = {
    x: zona/2,
    y: campo.height/2,
    img: new Image,
    monedas: 0,
    bono: false
};

var moneda = {
    x: nAleatorio(zona + borde, campo.width - 2*zona - borde),
    y: nAleatorio(borde, campo.height - borde)
};

var zonaS = {
    x: 85,
    y: 0,
    img: new Image,
};

var posJugadorX, posJugadorY = 0;
var obsX,obsY;
var obsAbuela = new Image;
var obstaculosH = [];


//Main//

function main(){

    obsX = canvas.height;
    obsY = canvas.width;
    
    setInterval(dibujar, 10);
    setInterval(creaObstaculo, 1000);

    setTimeout(contar,1000);
    

}

function dibujar() {
    clear();

    //Dibujar
    dibujarJ();

    if (obstaculosH.length != 0) {
        dibujarO();
        i = 0;
    }

    dibujarZ();
    dibujarP();
    dibujarT();

    //Contador

    //Movimiento del jugador

    nuevaM(jugador.x, jugador.y);

    //Movimiento de los obstáculos
    //updateGameArea();
    // for (i = 0; i < obsAbuela; i += 1) {
    //     myObstacles.x += -1;
    //     myObstacles[i].update();
    // }
    // obsAbuela.x += -0.5;
    

    //Este for añade los obstaculos cada tanto


    //Colisiones con bordes

    //Colisiones con obstáculos

    
}

//Funciones//

function obst (posJugadorX, posJugadorY) {
    //Funcion para crear los obstáculos
    this.obsX = posJugadorX;
    this.obsY = posJugadorY;
}

//Dibujar

function dibujarJ(){
    jugador.img.src = '../img/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    canvas.style.cursor = "none";
}

function dibujarM(){
    ctx.beginPath();
    ctx.arc(moneda.x, moneda.y, borde/2, 0, 2 * Math.PI);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function dibujarO(){
    //Funcion para dibujar los obstáculos
    for(var i = 0; i < obstaculosH.length; i++) {
        ctx.drawImage(obsAbuela, obstaculosH[i].obsX + 120, obstaculosH[i].obsY + 40, ancho, ancho);
        //3 niveles, 3 velocidades distintas? con case o if se hace 
        obstaculosH[i].obsX -= 3;
        if(obstaculosH[i].obsX < 0) {
            obstaculosH.splice(i,1);
        }
        
        
    }
}

function creaObstaculo (){
    //Funcion para generar los obstaculos, como si fuesen los objetos
    var obstA = new obst (obsX, obsY);
    obsAbuela.src = '../img/abuela.png';
    obstA.obsX = campo.width;
    obstA.obsY = Math.floor(Math.random() * (campo.height-50));
    obstaculosH.push(obstA);
}

function dibujarZ(){
    zonaS.img.src = "../img/zona.jpeg";
    ctx.drawImage(zonaS.img,zonaS.x,zonaS.y,borde,campo.height);

}

function dibujarP(){
    ctx.beginPath();
    ctx.rect(campo.width - 2*zona - borde, 0, ancho, campo.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
    
}

function dibujarT(){
    ctx.beginPath();
    ctx.rect(campo.width - borde, 0, borde, campo.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function nuevaM(x, y){
    document.getElementById("monedas").innerHTML = jugador.monedas;

    if((jugador.x = x) && (jugador.y = y)){
        jugador.monedas++;
        ctx.clearRect(moneda.x, moneda.y, borde/2, borde/2);
        setTimeout('', 5000);
        moneda.x = nAleatorio(zona + borde/2, campo.width - 2*zona - borde/2);
        moneda.y = nAleatorio(borde/2, campo.height - borde/2);
        dibujarM();
    }

    if(jugador.monedas = 3){
        bono = true;
        document.getElementById("bono").innerHTML = "Recargado";
        ctx.clearRect(moneda.x, moneda.y, borde/2, borde/2);
    }
}

function abrirP(){
    //Borrar tornos
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

}
//Funciones auxiliares

function nAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function clear(){
    ctx.clearRect(0, 0, campo.width, campo.height);
}


//CONTADOR

function contar(){
    
    if(nivel ==1){
        tiempo--;
        document.getElementById("contador1").innerHTML = String(tiempo);
        if(tiempo>0){
            setTimeout(contar,1000);
        }
        if(tiempo==0){
          document.location.href = "gameOver.html";
        }

    }else if(nivel==2){
        tiempo2--;
        document.getElementById("contador1").innerHTML = String(tiempo2);
        if(tiempo2>0){
            setTimeout(contar,1000);
        }
        if(tiempo2==0){
            document.location.href = "gameOver.html";
        }

    }else if(nivel==3){
        tiempo3--;
        document.getElementById("contador1").innerHTML = String(tiempo3);
        if(tiempo3>0){
            setTimeout(contar,1000);
        }
        if(tiempo3==0){
            document.location.href = "gameOver.html";
        }
    }       
        
};




