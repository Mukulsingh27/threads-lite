import React from "react";
import "../components/profile/profile.scss";
import Timeline from "../components/profile/Timeline";
import UserCard from "../components/profile/UserCard";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../components/gql-operations/queries";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
	
    if (!token) {
		navigate("/login");
    }

	const { loading, error, data } = useQuery(GET_MY_PROFILE);

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.error("Error fetching profile data:", error);
        window.location.reload();
    }

    return (
        <div className="profile-section">
            {data?.user && (
                <>
                    <div className="left-side">
                        <UserCard
                            firstName={data.user.firstName}
                            lastName={data.user.lastName}
                            email={data.user.email}
                            avatar={data.user.profileImage}
                            logOutButton={true}
                        />
                    </div>
                    <div className="right-side">
                        <Timeline thread={data.user} />
                    </div>
                </>
            )}
        </div>
    );
};

export default MyProfile;
