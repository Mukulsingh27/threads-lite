import Home from './Home';
import NotFound from './NotFound';
import MyProfile from './MyProfile';
import UserProfile from './UsersProfile';
import Login from '../components/auth/Login';
import SignUp from '../components/auth/SignUp';
import Verify from '../components/auth/Verify';
import Reset from '../components/auth/Reset';

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
	{
		path: '/verify/:token',
		element: <Verify />,
		exact: true,
	},
	{
		path: '/reset',
		element: <Reset />,
		exact: true,
	},
	{
		path: '/reset/:token',
		element: <Reset />,
		exact: true,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default routes;
