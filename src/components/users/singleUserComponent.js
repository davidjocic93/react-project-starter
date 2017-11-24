import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import ProfileComponent from "../profile/profileComponent";

class SingleUserComponent extends React.Component {
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

        this.loadData = this.loadData.bind(this);

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
                aboutShort: profileData.aboutShort
            });
        });
    }

    componentDidMount() {
        const userId = this.props.match.params.id;
        this.loadData(userId);
    }

    componentWillReceiveProps(nextProps) {
        const userId = nextProps.match.params.id;
        this.loadData(userId);
    }



    render() {
        return (
            <ProfileComponent  profile={this.state} />
        );
    }
}


SingleUserComponent.propTypes = {
    match: PropTypes.object,
   
};

export default SingleUserComponent;