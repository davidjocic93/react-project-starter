import React from "react";
import Header from "../common/header";
import AuthenticationService from "../../service/authenticationService";


class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService();

        this.bindEventHandlers();   
    }

    bindEventHandlers() {
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.authService.logOut();
    }

    render() {
        return (
            <div>
                <Header />
                <input type="button" onClick={this.handleLogout} value="Logout" />
            </div>
        );
    }
};

export default MainPage;