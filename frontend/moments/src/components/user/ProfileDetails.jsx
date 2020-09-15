import React, { Component } from 'react';
import axios from "axios";

class ProfileDetails extends Component {
    state = {
        src: "",
        email: "",
        handle: "",
        post: "",
        followers: "",
        following: ""
    } 

    componentDidMount() {
        // get additional data
        // state update
        // ui => new data => appear
        axios.get("/api/v1/users/0442e634-cc01-44df-936a-37f5b1ee23a8").then((res) => {
            let {email_id, handle, p_img_url} = res.data.user;
            this.setState({
                email: email_id,
                src: p_img_url,
                handle: handle
            })
        }).then(() => {
            let followerP = axios.get("/api/v1/users/fr/0442e634-cc01-44df-936a-37f5b1ee23a8");
            return followerP;
        }).then((followerRes) => {  
            let followers = followerRes.data.message.filter((follower) => {
                return follower.is_pending == 0;
            });
            let followerCount = followers.length;
            this.setState({
                followers: followerCount
            })
        })
    }

    render() {
        let {src, email, handle, post, followers, following} = this.state;
        return (
            <div className = "profile-details">
                <div className="profile-subpart">
                    <div className = "handle">{handle}</div>
                    <hr />
                    <img src={src} alt="profile-img"/>
                    <hr />
                    <div className="email">{email}</div>
                    <hr />
                </div>
                <div className="profile-stats">
                    <div className="div post">
                        <p>| Posts {post} |</p>
                    </div>

                    <div className="div follower">
                        <p>| Followers {followers} |</p>
                    </div>

                    <div className="div follwing">
                        <p>| Following {following} |</p>
                    </div>

                </div>
            </div>
        );
    }
}

export default ProfileDetails;