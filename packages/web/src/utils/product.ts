export const getProducts = async () => {
	try {
		const URL_API =
			import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;
		const response = await fetch(`${URL_API}/product`);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};

export const getProduct = async (id: string) => {
	try {
		const URL_API =
			import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;
		const response = await fetch(`${URL_API}/product/${id}`);
		return await response.json();
	} catch (error) {
		console.log(error);
	}
};
