import React, { useState } from "react";
import "./timeline.scss";
import Message from "../../assets/svgs/Message";

const Timeline = () => {
    const [thread, setThread] = useState("");

    const handleThreadSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <ol class="timeline">
                <li class="timeline-item">
                    <span class="timeline-item-icon avatar-icon">
                        <i class="avatar">
                            <img
                                src="https://assets.codepen.io/285131/hat-man.png"
                                alt=""
                            />
                        </i>
                    </span>
                    <div class="new-thread">
                        <form
                            onSubmit={handleThreadSubmit}
                            className="thread-form"
                        >
                            <input
                                value={thread}
                                onChange={(e) => setThread(e.target.value)}
                                type="text"
                                placeholder="Post a thread"
                            />
                            <button className="thread-button">Post</button>
                        </form>
                    </div>
                </li>
                <li class="timeline-item | extra-space">
                    <span class="timeline-item-icon filled-icon">
                        <Message />
                    </span>
                    <div class="timeline-item-wrapper">
                        <div class="timeline-item-description">
                            <span>
                                <a href="#">Mukul</a> commented on{" "}
                                <time datetime="20-01-2021">Jan 20, 2021</time>
                            </span>
                        </div>
                        <div class="thread">
                            <p>
                                I've sent him the assignment we discussed
                                recently, he is coming back to us this week.
                                Regarding to our last call, I really enjoyed
                                talking to him and so far he has the profile we
                                are looking for. Can't wait to see his technical
                                test, I'll keep you posted and we'll debrief it
                                all together!😊
                            </p>
                        </div>
                    </div>
                </li>
            </ol>
        </div>
    );
};

export default Timeline;
