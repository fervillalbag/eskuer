import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import ErrorPage from '../pages/ErrorPage';

import Home from '../pages/Home';
import Posts from '../pages/Posts';
import Product from '../pages/Product';
import Search from '../pages/Search';
import Settings from '../pages/Settings';

const MainRoute: React.FC = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/search' element={<Search />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/posts' element={<Posts />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/product/:id' element={<Product />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoute;
