import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../gql-operations/mutations";

const NewThread = () => {
    const [newThread, setNewThread] = useState("");

    const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
        onCompleted: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
        refetchQueries: ["getAllQuotes", "getMyProfile"],
    });

    if (loading) return <p>Loading...</p>;

    const handleThreadSubmit = (e) => {
        e.preventDefault();
        createQuote({
            variables: {
                name: newThread,
            },
        });
    };

    return (
        <>
            {data && <p>{data.quote}</p>}
            <li className="timeline-item">
                <span className="timeline-item-icon avatar-icon">
                    <i className="avatar">
                        <img
                            src="https://assets.codepen.io/285131/hat-man.png"
                            alt=""
                        />
                    </i>
                </span>
                <div className="new-thread">
                    <form onSubmit={handleThreadSubmit} className="thread-form">
                        <input
                            onChange={(e) => setNewThread(e.target.value)}
                            type="text"
                            placeholder="Post a thread"
                        />
                        <button className="thread-button">Post</button>
                    </form>
                    <div className="error">
                        {error && <p>{error.message}</p>}
                    </div>
                </div>
            </li>
        </>
    );
};

export default NewThread;
