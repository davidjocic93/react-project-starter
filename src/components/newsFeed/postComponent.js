import React from "react";
import PropTypes from "prop-types";

const PostComponent = (props) => {
    const { id, dateCreated, userId, userDisplayName, type, text } = props.post;

    const date = new Date(dateCreated);
    const dateString = date.toLocaleTimeString();

    return (
        <div className="row postContainer">
            <div className="col-12">
                <h3>{userDisplayName}</h3>
            </div>
            <div className="col-12 ">
                <p>{text}</p>
            </div>
            <div className="col-6 ">
                <p>{dateString}</p>
            </div>
            <div className="col-6 ">
                <p>{type}</p>
            </div>
        </div>
    );
};

PostComponent.propTypes = {
    post: PropTypes.object,

};

export default PostComponent;