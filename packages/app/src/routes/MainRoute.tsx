import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';

import Home from '../pages/Home';
import Posts from '../pages/Posts';
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
			</Routes>
		</BrowserRouter>
	);
};

export default MainRoute;
