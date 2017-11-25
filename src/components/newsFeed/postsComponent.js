import React from "react";
import PropTypes from "prop-types";

const PostsComponent = (props) => {
    const { dateCreated, id, text, type, userDisplayName, userId } = props.post;

    return (
        <div className="userContainer">
            <div className="row">
                <div className="col-4 userImage">
                    <img style={{ width: "30%", borderRadius: "50%" }} src={""} />
                </div>
                <div className="col-4 name">
                    <h3>{text}</h3>
                    <p>{dateCreated}</p>
                </div>
                <div className="col-4 time">
                    <p>{userDisplayName}</p>
                </div>

            </div>
        </div>
    );
};

PostsComponent.propTypes = {
    post: PropTypes.object,

};


export default PostsComponent;