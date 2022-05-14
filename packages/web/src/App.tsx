import MainRoute from './routes/MainRoute';
import { QueryClientProvider, QueryClient } from 'react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MainRoute />
		</QueryClientProvider>
	);
}

export default App;
