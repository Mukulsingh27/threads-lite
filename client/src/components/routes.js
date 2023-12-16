import Home from "./Home";
import Login from "./auth/Login";
import SignUp from "./auth/SinghUp";
import Profile from "./profile/Profile";

const routes = [
    {
        path: "/",
        element: <Home />,
        exact: true,
    },
    {
        path: "/login",
        element: <Login />,
        exact: true,
    },
    {
        path: "/signup",
        element: <SignUp />,
        exact: true,
    },
	{
		path: "/contact",
		// element: <Profile />,
		exact: true,
	},
    {
        path: "/profile",
        element: <Profile />,
        exact: true,
    },
];

export default routes;
