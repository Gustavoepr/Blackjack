
export const crearBaraja = (tipos, especiales) => {
		const baraja = [];
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
		return baraja;
	};

	// Función para barajar (modifica el array que recibe)
	export const barajar = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			// índice aleatorio entre 0 e i
			const j = Math.floor(Math.random() * (i + 1));
			// intercambio de posiciones
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	};