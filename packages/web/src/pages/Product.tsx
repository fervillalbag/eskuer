import { Box, Image } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import GoBack from '../components/GoBack';
import LoadingProduct from '../components/LoadingProduct';
import PriceValue from '../components/PriceValue';
import { ProductType } from '../types';
import { PriceType } from '../types/price';
import { getPrices } from '../utils/price';
import { getProduct } from '../utils/product';

const Product: React.FC = () => {
	const params = useParams();
	console.log(params);

	const {
		data: dataProducts,
		isLoading: isLoadingProducts,
		isSuccess: isSuccessProducts,
		isFetching: isFetchingProducts,
	} = useQuery('product', () => getProduct(params?.id as string));

	const {
		data: dataPrices,
		isLoading: isLoadingPrices,
		isSuccess: isSuccessPrices,
		isFetching: isFetchingPrices,
	} = useQuery('prices', getPrices);

	if (isLoadingProducts && !isSuccessProducts) return <div>cargando..</div>;
	if (isLoadingPrices && !isSuccessPrices) return <div>cargando..</div>;

	const product: ProductType = dataProducts.product;
	const pricesFilter = dataPrices.prices.filter(
		(item: PriceType) => item.idProduct === params?.id
	);

	if (isFetchingProducts || isFetchingPrices) return <LoadingProduct />;

	return (
		<Box padding='20px'>
			<GoBack title={product.name} href='/' />

			<Box marginTop={`20px`}>
				<Image
					src={product.image}
					alt={product.name}
					height={`150px`}
					objectFit={`contain`}
				/>
			</Box>

			<Box marginTop={`20px`}>
				{pricesFilter.map((price: PriceType) => (
					<PriceValue key={price._id} price={price} />
				))}
			</Box>
		</Box>
	);
};

export default Product;
