import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";

const UsersComponent = (props) => {
    const { name, id, aboutShort, lastPostData, avatarUrl } = props.user;
    // console.log(props.user);


    return (
        <div className="userContainer row">
            <p className="col-12">{name}</p>
            <p className="col-12">{id}</p>
            <p className="col-12">{aboutShort}</p>
            <p className="col-12">{lastPostData}</p>
            {/* <img className="col-12" src={avatarUrl}/> */}
        </div>
    );

};

UsersComponent.propTypes = {
    user: PropTypes.object,
   
};

export default UsersComponent;