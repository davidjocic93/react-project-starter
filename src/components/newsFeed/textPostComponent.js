import React from "react";
import PropTypes from "prop-types";
import { communicationService } from "../../service/communicationService";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";


const TextPostComponent = (props) => {
    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum } = props.post;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();

    const onDeletion = () => {
        dataService.deletePost(id, (serverResponseData) => {
            redirectionService.goTo("/");
        });
    };

    const getOwnId = () => {
        dataService.getProfile((profile) => {
            console.log(profile.userId);
        });
    };


    return (
        <div className="container feed">
            <button onClick={onDeletion}>Delete Post</button>
            <button onClick={getOwnId}> Post</button>
            <div className="row postContainer">
                <div className="col-12 text">
                    <h3>{text}</h3>
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

TextPostComponent.propTypes = {
    post: PropTypes.object,
    deletePost: PropTypes.func
};


export default TextPostComponent;