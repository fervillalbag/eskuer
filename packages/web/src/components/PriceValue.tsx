import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { PriceType } from '../types/price';
import { getMarket } from '../utils/market';

type PriceValueProps = {
	price: PriceType;
};

const PriceValue: React.FC<PriceValueProps> = ({ price }) => {
	const {
		data: dataMarket,
		isLoading: isLoadingMarket,
		isSuccess: isSuccessMarket,
	} = useQuery('market', () => getMarket(price?.idMarket as string));

	if (isLoadingMarket && !isSuccessMarket) return <div>cargando..</div>;
	const market = dataMarket.market;

	return (
		<Box
			borderBottom={`1px solid #d9d9d9`}
			paddingBottom={`10px`}
			marginBottom={`10px`}
		>
			<Text
				marginBottom={`5px`}
				color={`#3E3E3E`}
				fontWeight={`semibold`}
				textTransform={`uppercase`}
			>
				{market.name}
			</Text>
			<Grid
				gridTemplateColumns={`40px 1fr 100px`}
				gap={`10px`}
				alignItems={`center`}
			>
				<Box width={`100%`} height={`40px`}>
					<Image src={market.image} width={`100%`} height={`100%`} />
				</Box>
				<Box>
					<Text
						fontSize={`14px`}
						fontWeight={`semibold`}
						textTransform={`uppercase`}
						color={`#3E3E3E`}
					>
						hace 3 días
					</Text>
					<Flex>
						<Text
							color={`#3E3E3E`}
							fontSize={`12px`}
							textTransform={`uppercase`}
						>
							Sucursal:
						</Text>
						<Text
							color={`#3E3E3E`}
							fontSize={`12px`}
							marginLeft={`3px`}
							textTransform={`uppercase`}
						>
							{market.branch_office}
						</Text>
					</Flex>
				</Box>
				<Box>
					<Text fontWeight={`semibold`} fontSize={`14px`} color={`#3E3E3E`}>
						Gs. {price.value}/kg
					</Text>
				</Box>
			</Grid>
			<Text
				marginTop={`7px`}
				color={`#3E3E3E`}
				textTransform={`uppercase`}
				fontSize={`14px`}
			>
				{market.address}, {market.city}
			</Text>
		</Box>
	);
};

export default PriceValue;
