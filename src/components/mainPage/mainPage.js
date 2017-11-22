import React from "react";
import Header from "../common/header";
import {authenticationService} from "../../service/authenticationService";
import {dataService} from "../../service/dataService";


class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.bindEventHandlers();   
    }

    componentDidMount () {
        dataService.getProfile();
    }

    bindEventHandlers() {
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        authenticationService.logOut();
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