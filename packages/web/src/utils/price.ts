export const getPrices = async () => {
	try {
		const URL_API =
			import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;
		const response = await fetch(`${URL_API}/price`);
		return await response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};
