import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ firstName, lastName, email }) => {
    const navigation = useNavigate();
    return (
        <div className="user-card">
            <div className="profile-picture">
                <img
                    src={`https://robohash.org/${firstName}?size=300x300`}
                    alt="Profile avatar"
                />
            </div>
            <h2 className="name">
                {firstName} {lastName}
            </h2>
            <h3 className="username">{email}</h3>
            {/* <p className="tagline">Keep going.</p> */}
            <p className="description">Masih belajar CSS dan HTML.</p>
            <button
                className="button"
                style={{ cursor: "pointer" }}
                onClick={() => {
                    localStorage.removeItem("token");
                    navigation("/login");
                }}
            >
                Log Out
            </button>
        </div>
    );
};

export default UserCard;
