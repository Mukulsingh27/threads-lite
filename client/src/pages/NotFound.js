import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div
            class="not-found"
            style={{
                maxWidth: "960px",
                width: "100%",
                margin: "30px auto",
                transform: "scale(0.8)",
            }}
        >
            <div
                class="page"
                style={{
                    maxWidth: "960px",
                    height: "475px",
                    margin: "0",
                    boxShadow: "0px 0px 8px 1px #ccc",
                    background: "#fafafa",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "72px",
                        margin: 0,
                    }}
                >
                    404
                </h1>
                <p>Page not found</p>
                <Link to="/">
                    <button
                        style={{
                            marginTop: "20px",
                            borderRadius: "50px",
                            padding: "8px 24px",
                            fontSize: "20px",
                            cursor: "pointer",
                            background: "crimson",
                            color: "#fff",
                            border: "none",
                        }}
                    >
                        Back to home
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
