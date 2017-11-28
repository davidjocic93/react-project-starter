import React from "react";
import PropTypes from "prop-types";
import { communicationService } from "../../service/communicationService";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";


const TextPostComponent = (props) => {

    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum } = props.post;
    const ownId = props.ownId;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();

    let showDeleteButton = "";

    if (ownId !== userId) {
        showDeleteButton = "hidden";
    }

    const onDeletion = () => {

        dataService.deletePost(id,
            (serverResponseData) => {
                redirectionService.goTo("/");
            });
    };



    return (

        <div className="container feed">

            <button onClick={onDeletion} style={{ visibility: showDeleteButton }}>Delete Post</button>

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
    ownId: PropTypes.number
};


export default TextPostComponent;