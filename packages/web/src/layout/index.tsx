import { Box } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

type LayoutProps = {
	children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box maxW={`480px`} margin={`0 auto`}>
			<Box>{children}</Box>
			<Navbar />
		</Box>
	);
};

export default Layout;
