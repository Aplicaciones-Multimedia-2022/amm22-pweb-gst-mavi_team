//Constantes//

const borde = 20;


//Variables//

document.getElementById("nombre").innerHTML = getNombre('username');

var canvas = document.getElementById('campo');
var ctx = canvas.getContext('2d');
var nivel = 1;

//Objetos//

var jugador = {
    x: borde,
    y: campo.height/2,
    img: new Image,
    monedas: 0,
    bono: false
};

var moneda = {
    x: nAleatorio(100 + borde, campo.width - 200 - borde),
    y: nAleatorio(borde, campo.height - borde),
    img: new Image()
};


//Main//

function main(){
    requestAnimationFrame(main);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //Dibujar obstáculos
    
    dibujarJ();
    dibujarM();
    dibujarO();

    //Movimiento del jugador

    if(jugador.x == moneda.x && jugador.y == moneda.y){
        jugador.monedas++;
        ctx.clearRect(moneda.x, moneda.y, borde, borde);

        if(jugador.monedas == 3){
            jugador.bono = true;

        }else{
            moneda.x = nAleatorio(100 + borde, campo.width - 200 - borde);
            moneda.y = nAleatorio(borde, campo.height - borde);
            ctx.drawImage(image, moneda.x, moneda.y, borde, borde);
        }
    }

    //Movimiento de los obstáculos

    //Colisiones con bordes

    //Colisiones con obstáculos
}

//Funciones//

//Dibujar

function dibujarJ(){
    jugador.img.src = 'imagen/icono.png';
    ctx.drawImage(jugador.img, jugador.x, jugador.y, 60, 60);
}

function dibujarM(){
    moneda.img.src = 'imagen/moneda.png';
    ctx.drawImage(moneda.img, moneda.x, moneda.y, 50, 50);
    //hola maga
}

function dibujarO(){
    //maga
}

//Navegacion botones
function navegar(evento, eleccion){
    let i, contenido, enlace;

    contenido = document.getElementsByClassName("contenido");
    for(i = 0; i < contenido.length; i++){
        contenido[i].style.display="none";
    }

    enlace = document.getElementsByClassName("nav");
    for(i = 0; i < enlace.length; i++){
        enlace[i].className = enlace[i].className.replace(" active", "");
    }

    document.getElementById(eleccion).style.display = "block";
    evento.currentTarget.className += " active";
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
    //
}


//Funciones auxiliares
function nAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}









