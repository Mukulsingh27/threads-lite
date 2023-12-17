import React from "react";
import "../components/profile/profile.scss";
import Timeline from "../components/profile/Timeline";
import UserCard from "../components/profile/UserCard";
import { useQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "../components/gql-operations/queries";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_MY_PROFILE);

    if (!localStorage.getItem("token")) {
        navigate("/login");
    }

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
        return <p>Error :(</p>;
    }
    return (
        <div className="profile-section">
            <div className="left-side">
                <UserCard
                    firstName={data?.user?.firstName}
                    lastName={data?.user?.lastName}
                    email={data?.user?.email}
                />
            </div>
            <div className="right-side">
                {data?.user && <Timeline thread={data.user} />}
            </div>
        </div>
    );
};

export default Profile;
