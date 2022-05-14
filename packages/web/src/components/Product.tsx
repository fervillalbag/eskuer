import { Box, Image, Text } from '@chakra-ui/react';
import { ProductType } from '../types';

type ProductProps = {
	product: ProductType;
};

const Product: React.FC<ProductProps> = ({ product }) => {
	return (
		<Box>
			<Box position={`relative`}>
				<Image src={product.image} />

				<Box
					position={`absolute`}
					bottom={`5px`}
					left={`5px`}
					backgroundColor={`#588157`}
					padding={`3px 10px`}
				>
					<Text
						fontSize={`10px`}
						color={`#fff`}
						fontWeight={`bold`}
						textTransform={`capitalize`}
					>
						{product.category}
					</Text>
				</Box>
			</Box>
			<Box marginTop={`3px`}>
				<Text
					// fontSize={`18px`}
					fontWeight={`500`}
					color={`#6c757d`}
					textTransform={`uppercase`}
				>
					{product.name}
				</Text>
			</Box>
		</Box>
	);
};

export default Product;
