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
    
    dibujarJ(0, 0);
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

function dibujarJ(ratonx, ratony){
    jugador.img.src = 'imagen/icono.png';
    jugador.img.crossOrigin = 'anonymous';
    ctx.clearRect(0, 0, campo.width, campo.height);
    ctx.drawImage(jugador.img, ratonx - borde, ratony - borde, borde*2, borde*2);

    if(ratonx < borde || ratony < borde || ratonx > campo.width - borde - 150 || ratony > campo.height - borde) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.3)'; // 30% opacity red
        ctx.fillRect(ratonx - borde, ratony - borde, borde*2, borde*2); // Draw this over top of your image
    }
}

function dibujarM(){
    moneda.img.src = 'imagen/moneda.png';
    ctx.drawImage(moneda.img, moneda.x, moneda.y, 50, 50);
}

function dibujarO(){
    ctx.beginPath();
    ctx.rect(100, 0, borde, campo.height);
    ctx.rect(campo.width - 150, 0, 2*borde, campo.height);
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

canvas.addEventListener('mousemove', function(e) {
    dibujarJ(e.pageX, e.pageY);
}, false);


//Funciones auxiliares
function nAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}









