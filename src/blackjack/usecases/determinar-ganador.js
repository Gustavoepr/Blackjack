import Swal from 'sweetalert2'

export const mensajeVictoria = (juego, ui) => {
        const mensaje = {
            win: { title: 'Ganaste', text: 'Buenisimo, felicitaciones' },
            lose: { title: 'Perdiste', text: 'Lo siento, intentalo de nuevo' },
            draw: { title: 'Empate', text: 'Empate, intentalo de nuevo' },
        };
        if (juego.puntuacionJugador > 21) {
            showAlert(mensaje.lose.title, mensaje.lose.text, false, ui);
        } else if (juego.puntuacionDealer > 21) {
            showAlert(mensaje.win.title, mensaje.win.text, true, ui);
        } else if (juego.puntuacionJugador > juego.puntuacionDealer && 	juego.puntuacionJugador <= 21) {
            showAlert(mensaje.win.title, mensaje.win.text, true, ui);
        } else if (juego.puntuacionJugador < juego.puntuacionDealer && 	juego.puntuacionDealer <= 21) {
            showAlert(mensaje.lose.title, mensaje.lose.text, false, ui);
        } else {
            showAlert(mensaje.draw.title, mensaje.draw.text, false, ui);
        }
    };

    const showAlert = (titulo, texto, win, ui) => {
        Swal.fire({
            title: titulo,
            text: texto,
            icon: win ? 'success' : 'error',
            confirmButtonText: 'Nuevo juego',
            html:
                win
                    ? '<dotlottie-wc src="https://lottie.host/ff00e045-21d1-4e11-bf80-e2fca2f535f7/h0FycrSDwX.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>'
                    : '<dotlottie-wc src="https://lottie.host/42911cee-aa15-4865-bf59-3fdbdd85a496/x4t5wkyZHk.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>',
        }).then((result) => {
            if (result.isConfirmed) {
                ui.btnNuevo.click();
            }
        });
    };