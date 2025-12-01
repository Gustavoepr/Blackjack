import { crearBaraja, barajar } from "./crear-baraja.js";

export const iniciarNuevoJuego = (juego, ui, limpiarMesa) => {
    const baraja = crearBaraja(juego.tipos, juego.especiales);
		juego.baraja = barajar(baraja);
		juego.puntuacionJugador = 0;
		juego.puntuacionDealer = 0;
		limpiarMesa();
		ui.btnPedir.disabled = false;
		ui.btnPlantarse.disabled = false;
	};