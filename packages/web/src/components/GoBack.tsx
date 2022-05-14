import { Button, Flex, Text } from '@chakra-ui/react';
import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type GoBackProps = {
	title: string;
	href: string;
};

const GoBack: React.FC<GoBackProps> = ({ title, href }) => {
	const navigate = useNavigate();

	return (
		<Flex alignItems={`center`}>
			<Button
				minWidth='initial'
				width='45px'
				height='45px'
				backgroundColor='#F5F5F5'
				color='#3E3E3E'
				rounded='3px 3px 0 0'
				border='1px solid #3E3E3E'
				borderBottom='4px solid #3E3E3E'
				fontSize='22px'
				_focus={{ border: 0 }}
				onClick={() => navigate(href)}
			>
				<FaAngleLeft />
			</Button>
			<Flex
				alignItems='center'
				justifyContent='space-between'
				width='100%'
				marginLeft={'15px'}
			>
				<Text fontWeight='bold' color='#3E3E3E' textTransform='uppercase'>
					{title || ''}
				</Text>
			</Flex>
		</Flex>
	);
};

export default GoBack;
