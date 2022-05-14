import { useQuery } from 'react-query';
import { Box, Grid } from '@chakra-ui/react';

import Layout from '../layout';
import { getProducts } from '../utils/product';
import Product from '../components/Product';
import { ProductType } from '../types';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
	const { data, status } = useQuery('products', getProducts);

	if (status === 'loading') return <Box>Cargando..</Box>;
	if (status === 'error') return <Box>Error</Box>;

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
