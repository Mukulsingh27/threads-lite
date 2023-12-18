import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../components/gql-operations/queries";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

const Home = () => {
    const { loading, error, data } = useQuery(GET_ALL_QUOTES);

    if (loading) return <p>Loading...</p>;

    if (error) {
        console.log(error);
    }

    if (data.quotes.length === 0)
        return (
            <div className="home">
                <h1>No quotes found</h1>
            </div>
        );

    return (
        <div className="home">
            <ol className="timeline">
                {data?.quotes?.map((quote, index) => (
                    <li className="timeline-item extra-space" key={index}>
                        <span className="timeline-item-icon filled-icon-white">
                            <i className="avatar">
                                <img src={quote?.by?.profileImage} alt="" />
                            </i>
                        </span>
                        <div className="timeline-item-wrapper">
                            <div className="timeline-item-description">
                                <span>
                                    <Link to={`/profile/${quote?.by?._id}`}>{`${
                                        quote?.by?.firstName
                                    } ${
                                        quote?.by?.lastName &&
                                        quote?.by?.lastName
                                    }`}</Link>{" "}
                                    threaded{" "}
                                    <time dateTime="20-01-2021">
                                        {format(quote?.createdAt)}
                                    </time>
                                </span>
                            </div>
                            <div className="thread">
                                <p>{quote?.name}</p>
                            </div>
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Home;
