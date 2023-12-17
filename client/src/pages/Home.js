import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../components/gql-operations/queries";
import { format } from "timeago.js";
import Message from "../assets/svgs/Message";

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
                        <span className="timeline-item-icon filled-icon">
                            <Message />
                        </span>
                        <div className="timeline-item-wrapper">
                            <div className="timeline-item-description">
                                <span>
                                    <p>{`${quote?.by?.firstName} ${
                                        quote?.by?.lastName &&
                                        quote?.by?.lastName
                                    }`}</p>{" "}
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
