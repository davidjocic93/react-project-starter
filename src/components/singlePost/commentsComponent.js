import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentsComponent = (props) => {

    const { id, dateCreated, body, postId, authorName, authorId } = props.comment;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();

    return (

        <div className="comment">
            <div className="row">
                <div className="col-6">
                    <Link to={`/people/${authorId}`}><h6>{authorName}</h6></Link>
                </div>
                <div className="col-6 date">
                    <p>{time} {dateString}</p>
                </div>
            </div>
            <hr />
            <p style={{ wordWrap: "break-word" }}>{body}</p>
        </div>
    );
};

CommentsComponent.propTypes = {
    comment: PropTypes.object,
};

export default CommentsComponent;