import React from "react";
import PropTypes from "prop-types";

const CommentsComponent = (props) => {

    const {id, dateCreated, body, postId, authorId} = props.comment;

    return (
        
        <div className="comment">
            <p>{body}</p>
        </div>
    );
};

CommentsComponent.propTypes = {
    comment: PropTypes.object,
};

export default CommentsComponent;