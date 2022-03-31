//Constantes//

const borde = 50;
const zona = 100;


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
    x: nAleatorio(zona + borde, campo.width - 2*zona - borde),
    y: nAleatorio(borde, campo.height - borde),
    img: new Image()
};


//Main//

function main(){
    requestAnimationFrame();
    clear();

    //Dibujar
    dibujarJ();
    dibujarM();
    dibujarO();
    //dibujarZ();
    //dibujarP();
    //dibujarT();

    //Movimiento del jugador

    if(jugador.x == moneda.x && jugador.y == moneda.y){
        jugador.monedas++;
        ctx.clearRect(moneda.x, moneda.y, borde, borde);

        if(jugador.monedas == 3){
            jugador.bono = true;

        }else{
            moneda.x = nAleatorio(zona + borde, campo.width - 2*zona - borde);
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
    ctx.drawImage(jugador.img, zona/2, campo.height/2, borde, borde);

    canvas.style.cursor = "none";
    document.body.insertBefore(canvas, document.body.childNodes[0]);
    window.addEventListener('mousemove', function(e){jugador.x = e.pageX; jugador.y = e.pageY;});
}

function dibujarM(){
    moneda.img.src = 'imagen/moneda.png';
    ctx.drawImage(moneda.img, moneda.x, moneda.y, borde, borde);
}

function dibujarO(){
    ctx.beginPath();
    ctx.rect(zona, 0, borde, campo.height);
    ctx.rect(campo.width - zona - borde, 0, 2*borde, campo.height);
    ctx.rect(campo.width - borde, 0, borde, campo.height);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function dibujarZ(){
    //dibujar zona de seguridad
}

function dibujarP(){
    //dibujar tornos
}

function dibujarT(){
    //dibujar tren
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

window.addEventListener('mousemove', function(e){jugador.x = e.pageX; jugador.y = e.pageY;});
//Funciones auxiliares

function nAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function clear(){
    ctx.clearRect(0, 0, campo.width, campo.height);
}









