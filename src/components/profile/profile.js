import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import EditProfile from "./editprofile";
import ProfileComponent from "./profileComponent";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
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
                email: profile.email,
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
            <div>
                <ProfileComponent  profile={this.state} />
                <EditProfile />
            </div>
        );
    }
};

export default Profile;