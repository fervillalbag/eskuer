export const getMarkets = async () => {
	try {
		const URL_API =
			import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;
		const response = await fetch(`${URL_API}/market`);
		return await response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getMarket = async (id: string) => {
	try {
		const URL_API =
			import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL_LOCAL;
		const response = await fetch(`${URL_API}/market/${id}`);
		return await response.json();
	} catch (error) {
		console.log(error);
		return null;
	}
};
