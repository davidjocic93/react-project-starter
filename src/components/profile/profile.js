import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import EditProfile from "./editprofile";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatarUrl: "",
            postsCount: "",
            commentsCount: "",
            about: "",
            aboutShort: ""
        };

        this.bindEventHandlers();
    }

    componentDidMount() {
        dataService.getProfile((profile) => {

            this.setState({
                name: profile.name,
                avatarUrl: profile.avatarUrl,
                postsCount: profile.postsCount,
                commentsCount: profile.commentsCount,
                about: profile.about,
                aboutShort: profile.aboutShort
            });

            if (!this.state.avatarUrl) {
                this.setState({
                    avatarUrl: "https://via.placeholder.com/200x200"
                });
            }
        });
    }

    bindEventHandlers() {

    }

    render() {
        return (
            <div className="container profile">
                <div className="row">
                    <div className="col-12">
                        <div className="avatarContainer">
                            <img className="avatarPicture" src={this.state.avatarUrl} />
                        </div>
                    </div>
                    <div className="col-12">
                        <h1>{this.state.name}</h1>
                    </div>
                    <div className="col-12">
                        <h3>About</h3>
                        <p>{this.state.aboutShort}</p>
                        <p>{this.state.about}</p>
                    </div>
                    <div className="col-12">
                        <span className="count">Post count: {this.state.postsCount}</span>
                        <span className="count">Comment count: {this.state.commentsCount}</span>
                    </div>
                </div>
                <EditProfile />
            </div>

        );
    }
};

export default Profile;