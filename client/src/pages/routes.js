import Home from './Home';
import NotFound from './NotFound';
import MyProfile from './MyProfile';
import UserProfile from './UsersProfile';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';

const routes = [
	{
		path: '/',
		element: <Home />,
		exact: true,
	},
	{
		path: '/login',
		element: <Login />,
		exact: true,
	},
	{
		path: '/signup',
		element: <SignUp />,
		exact: true,
	},
	{
		path: '/profile',
		element: <MyProfile />,
		exact: true,
	},
	{
		path: '/profile/:id',
		element: <UserProfile />,
		exact: true,
	},
	// 404 page
	{
		path: '*',
		element: <NotFound />,
	},
];

export default routes;
