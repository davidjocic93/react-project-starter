import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const PostComponent = (props) => {
    const { id, dateCreated, userId, userDisplayName, type, text } = props.post;

    const date = new Date(dateCreated);
    const dateString = date.toLocaleTimeString();

    return (
        <div className="container feed">
            <div className="row postContainer">
                <div className="col-12 text">
                    <Link to={`/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`}><h3>{text}</h3></Link>
                    <hr />
                </div>
                <div className="col-6 date">
                    <p>{dateString}</p>
                </div>
                <div className="col-6 type">
                    <p>{type}</p>
                </div>
            </div>
        </div>
    );
};

PostComponent.propTypes = {
    post: PropTypes.object,

};

export default PostComponent;