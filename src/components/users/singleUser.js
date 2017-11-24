import React from "react";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";



class SingleUser extends React.Component {
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

    bindEventHandlers() {
        this.loadData = this.loadData.bind(this);
    }

    loadData(id) {
        dataService.getUserProfile(id, (userProfileData) => {
            console.log(userProfileData);

            this.setState({
                name: userProfileData.name,
                email: userProfileData.email,
                avatarUrl: userProfileData.avatarUrl,
                postsCount: userProfileData.postsCount,
                commentsCount: userProfileData.commentsCount,
                about: userProfileData.about,
                aboutShort: userProfileData.aboutShort
            });

        });
    }

    componentDidMount() {
        this.loadData(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.loadData(nextProps.match.params.id);
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
                        <h5>Email: {this.state.email}</h5> <br />
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
            </div>

        );
    }

};

SingleUser.propTypes = {
    match: PropTypes.object,

};

export default SingleUser;