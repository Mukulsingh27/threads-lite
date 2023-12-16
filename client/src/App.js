import React from "react";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SinghUp";
import Profile from "./components/profile/Profile";

function App() {
    return (
        <main className="main">
            <Layout>
                {/* <Login />
				<SignUp /> */}
                <Profile />
            </Layout>
        </main>
    );
}

export default App;
