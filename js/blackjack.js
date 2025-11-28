let baraja = [];

let tipos = ['C', 'D', 'H', 'S'];
let especiales = ['A', 'J', 'Q', 'K'];


let puntosHTML = document.querySelectorAll('small');
let puntuacionJugador = 0;
let puntuacionDealer = 0;
let divCartaJugador = document.querySelector('#cartas-jugador');
let divCartaDealer = document.querySelector('#cartas-dealer');

const main = () => {
    for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
        baraja.push(i + tipo);
    }
}

for (let especial of especiales) {
    for (let tipo of tipos) {
        baraja.push(especial + tipo);
    }
}

// Función para barajar (modifica el array que recibe)
function barajar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        // índice aleatorio entre 0 e i
        const j = Math.floor(Math.random() * (i + 1));
        // intercambio de posiciones
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Si quieres barajar el mazo original:
barajar(baraja);


//Funcion para pedir una carta
const pedirCarta = () => {
    if (baraja.length === 0) {
        throw new Error('No hay más cartas en el mazo');
    }
    const carta = baraja.pop();    
    return carta;
}



const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);

    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}


//Funcion para el dealer
const dealer = (puntosMinimos) => {
    do {
        puntosMinimos = puntuacionJugador
        const carta = pedirCarta();
        const puntosDealer = puntosHTML[1].textContent = puntuacionDealer += valorCarta(carta);
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartaDealer.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }
    
    } while (puntuacionDealer < puntosMinimos && puntuacionDealer <= 21);
        
}


//referencias de html

const btnNuevo = document.querySelector('#btnNuevo');
const btnPedir = document.querySelector('#btnPedir');
const btnPlantarse = document.querySelector('#btnPlantarse');

btnNuevo.addEventListener('click', () =>{
    console.log('Nuevo Juego');
});


btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    const puntosJugador = puntosHTML[0].textContent = puntuacionJugador += valorCarta(carta);
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartaJugador.append(imgCarta);


    if (puntuacionJugador > 21) {
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
        dealer(puntuacionJugador);
        mensajeVisctoria();
    } else if (puntuacionJugador === 21) {
        console.log('21, Genial');
        btnPedir.disabled = true;
        btnPlantarse.disabled = true;
        mensajeVisctoria();
    }
});


btnPlantarse.addEventListener('click', ()=>{
    console.log(puntuacionJugador);
    if (puntuacionJugador === 0) {
        Swal.fire({
            title: 'Error',
            text: 'No puedes plantarte sin haber jugado',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    dealer(puntuacionJugador);
    btnPedir.disabled = true;
    btnPlantarse.disabled = true;
    mensajeVisctoria();
});



const mensajeVisctoria = () => {
    const mensaje = {
        'win' : {title: 'Ganaste', text: 'Buenisimo, felicitaciones'},
        'lose' : {title: 'Perdiste', text: 'Lo siento, intentalo de nuevo'},
        'draw' : {title: 'Empate', text: 'Empate, intentalo de nuevo'}
    };
    if (puntuacionDealer > 21 ) {
        showAlert(mensaje.win.title, mensaje.win.text, true);
    } else if (puntuacionJugador > 21) {
        showAlert(mensaje.lose.title, mensaje.lose.text, false);
    } else if (puntuacionJugador > puntuacionDealer){
        showAlert(mensaje.win.title, mensaje.win.text, true);
    } else if (puntuacionJugador < puntuacionDealer){
        showAlert(mensaje.lose.title, mensaje.lose.text, false);
    } else {
        showAlert(mensaje.draw.title, mensaje.draw.text, false);
    }
}

const showAlert = (titulo, texto, win) => {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: win ? 'success' : 'error',
        confirmButtonText: 'Nuevo juego',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        html: win ? '<dotlottie-wc src="https://lottie.host/ff00e045-21d1-4e11-bf80-e2fca2f535f7/h0FycrSDwX.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>' : 
        '<dotlottie-wc src="https://lottie.host/42911cee-aa15-4865-bf59-3fdbdd85a496/x4t5wkyZHk.lottie" style="width: 300px;height: 300px" autoplay loop></dotlottie-wc>',
    }).then((result) => {
        if (result.isConfirmed) {
            btnNuevo.click();
        } else if (result.isDismissed) {
            btnNuevo.click();
        }
    })
}
}

main();



