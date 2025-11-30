import { pedirCarta } from './pedir-carta.js';
import { valorCarta } from './valor-carta.js';

export const turnoDealer = (puntuacionJugador, baraja, actualizarUIDealer) => {
    let puntuacionDealer = 0;
    const puntosMinimos = puntuacionJugador;
    do {
        const carta = pedirCarta(baraja);
        puntuacionDealer += valorCarta(carta);
        actualizarUIDealer(carta, puntuacionDealer);
        if (puntosMinimos > 21) {
            break;
        }
    } while (puntuacionDealer < puntosMinimos && puntuacionDealer <= 21);
    return puntuacionDealer;
};