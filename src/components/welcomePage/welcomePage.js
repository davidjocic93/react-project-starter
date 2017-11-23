import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import RegisterPage from "./registerPage";
import LoginPage from "./loginPage";
import {authenticationService} from "../../service/authenticationService";
import HomePage from "../homePage/homePage";
import Welcome from "./welcome";


class WelcomePage extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        if (authenticationService.isAuthenticated()) {
            return (
                <Switch>
                    <Redirect from="/loginPage" exact to="/" />
                    <Route path="/" component={HomePage} />
                </Switch>
            );
        }
        return (
            <div className="container">

                <div className="row">
                    <Switch>
                        <Redirect from="/" exact to="/loginPage" />
                        <Route path="/loginPage" component={LoginPage} />
                        <Route path="/registerPage" component={RegisterPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default WelcomePage;
