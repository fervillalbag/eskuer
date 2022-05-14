import { useQuery } from 'react-query';
import { Box } from '@chakra-ui/react';

import Layout from '../layout';
import { getProducts } from '../utils/product';

const Home: React.FC = () => {
	const { data, status } = useQuery('products', getProducts);

	if (status === 'loading') {
		return <Box>Cargando..</Box>;
	}

	if (status === 'error') {
		return <Box>Error</Box>;
	}

	console.log(data);

	return <Layout>Home</Layout>;
};

export default Home;
