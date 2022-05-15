import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Grid
			placeItems={`center`}
			position={`fixed`}
			top={`0`}
			left={`0`}
			bgColor={`#fff`}
			width={`100vw`}
			height={`100vh`}
		>
			<Box>
				<Text marginBottom={`10px`}>Página no encontrada</Text>
				<Button
					display={`block`}
					width={`100%`}
					height={`50px`}
					justifyContent='center'
					alignItems='center'
					backgroundColor={`#fff`}
					padding='0 20px'
					rounded='3px 3px 0 0'
					textTransform='capitalize'
					border='1px solid'
					borderBottom='4px solid'
					borderColor={`1px solid #3E3E3E`}
					_focus={{ shadow: 0 }}
					onClick={() => navigate('/')}
				>
					<Text fontSize={`16px`} color={`#3E3E3E`} fontWeight={`semibold`}>
						Volver al inicio
					</Text>
				</Button>
			</Box>
		</Grid>
	);
};

export default ErrorPage;
