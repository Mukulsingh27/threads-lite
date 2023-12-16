import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";

const Login = () => {
    const [loginData, setLoginData] = useState({});

    const handleLoginDataChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(loginData);
    };

    return (
        <div className="login-container">
            <section className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Sign In</h1>
                    <p className="text text-normal">
                        New user?{" "}
                        <span>
                            <Link to="/signup" className="text text-links">
                                Create an account
                            </Link>
                        </span>
                    </p>
                </div>
                <form
                    name="signin"
                    className="form"
                    onSubmit={handleFormSubmit}
                >
                    <div className="input-control">
                        <label htmlFor="email" className="input-label" hidden>
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="input-field"
                            placeholder="Enter Email Address"
                            onChange={handleLoginDataChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <label
                            htmlFor="password"
                            className="input-label"
                            hidden
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="Enter Password"
                            className="input-field"
                            placeholder="Password"
                            onChange={handleLoginDataChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        {/* <a href="#" className="text text-links">Forgot Password</a> */}
                        <input
                            type="submit"
                            name="submit"
                            className="input-submit"
                            value="Sign In"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;
