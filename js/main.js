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
var monedas = [];
var nmonedas = 0;

tiempo = 25;
tiempo2 = 20;
tiempo3 = 15;

//Objetos//

var jugador = {
    x: zona/2,
    y: campo.height/2,
    img: new Image,
    //monedas: 0,
    bono: false
};

var moneda = {
    x: nAleatorio(zona + borde, campo.width - 2*zona - borde),
    y: nAleatorio(borde, campo.height - borde),
    img: new Image
};

var tren = {
    x: 300,
    y: 0,
    img: new Image,
    tocaTren : false
};


// var obsAbuela = {
// };
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
    dibujarM();
    if (obstaculosH.length != 0) {
        dibujarO();
        i = 0;
    }
    dibujarZ();
    dibujarP();
    dibujarT();

    //Contador

    conta_abuela();

    //Movimiento del jugador

    //colisionM();

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

//Dibujar

function dibujarJ(){
    jugador.img.src = '../img/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    canvas.style.cursor = "none";
}

function dibujarM(){
    if(jugador.bono){
        moneda.img.src = null;
    }else{
        moneda.img.src = '../img/moneda.png';
    }
    ctx.drawImage(moneda.img, moneda.x, moneda.y, borde, borde)
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
    tren.img.src = 'imagen/tren.png';
    ctx.drawImage(tren.img, tren.x, tren.y, campo.width-800, campo.height);
}

function colisionJ(x){
    if(x > (campo.width - 2*zona - borde)){                //Colisionar borde
        jugador.x = campo.width - 2*zona - borde;
    }
}

function colisionM(x, y){
    
    if((x < (moneda.x + 2*borde)) && (x > (moneda.x - borde))){
        if((y < (moneda.y + 2*borde)) && (y > (moneda.y - borde))){
            nmonedas++;
            aleatoriaM();
        }
    }

    if(nmonedas > 2){
        jugador.bono = true;
        document.getElementById("bono").innerHTML = "Cargado";
    }
    document.getElementById("monedas").innerHTML = nmonedas;
}

function conta_abuela(){
    for(var i =0; i<obstaculosH.length;i++){
        if( jugador.x>obstaculosH[i].obsX){
            if (jugador.y > obstaculosH[i].obsY && jugador.y < obstaculosH[i].obsY + 25){
                obstaculosH.splice(i,1);
            }
        }
      

    }
}

function abrirP(){
    //Borrar tornos
}

function paralizarJ(x, y){
    // 
}

function aleatoriaM(){
    moneda.x = nAleatorio(zona + borde, campo.width - 2*zona - borde);
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

    colisionJ(ratonX);
    colisionM(ratonX, ratonY);
    
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




