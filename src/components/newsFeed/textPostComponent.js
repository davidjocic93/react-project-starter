import React from "react";
import PropTypes from "prop-types";
import { communicationService } from "../../service/communicationService";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";
import { Link } from "react-router-dom";


const TextPostComponent = (props) => {

    const { id, dateCreated, userId, userDisplayName, type, text, commentsNum } = props.post;
    const ownId = props.ownId;
    const reloadFeed = props.reloadFeed;

    const date = new Date(dateCreated);
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString();
    const pathToSinglePost = `/feed/${type.slice(0, 1).toUpperCase()}${type.slice(1)}/${id}`;

    let showReadMoreButton = "";

    if (window.location.hash !== "#/") {
        showReadMoreButton = "hidden";
    }

    let showDeleteButton = "";

    if (ownId !== userId) {
        showDeleteButton = "none";
    }

    const onDeletion = () => {

        dataService.deletePost(id,
            (serverResponseData) => {

                redirectionService.goTo("/");

                if (window.location.hash === "#/") {
                    reloadFeed();
                }

            });
    };

    return (

        <div className="container feed">

            <button className="deleteBtn" onClick={onDeletion} style={{ display: showDeleteButton }}>
                <img src="http://www.pvhc.net/img5/kvqqrcmmwflsdfarwewp.png" />
            </button>

            <div className="row postContainer">

                <div className="col-8 text">
                    <Link to={`/people/${userId}`}><h5>{userDisplayName}</h5></Link>
                </div>

                <div className="col-4 date">
                    <p>{time}  {dateString}</p>
                </div>

                <div className="col-12 content">
                    <p style={{ wordWrap: "break-word" }}>{text}</p>
                    <hr />
                </div>

                <div className="col-4 commentsNum">
                    <p>{commentsNum} comments</p>

                </div>

                <div className="col-4 readMore" style={{ visibility: showReadMoreButton }}>
                    <Link to={pathToSinglePost}>
                        <h5>Read more  &#62;&#62;&#62;</h5>
                    </Link>
                </div>

            </div>
        </div>
    );
};

TextPostComponent.propTypes = {
    post: PropTypes.object,
    ownId: PropTypes.number,
    reloadFeed: PropTypes.func
};


export default TextPostComponent;