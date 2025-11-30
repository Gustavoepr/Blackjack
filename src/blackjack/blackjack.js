import Swal from 'sweetalert2'
import { crearBaraja, barajar, pedirCarta, valorCarta, turnoDealer } from './usecases/index.js';

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

	crearBaraja(juego.tipos, juego.especiales);
	barajar(juego.baraja);

	const limpiarMesa = () => {
		ui.divCartaJugador.innerHTML = '';
		ui.divCartaDealer.innerHTML = '';
		ui.puntos[0].textContent = 0;
		ui.puntos[1].textContent = 0;
	};

	const iniciarNuevoJuego = () => {
		juego.baraja = barajar(crearBaraja(juego.tipos, juego.especiales));
		juego.puntuacionJugador = 0;
		juego.puntuacionDealer = 0;
		limpiarMesa();
		ui.btnPedir.disabled = false;
		ui.btnPlantarse.disabled = false;
	};



	

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



	const mensajeVictoria = () => {
		const mensaje = {
			win: { title: 'Ganaste', text: 'Buenisimo, felicitaciones' },
			lose: { title: 'Perdiste', text: 'Lo siento, intentalo de nuevo' },
			draw: { title: 'Empate', text: 'Empate, intentalo de nuevo' },
		};
		if (juego.puntuacionDealer > 21) {
			showAlert(mensaje.win.title, mensaje.win.text, true);
		} else if (juego.puntuacionJugador > 21) {
			showAlert(mensaje.lose.title, mensaje.lose.text, false);
		} else if (juego.puntuacionJugador > juego.puntuacionDealer) {
			showAlert(mensaje.win.title, mensaje.win.text, true);
		} else if (juego.puntuacionJugador < juego.puntuacionDealer) {
			showAlert(mensaje.lose.title, mensaje.lose.text, false);
		} else {
			showAlert(mensaje.draw.title, mensaje.draw.text, false);
		}
	};

	const showAlert = (titulo, texto, win) => {
		Swal.fire({
			title: titulo,
			text: texto,
			icon: win ? 'success' : 'error',
			confirmButtonText: 'Nuevo juego',
			cancelButtonText: 'Cancelar',
			showCancelButton: true,
			html:
				win
					? '<dotlottie-wc src="https://lottie.host/ff00e045-21d1-4e11-bf80-e2fca2f535f7/h0FycrSDwX.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>'
					: '<dotlottie-wc src="https://lottie.host/42911cee-aa15-4865-bf59-3fdbdd85a496/x4t5wkyZHk.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>',
		}).then((result) => {
			if (result.isConfirmed) {
				ui.btnNuevo.click();
			} else if (result.isDismissed) {
				ui.btnNuevo.click();
			}
		});
	};

	const turnoJugador = () => {
		const carta = pedirCarta(juego.baraja);
		juego.puntuacionJugador += valorCarta(carta);
		actualizarUIJugador(carta);
		if (juego.puntuacionJugador > 21 || juego.puntuacionJugador === 21) {
			ui.btnPedir.disabled = true;
			ui.btnPlantarse.disabled = true;
			juego.puntosDealer = turnoDealer(juego.puntuacionJugador, juego.baraja, actualizarUIDealer);
			mensajeVictoria();
		}
	};

	// Eventos
	ui.btnNuevo.addEventListener('click', () => {
		iniciarNuevoJuego();
	});

	ui.btnPedir.addEventListener('click', () => {
		turnoJugador();
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
		juego.puntosDealer = turnoDealer(juego.puntuacionJugador, juego.baraja, actualizarUIDealer);
		mensajeVictoria();
	});

	// Estado inicial
	iniciarNuevoJuego();
};

main();