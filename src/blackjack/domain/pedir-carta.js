// Función para pedir una carta
export const pedirCarta = (baraja) => {
	if (baraja.length === 0) {
		throw new Error('No hay más cartas en el mazo');
	}
	return baraja.pop();
};