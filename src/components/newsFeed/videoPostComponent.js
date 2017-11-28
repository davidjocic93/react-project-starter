import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";



const VideoPostComponent = (props) => {


    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum, videoUrl } = props.post;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const youtubeVideoId = videoUrl.slice(videoUrl.indexOf("=") + 1);

    return (
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
                    <p>{time}</p>
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

VideoPostComponent.propTypes = {
    post: PropTypes.object,
};

export default VideoPostComponent;