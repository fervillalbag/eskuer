import { useQuery } from 'react-query';
import { Box, Grid } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import Layout from '../layout';
import Product from '../components/Product';
import { getProducts } from '../utils/product';
import { ProductType } from '../types';

const Home: React.FC = () => {
	const { data, isError, isLoading } = useQuery('products', getProducts);

	if (isLoading) return <Box>Cargando..</Box>;
	if (isError) return <Box>Error</Box>;

	return (
		<Layout>
			<Box padding='20px'>
				<Grid gridTemplateColumns={`repeat(2, 1fr)`} gap={`15px`}>
					{data.products.map((product: ProductType) => (
						<Link to={`/product/${product._id}`} key={product._id}>
							<Product product={product} />
						</Link>
					))}
				</Grid>
			</Box>
		</Layout>
	);
};

export default Home;
