export const turnoJugador = (juego, ui, actualizarUIJugador, mensajeVictoria, turnoDealer,  pedirCarta, valorCarta) => {
    const carta = pedirCarta(juego.baraja);
    juego.puntuacionJugador += valorCarta(carta);
    actualizarUIJugador(carta);
    if (juego.puntuacionJugador > 21) {
        ui.btnPedir.disabled = true;
        ui.btnPlantarse.disabled = true;
        mensajeVictoria(juego, ui);
    } else if (juego.puntuacionJugador === 21) {
        ui.btnPedir.disabled = true;
        ui.btnPlantarse.disabled = true;
        juego.puntuacionDealer = turnoDealer(juego.puntuacionJugador, juego.baraja, juego.puntuacionDealer);
        mensajeVictoria(juego, ui);
    }
};