import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";

const UsersComponent = (props) => {
    const { name, id, aboutShort, lastPostData, avatarUrl } = props.user;
    console.log(props.user);


    return (
        <div>
            <h6>{name}</h6>
            <h6>{id}</h6>
            <h6>{aboutShort}</h6>
            <h6>{lastPostData}</h6>
            <img style={{width : "200px"}} src={avatarUrl}/>
        </div>
    );

};

UsersComponent.propTypes = {
    user: PropTypes.object,
   
};

export default UsersComponent;