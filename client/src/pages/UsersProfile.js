import React from "react";
import "../components/profile/profile.scss";
import Timeline from "../components/profile/Timeline";
import UserCard from "../components/profile/UserCard";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "../components/gql-operations/queries";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_USER_PROFILE, {
        variables: {
            id,
        },
    });

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
                    avatar={data?.user?.profileImage}
                    logOutButton={false}
                />
            </div>
            <div className="right-side">
                {data?.user && <Timeline thread={data.user} />}
            </div>
        </div>
    );
};

export default UserProfile;
