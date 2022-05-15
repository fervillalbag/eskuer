import { Box, Grid } from '@chakra-ui/react';

const LoadingPrice: React.FC = () => {
	return (
		<Box marginBottom={`25px`}>
			<Box
				marginBottom={`5px`}
				width={`50%`}
				height={`14px`}
				bgColor={`#dbdbdb`}
			></Box>
			<Grid gridTemplateColumns={`40px 1fr 100px`} alignItems={`center`}>
				<Box width={`100%`} height={`40px`} bgColor={`#dbdbdb`}></Box>
				<Box marginLeft={`10px`}>
					<Box
						width={`150px`}
						height={`14px`}
						bgColor={`#dbdbdb`}
						marginBottom={`4px`}
					></Box>
					<Box width={`100px`} height={`14px`} bgColor={`#dbdbdb`}></Box>
				</Box>
				<Box>
					<Box
						width={`90%`}
						height={`20px`}
						bgColor={`#dbdbdb`}
						marginBottom={`4px`}
					></Box>
				</Box>
			</Grid>

			<Box
				marginTop={`7px`}
				width={`90%`}
				height={`14px`}
				bgColor={`#dbdbdb`}
			></Box>
		</Box>
	);
};

export default LoadingPrice;
