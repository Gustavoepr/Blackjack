import Swal from 'sweetalert2'
import { crearBaraja, barajar, pedirCarta, valorCarta, turnoDealer, iniciarNuevoJuego, mensajeVictoria, turnoJugador } from './usecases/index.js';

export const main = () => {
	// Estado del juego
	const juego = {
		baraja: [],
		tipos: ['C', 'D', 'H', 'S'],
		especiales: ['A', 'J', 'Q', 'K'],
		puntuacionJugador: 0,
		puntuacionDealer: 0,
	};

	// Referencias de UI
	const ui = {
		puntos: document.querySelectorAll('small'),
		divCartaJugador: document.querySelector('#cartas-jugador'),
		divCartaDealer: document.querySelector('#cartas-dealer'),
		btnNuevo: document.querySelector('#btnNuevo'),
		btnPedir: document.querySelector('#btnPedir'),
		btnPlantarse: document.querySelector('#btnPlantarse'),
	};


	const limpiarMesa = () => {
		ui.divCartaJugador.innerHTML = '';
		ui.divCartaDealer.innerHTML = '';
		ui.puntos[0].textContent = 0;
		ui.puntos[1].textContent = 0;
	};


	crearBaraja(juego.tipos, juego.especiales);
	barajar(juego.baraja);
	iniciarNuevoJuego(juego, ui, limpiarMesa);

	const actualizarUIJugador = (carta) => {
		const imgCarta = document.createElement('img');
		imgCarta.src = `/public/assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		ui.divCartaJugador.append(imgCarta);
		ui.puntos[0].textContent = juego.puntuacionJugador;
	};

	const actualizarUIDealer = (carta, puntosDealer) => {
		const imgCarta = document.createElement('img');
		imgCarta.src = `/public/assets/cartas/${carta}.png`;
		imgCarta.classList.add('carta');
		ui.divCartaDealer.append(imgCarta);
		ui.puntos[1].textContent = puntosDealer;
	};


	// Eventos
	ui.btnNuevo.addEventListener('click', () => {
		iniciarNuevoJuego(juego, ui, limpiarMesa);
	});

	ui.btnPedir.addEventListener('click', () => {
		turnoJugador(juego, ui, actualizarUIJugador, mensajeVictoria, turnoDealer, pedirCarta, valorCarta, actualizarUIDealer);
	});

	ui.btnPlantarse.addEventListener('click', () => {
		if (juego.puntuacionJugador === 0) {
			Swal.fire({
				title: 'Error',
				text: 'No puedes plantarte sin haber jugado',
				icon: 'error',
				confirmButtonText: 'OK',
			});
			return;
		}
		ui.btnPedir.disabled = true;
		ui.btnPlantarse.disabled = true;
		juego.puntuacionDealer = turnoDealer(juego.puntuacionJugador, juego.baraja, juego.puntuacionDealer, actualizarUIDealer);
		mensajeVictoria(juego, ui);
	});

	// Estado inicial
	limpiarMesa();
};

main();