import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { Link } from "react-router-dom";



const handleLogout = (event) => {
    authenticationService.logOut();
};


const Header = () => {

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <Link className="navbar-brand" id="logo" to="/">BitBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent navbarColor01">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <Link className="nav-link  my-2 my-sm-0" to="/">News Feed</Link>
                    <Link className="nav-link my-2 my-sm-0" to="/profile">Profile</Link>
                    <Link className="nav-link  my-2 my-sm-0" to="/people">People</Link>
                    <button className="btn btn-outline-success my-2 my-sm-0" onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </div>
    );
};

export default Header;