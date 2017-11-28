import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";



const VideoPostComponent = (props) => {
    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum, videoUrl } = props.post;

    const date = new Date(dateCreated);
    const dateString = date.toLocaleTimeString();
    const youtubeVideoId = videoUrl.slice(videoUrl.indexOf("=") + 1);
    return (
        <Link to={`/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`}>
            <div className="container feed">
                <div className="row postContainer">
                    <div className="col-12 text">
                        <Iframe url={`https://www.youtube.com/embed/${youtubeVideoId}`}
                            width="100%"
                            height="500px"
                            id="myId"
                            className="myClassname"
                            display="initial"
                            position="relative"
                            allowFullScreen />

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
        </Link>
    );
};

VideoPostComponent.propTypes = {
    post: PropTypes.object,

};

export default VideoPostComponent;