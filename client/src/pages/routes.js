import Home from "./Home";
import Login from "../components/auth/Login";
import SignUp from "../components/auth/SignUp";
import MyProfile from "./MyProfile";
import UserProfile from "./UsersProfile";

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
        element: <MyProfile />,
        exact: true,
    },
    {
        path: "/profile/:id",
        element: <UserProfile />,
        exact: true,
    },
];

export default routes;
