import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.scss";

const SignUp = () => {
    const [signUpData, setSignUpData] = useState({});

    const handleSignUpDataChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(signUpData);
    };
    return (
        <div className="login-container">
            <section className="wrapper">
                <div className="heading">
                    <h1 className="text text-large">Sign Up</h1>
                    <p className="text text-normal">
                        Already a user?{" "}
                        <span>
                            <Link to="/login" className="text text-links">
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
                        <label
                            htmlFor="first-name"
                            className="input-label"
                            hidden
                        >
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            id="first-name"
                            className="input-field"
                            placeholder="Enter First Name"
                            onChange={handleSignUpDataChange}
                            required
                        />
                    </div>

                    <div className="input-control">
                        <label
                            htmlFor="last-name"
                            className="input-label"
                            hidden
                        >
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            id="last-name"
                            className="input-field"
                            placeholder="Enter Last Name"
                            onChange={handleSignUpDataChange}
                        />
                    </div>

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
                            onChange={handleSignUpDataChange}
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
                            onChange={handleSignUpDataChange}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input
                            type="submit"
                            name="submit"
                            className="input-submit"
                            value="Sign Up"
                        />
                    </div>
                </form>
            </section>
        </div>
    );
};

export default SignUp;
