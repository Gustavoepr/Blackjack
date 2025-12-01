import { pedirCarta } from '../domain/pedir-carta.js';
import { valorCarta } from '../usecases/valor-carta.js';

export const turnoDealer = (puntuacionJugador, baraja, puntuacionDealer, actualizarUIDealer) => {
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