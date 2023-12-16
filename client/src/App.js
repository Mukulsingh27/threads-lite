import React from "react";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SinghUp";
import Profile from "./components/profile/Profile";
import routes from "./components/routes";
import { useRoutes } from "react-router-dom";

function App() {
    const routing = useRoutes(routes);

    return (
        <main className="main">
            <Layout>{routing}</Layout>
        </main>
    );
}

export default App;
