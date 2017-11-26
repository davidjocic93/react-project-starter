import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SinglePost from "../singlePosts/singlePostComponent";

const PostsComponent = (props) => {
    const { dateCreated, id, text, type, userDisplayName, userId } = props.post;

    return (

        <div className="userContainer">
            <div className="row">
                <div className="col-4 userImage">
                    <img style={{ width: "30%", borderRadius: "50%" }} src={""} />
                </div>
                <div className="col-4 name">
                    <Link to={`/feeds/${type.slice(0,1).toUpperCase()}${type.slice(1)}Posts/${id}`}>
                        <h3>{text}</h3>
                    </Link>
                    <p>{dateCreated}</p>
                </div>
                <div className="col-4 time">
                    <p>{userDisplayName}</p>
                    Post type: <p>{type}</p>
                </div>

            </div>
        </div>

    );
};

PostsComponent.propTypes = {
    post: PropTypes.object,

};


export default PostsComponent;