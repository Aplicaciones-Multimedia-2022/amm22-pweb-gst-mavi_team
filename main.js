//Constantes//


//Variables

//Main

//Navegacion
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

//Auxiliares

/*Canvas*/

function init(){
    var canvas = document.getElementById("campo");
    var ctx = canvas.getContext("2d");
}

