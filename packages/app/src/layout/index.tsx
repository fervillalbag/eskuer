import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box>
			<Box>{children}</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
