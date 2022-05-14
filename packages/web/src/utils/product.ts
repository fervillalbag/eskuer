export const getProducts = async () => {
	try {
		const response = await fetch('https://rickandmortyapi.com/api/character');
		const products = await response.json();
		return products.results;
	} catch (error) {
		console.log(error);
	}
};
