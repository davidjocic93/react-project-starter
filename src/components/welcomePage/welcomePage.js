import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import RegisterPage from "./registerPage";
import LoginPage from "./loginPage";
import AuthenticationService from "../../service/authenticationService";
import MainPage from "../mainPage/mainPage";
import Welcome from "./welcome";


class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService();
    }

    render() {
        if (this.authService.isAuthenticated()) {
            return <MainPage />;
        }
        return (
            <div className="row container ">

                <div className="row">
                    <Welcome />
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/loginPage" component={LoginPage} />
                        <Route path="/registerPage" component={RegisterPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default WelcomePage;
