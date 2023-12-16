import React from "react";

const UserCard = () => {
    return (
        <div class="user-card">
            <div class="profile-picture">
                <img
                    src="https://avatars.githubusercontent.com/u/54891099?v=4"
                    alt="Profile avatar"
                />
            </div>
            <h2 class="name">Mukul Singh</h2>
            <h3 class="username">@mukulsingh27</h3>
            {/* <p class="tagline">Keep going.</p> */}
            <p class="description">Masih belajar CSS dan HTML.</p>
            <a href="#" class="button">
                Log Out
            </a>
        </div>
    );
};

export default UserCard;
