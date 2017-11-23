import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.bindEventHandlers();
    }

    componentDidMount() {
        dataService.getProfile((profile) => {
            $(".profileContainer").append(`<img class="avatarPicture" src="${profile.avatarUrl}">`);
            $(".profileContainer").append(`<h1>${profile.name}</h1>`);
            $(".profileContainer").append(`<p>Number of posts: ${profile.postsCount}</p>`);
            $(".profileContainer").append(`<p>Number of comments: ${profile.commentsCount}</p>`);
        });
    }

    bindEventHandlers() {

    }



    render() {
        return (
            <div>
                <div className="profileContainer"></div>
                <input className="btn btn-outline-success my-2 my-sm-0" type="button" onClick value="Edit profile" />
            </div>
        );
    }
};

export default Profile;