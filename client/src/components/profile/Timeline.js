import React from "react";
import Message from "../../assets/svgs/Message";
import "./timeline.scss";
import { format } from "timeago.js";
import NewThread from "./NewThread";

const Timeline = ({ thread }) => {
    const token = localStorage.getItem("token");

    return (
        <ol className="timeline">
            {token && <NewThread avatar={thread?.profileImage} />}
            {[...thread?.quotes].reverse().map((quote, index) => (
                <li className="timeline__timeline-item extra-space" key={index}>
                    <span className="timeline__timeline-item-icon filled-icon">
                        <Message />
                    </span>
                    <div className="timeline__timeline-item-wrapper">
                        <div className="timeline__timeline-item-description">
                            <span>
                                <p>{`${thread?.firstName} ${
                                    thread?.lastName && thread?.lastName
                                }`}</p>{" "}
                                threaded{" "}
                                <time dateTime={quote?.createdAt}>
                                    {format(quote?.createdAt)}
                                </time>
                            </span>
                        </div>
                        <div className="timeline__thread">
                            <p>{quote?.name}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
};

export default Timeline;
