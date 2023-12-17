import React from "react";
import Message from "../../assets/svgs/Message";
import "./timeline.scss";
import { format } from "timeago.js";
import NewThread from "./NewThread";

const Timeline = ({ thread }) => {
    console.log(thread);
    const token = localStorage.getItem("token");

    return (
        <ol className="timeline">
            {token && <NewThread />}
            {thread?.quotes?.map((quote, index) => (
                <li className="timeline-item extra-space" key={index}>
                    <span className="timeline-item-icon filled-icon">
                        <Message />
                    </span>
                    <div className="timeline-item-wrapper">
                        <div className="timeline-item-description">
                            <span>
                                <a href="#">{`${thread?.firstName} ${
                                    thread?.lastName && thread?.lastName
                                }`}</a>{" "}
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
    );
};

export default Timeline;
