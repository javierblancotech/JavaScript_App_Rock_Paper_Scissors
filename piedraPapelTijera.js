var posibilidades = ["piedra", "papel", "tijera"];

// Configuración de la aplicación: Botones

document.getElementsByTagName("button")[0].addEventListener("click", introducirUsuario, false);
document.getElementsByTagName("button")[1].addEventListener("click", generarTirada, false);
document.getElementsByTagName("button")[2].addEventListener("click", resetear, false);


// Configuración de la aplicación: Opciones del jugador

var opciones = document.getElementsByTagName("img");
for (var i = 0; i < opciones.length-1; i++) {
	opciones[i].id = posibilidades[i];
	opciones[i].src = crearRutaImagen(posibilidades[i], "Jugador");
	opciones[i].addEventListener("click", seleccionaTiradaJugador, false);
}


// Comienzo de la partida

var nombre = "";

function comprobarNombre(nombreAComprobar) {
	if ((nombreAComprobar.length > 3) && (isNaN(nombreAComprobar[0]))) {
		return true;
	} else {
		return false;
	}
}

function introducirUsuario() {
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];
	if (!comprobarNombre(nombreIntroducido.value)) {
		nombreIntroducido.classList.add("fondoRojo");
	} else if (partidas.value <= 0) {
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.add("fondoRojo");
	} else {
		nombreIntroducido.classList.remove("fondoRojo");
		partidas.classList.remove("fondoRojo");
		nombre = nombreIntroducido.value;
		total.innerHTML = partidas.value;
		nombreIntroducido.disabled = true;
		partidas.disabled = true;
	}
}


// Elección y tirada

var maquina = document.getElementsByTagName("img")[document.getElementsByTagName("img").length-1];

function valorAleatorio(listaPosibilidades) {
	let aleatorio = Math.floor(Math.random() * listaPosibilidades.length);
	return listaPosibilidades[aleatorio] ;
}

function crearRutaImagen(valor, tipo) {
	return "img/" + valor + tipo + ".png";
}

function generarTirada() {
	if (actual.innerHTML < total.innerHTML) {
		tiradaMaquina = valorAleatorio(posibilidades);
		maquina.src = crearRutaImagen(tiradaMaquina, "Ordenador");
		maquina.id = tiradaMaquina;
		actual.innerHTML = Number(actual.innerHTML) + 1;
		calcularResultado(tiradaMaquina);
	}
}

function seleccionaTiradaJugador(e) {
	e.target.classList.add("seleccionado");
	e.target.classList.remove("noSeleccionado");
	// Cambiamos la apariencia al resto de elementos que no sean el que hemos pulsado.
	for (var j = 0; j < opciones.length-1; j++) {
		if (opciones[j] != e.target) {
			opciones[j].classList.remove("seleccionado");
			opciones[j].classList.add("noSeleccionado");
		}
	}
}

// Historial de partidas

function calcularResultado(tirada) {
	for (var i = 0; i < opciones.length-1; i++) {
		if (opciones[i].classList == "seleccionado") {
			var seleccionado = opciones[i].id;
		}
	}

	if ((posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)-1) || ((posibilidades.indexOf(maquina.id) == posibilidades.length-1) && (posibilidades.indexOf(seleccionado) == 0))) {
		historial.innerHTML += "<li>Gana " + nombre +"</li>\n";
	} else if (posibilidades.indexOf(maquina.id) == posibilidades.indexOf(seleccionado)) {
		historial.innerHTML += "<li>Empate</li>\n";
	} else {
		historial.innerHTML += "<li>Gana la máquina</li>\n";
	}
}

function resetear() {
	let nombreIntroducido = document.getElementsByTagName("input")[0];
	let partidas = document.getElementsByTagName("input")[1];
	nombreIntroducido.disabled = false;
	partidas.disabled = false;
	partidas.value = 0;
	total.innerHTML = "0";
	actual.innerHTML = "0";
	for (var j = 0; j < opciones.length-1; j++) {
		opciones[j].classList.remove("seleccionado");
		opciones[j].classList.remove("noSeleccionado");
	}
	opciones[0].classList.add("seleccionado");
	opciones[opciones.length-1].src = crearRutaImagen("", "defecto");;
	historial.innerHTML += "<li>Nueva partida</li>\n";
}


