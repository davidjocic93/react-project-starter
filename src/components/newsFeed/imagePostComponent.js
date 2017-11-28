import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


const ImagePostComponent = (props) => {
    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum, imageUrl } = props.post;

    const date = new Date(dateCreated);
    const dateString = date.toLocaleTimeString();

    return (
        <div className="container feed">
            <div className="row postContainer">
                <div className="col-12 text">
                    <Link to={`/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`}><img src={imageUrl} style={{width: "100%"}}/></Link>
                    <hr />
                </div>
                <div className="col-4 date">
                    <p>{dateString}</p>
                </div>
                <div className="col-4 commentsNum">
                    <p>CommentsNum: {commentsNum}</p>
                </div>
                <div className="col-4 type">
                    <p>{type}</p>
                </div>
            </div>
        </div>
    );
};

ImagePostComponent.propTypes = {
    post: PropTypes.object,

};

export default ImagePostComponent;