import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CommentsComponent = (props) => {

    const { id, dateCreated, body, postId, authorName, authorId } = props.comment;

    return (

        <div className="comment">
            <Link to={`/people/${authorId}`}><h6>{authorName}</h6></Link>
            <hr />
            <p style={{ wordWrap: "break-word" }}>{body}</p>
        </div>
    );
};

CommentsComponent.propTypes = {
    comment: PropTypes.object,
};

export default CommentsComponent;