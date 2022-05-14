import { Box, Flex, Link as LinkChakraUI } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';
import { TiHome } from 'react-icons/ti';
import { IoIosKey, IoMdSettings } from 'react-icons/io';
import { GoCommentDiscussion } from 'react-icons/go';

const Navbar = () => {
	const user = { name: 'Fernando' };
	const userInfo = { role: 'ADMIN' };
	const { pathname } = useLocation();

	return (
		<Box>
			<Box
				position='fixed'
				bottom='0'
				width='100%'
				height='80px'
				background='linear-gradient(180deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.97) 75%)'
				zIndex='1'
			></Box>

			<Box
				height='60px'
				backgroundColor='white'
				width='calc(100% - 40px)'
				maxWidth='480px'
				left='50%'
				transform='translate(-50%, 0)'
				position='fixed'
				bottom='20px'
				rounded='5px 5px 0 0'
				zIndex='50'
				border='1px solid #F0F0F0'
				borderBottom='4px solid #F0F0F0'
			>
				<Flex
					alignItems='center'
					height='full'
					padding='0 30px'
					justifyContent='space-between'
				>
					<LinkChakraUI
						as={Link}
						to='/'
						fontSize='26px'
						color={pathname === '/' ? '#3E3E3E' : '#E5E5E5'}
					>
						<TiHome />
					</LinkChakraUI>
					<LinkChakraUI
						as={Link}
						to='/search'
						fontSize='26px'
						color={pathname === '/search' ? '#3E3E3E' : '#E5E5E5'}
					>
						<FiSearch />
					</LinkChakraUI>
					{userInfo.role === 'ADMIN' && (
						<LinkChakraUI
							as={Link}
							to='/admin'
							fontSize='26px'
							color={pathname === '/admin' ? '#3E3E3E' : '#E5E5E5'}
						>
							<IoIosKey />
						</LinkChakraUI>
					)}
					<LinkChakraUI
						as={Link}
						to='/posts'
						fontSize='26px'
						color={pathname === '/posts' ? '#3E3E3E' : '#E5E5E5'}
					>
						<GoCommentDiscussion />
					</LinkChakraUI>
					{user && (
						<LinkChakraUI
							as={Link}
							to='/settings'
							fontSize='26px'
							color={pathname === '/settings' ? '#3E3E3E' : '#E5E5E5'}
						>
							<IoMdSettings />
						</LinkChakraUI>
					)}
				</Flex>
			</Box>
		</Box>
	);
};

export default Navbar;
