import Home from './pages/Home';
import NotFound from './pages/NotFound';
import MyProfile from './pages/MyProfile';
import UserProfile from './pages/UsersProfile';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import VerifyUser from './components/auth/VerifyUser';
import Reset from './components/auth/Reset';
import NewPassword from './components/auth/NewPassword';

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
		element: <VerifyUser />,
		exact: true,
	},
	{
		path: '/reset',
		element: <Reset />,
		exact: true,
	},
	{
		path: '/reset/:token',
		element: <NewPassword />,
		exact: true,
	},
	{
		path: '*',
		element: <NotFound />,
	},
];

export default routes;
