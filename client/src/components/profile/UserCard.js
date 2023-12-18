import React from "react";
import { useNavigate } from "react-router-dom";

const UserCard = ({ firstName, lastName, email, avatar, logOutButton }) => {
    const token = localStorage.getItem("token");
    const navigation = useNavigate();
    return (
        <div className="user-card">
            <div className="profile-picture">
                <img
                    src={
                        avatar
                            ? avatar
                            : "https://avatars.githubusercontent.com/u/54891099?v=4"
                    }
                    alt="Profile avatar"
                />
            </div>
            <h2 className="name">
                {firstName} {lastName}
            </h2>
            <h3 className="username">{email}</h3>
            {/* <p className="tagline">Keep going.</p> */}
            <p className="description">Masih belajar CSS dan HTML.</p>
            {token && logOutButton && (
                <button
                    className="button"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigation("/login");
                        window.location.reload();
                    }}
                >
                    Log Out
                </button>
            )}
        </div>
    );
};

export default UserCard;
