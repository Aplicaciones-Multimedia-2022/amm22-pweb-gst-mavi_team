function navegacion(evento, boton){
    let i, b_contenido, b_enlace;

    b_contenido = document.getElementsByClassName("b_contenido");
    for(i = 0; i < b_contenido.length; i++){
        b_contenido[i].style.display="none";
    }

    b_enlace = document.getElementsByClassName("b_enlace");
    for(i = 0; i < b_enlace.length; i++){
        b_enlace[i].className = b_enlace[i].className.replace(" active", "");
    }

    document.getElementById(boton).style.display = "block";
    evento.currentTarget.className += " active";
}