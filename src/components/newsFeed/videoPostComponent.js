import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Iframe from "react-iframe";



const VideoPostComponent = (props) => {

    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum, videoUrl } = props.post;
    const ownId = props.ownId;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const youtubeVideoId = videoUrl.slice(videoUrl.indexOf("=") + 1);

    let showDeleteButton = "";

    if (ownId !== userId) {
        showDeleteButton = "none";
    }

    const onDeletion = () => {

        dataService.deletePost(id,
            (serverResponseData) => {
                redirectionService.goTo("/");
            });
    };


    return (

        <div className="container feed">

            <button className="deleteBtn" onClick={onDeletion} style={{ display: showDeleteButton }}>
                <img src="http://www.pvhc.net/img5/kvqqrcmmwflsdfarwewp.png" />
            </button>

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
                    <p>{commentsNum} comments</p>
                    <h5>Read more</h5>
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
    ownId: PropTypes.number
};

export default VideoPostComponent;