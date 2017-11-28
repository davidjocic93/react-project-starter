import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import ProfileComponent from "../profile/profileComponent";
import EditProfile from "../profile/editprofile";

class SingleUserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            avatarUrl: "",
            postsCount: "",
            commentsCount: "",
            about: "",
            aboutShort: "",
            userId: "",
            ownId: ""
        };

        this.loadData = this.loadData.bind(this);
        this.loadOwnProfileData = this.loadOwnProfileData.bind(this);

    }

    loadOwnProfileData() {
        dataService.getProfile((profileData) => {
            this.setState({
                ownId: profileData.userId
            });
        });
    }


    loadData(id) {
        dataService.getUserProfile(id, (profileData) => {
            this.setState({
                name: profileData.name,
                email: profileData.email,
                avatarUrl: profileData.avatarUrl,
                postsCount: profileData.postsCount,
                commentsCount: profileData.commentsCount,
                about: profileData.about,
                aboutShort: profileData.aboutShort,
                userId: profileData.userId
            });

            if (!this.state.avatarUrl) {
                this.setState({
                    avatarUrl: "https://via.placeholder.com/200x200"
                });

            }
        });
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.loadData(id);
        this.loadOwnProfileData();
    }
    
    componentWillReceiveProps(nextProps) {
        const id = nextProps.match.params.id;
        this.loadData(id);
    }
    
    
    
    render() {
    
        if (this.state.userId == this.state.ownId) {
            return (
                <div className="container singleUser">
                    <ProfileComponent profile={this.state} />
                    <EditProfile />
                </div>
            );
        }

        return (
            <div className="container singleUser">
                <ProfileComponent profile={this.state} />
            </div>
        );



    }
}


SingleUserPage.propTypes = {
    match: PropTypes.object,

};

export default SingleUserPage;