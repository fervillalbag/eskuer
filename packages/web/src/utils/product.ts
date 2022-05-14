export const getProducts = async () => {
	try {
		const URL_API = import.meta.env.VITE_API_URL;
		const response = await fetch(`${URL_API}/product`);
		const products = await response.json();

		return products;
	} catch (error) {
		console.log(error);
	}
};
