import { Box } from '@chakra-ui/react';
import GoBack from '../components/GoBack';

const Product: React.FC = () => {
	return (
		<Box padding='20px'>
			<GoBack title='Producto' href='/' />
		</Box>
	);
};

export default Product;
