//Constantes//

const borde = 25;
const ancho = 50;
const zona = 100;


//Variables//

document.getElementById("nombre").innerHTML = getNombre('username');

var canvas = document.getElementById('campo');
var ctx = canvas.getContext('2d');
var nivel = 1;

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
    y: nAleatorio(borde, campo.height - borde),
    img: new Image()
};

var contar = {
    segundos: 60,
    empezar: true
};


//Main//

function main(){
    clear();

    //Dibujar
    dibujarJ();
    dibujarM();
    dibujarO();
    dibujarZ();
    dibujarP();
    dibujarT();

    //Contador

    setInterval(function(){contador();}, 1000);
    //Movimiento del jugador

    if(jugador.x == moneda.x && jugador.y == moneda.y){
        jugador.monedas++;
        ctx.clearRect(moneda.x, moneda.y, borde, borde);

        if(jugador.monedas == 3){
            jugador.bono = true;

        }else{
            moneda.x = nAleatorio(zona + borde, campo.width - 2*zona - borde);
            moneda.y = nAleatorio(borde, campo.height - borde);
            ctx.drawImage(moneda.img, moneda.x, moneda.y, ancho, ancho);
        }
    }

    //Movimiento de los obstáculos

    //Colisiones con bordes

    //Colisiones con obstáculos

    setInterval(main, 10);
    
}

//Funciones//

//Dibujar

function dibujarJ(){
    jugador.img.src = 'imagen/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, ancho, ancho);
    canvas.style.cursor = "none";
}

function dibujarM(){
    moneda.img.src = 'imagen/moneda.png';
    ctx.drawImage(moneda.img, moneda.x, moneda.y, ancho, ancho);
}

function dibujarO(){
    //Maga
}

function dibujarZ(){
    ctx.beginPath();
    ctx.rect(zona, 0, borde, campo.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
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

function nuevaM(){
    //Borrar moneda y jugador.moneda++
    //Si tiene 3 monedas => bono = true (se abren tornos)
    //Else: nAleatorio para moneda.x e y moneda.y y representarla
}

function abrirP(){
    //Borrar tornos
}

function contador(){
    //

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









