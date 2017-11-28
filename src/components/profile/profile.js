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

    loadData() {

        dataService.getProfile(
            (profile) => {
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


    componentDidMount() {

        this.loadData();
    }


    bindEventHandlers() {

        this.loadData = this.loadData.bind(this);
    }

    render() {

        return (

            <div className="container profile">
                <ProfileComponent profile={this.state} />
                <EditProfile reloadProfile={this.loadData} />
            </div>
        );
    }
};

export default Profile;