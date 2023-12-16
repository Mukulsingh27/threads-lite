import React from "react";
import Layout from "./components/Layout";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SinghUp";

function App() {
    return (
        <main className="main">
			<Layout>
				<Login />
				<SignUp />
			</Layout>
        </main>
    );
}

export default App;
