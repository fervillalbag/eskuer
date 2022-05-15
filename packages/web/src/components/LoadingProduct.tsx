import { Box, Flex } from '@chakra-ui/react';
import LoadingPrice from './LoadingPrice';

const LoadingProduct: React.FC = () => {
	return (
		<Box padding={`20px`}>
			<Flex alignItems={`center`}>
				<Box width={`45px`} height={`45px`} bgColor={`#dbdbdb`}></Box>
				<Box
					width={`200px`}
					height={`20px`}
					bgColor={`#dbdbdb`}
					marginLeft={`10px`}
				></Box>
			</Flex>

			<Box marginTop={`20px`}>
				<Box width={`200px`} height={`150px`} bgColor={`#dbdbdb`}></Box>
			</Box>

			<Box marginTop={`20px`}>
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
				<LoadingPrice />
			</Box>
		</Box>
	);
};

export default LoadingProduct;
