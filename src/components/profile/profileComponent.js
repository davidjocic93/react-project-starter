import React from "react";
import PropTypes from "prop-types";

const ProfileComponent = (props) => {

    const { name, email, avatarUrl, about, aboutShort, postsCount, commentsCount } = props.profile;

    return (

        <div >

            <div className="row profileRow">

                <div className="col-12">
                    <div className="avatarContainer">
                        <img className="avatarPicture" src={avatarUrl} />
                    </div>
                </div>

                <div className="col-12">
                    <h1>{name}</h1>
                    <h5>Email: {email}</h5> <br />
                </div>

                <div className="col-md-8 offset-md-2 col-12">
                    <h3>About</h3>
                    <p>{aboutShort}</p>
                    <p>{about}</p>
                </div>

                <div className="col-12">
                    <p className="count">Post count: <span>{postsCount}</span></p>
                    <p className="count">Comment count: <span>{commentsCount}</span></p>
                </div>

            </div>
        </div>
    );
};

ProfileComponent.propTypes = {
    profile: PropTypes.object,

};

export default ProfileComponent;
