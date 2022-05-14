import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';

import App from './App';

const colors = {
	brand: {
		900: '#1a365d',
		800: '#153e75',
		700: '#2a69ac',
	},
};

const theme = extendTheme({
	colors,
	fonts: {
		body: '"Poppins", sans-serif',
	},
});

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
	<ChakraProvider theme={theme}>
		<App />
	</ChakraProvider>
);
