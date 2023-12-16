import React from "react";
import "./profile.scss";
import Timeline from "./Timeline";
import UserCard from "./UserCard";

const Profile = () => {
    return (
        <div className="profile-section">
            <div className="left-side">
				<UserCard />
			</div>
            <div className="right-side">
				<Timeline />
            </div>
        </div>
    );
};

export default Profile;
