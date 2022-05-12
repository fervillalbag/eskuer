import { Flex, Box, Text, Image } from '@chakra-ui/react';

function App() {
	return (
		<Flex alignItems={`center`} justifyContent={`center`} height={`100vh`} width={`100vw`} flexDirection={`column`}>
			<Text fontSize={`32px`} fontWeight={`bold`} textTransform={`uppercase`}>Error</Text>
			<Text fontSize={`32px`}>4😭4</Text>
			<Text fontSize={`18px`} marginTop={`10px`}>La app este mes:</Text>

			<Box marginTop={`10px`}>
				<Image width={200} src="/meme.jpeg" />
			</Box>
		</Flex>
	);
}

export default App;
