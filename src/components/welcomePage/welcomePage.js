import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import RegisterPage from "./registerPage";
import LoginPage from "./loginPage";
import AuthenticationService from "../../service/authenticationService";
import MainPage from "../mainPage/mainPage";


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

                <div className="col-6">
                    <h1 >Welcome to BitBook</h1>
                    <p> Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
                </div>

                <div className="row">
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/loginPage" component={LoginPage} />
                        <Route path="/registerPage" component={RegisterPage} />
                        <Route path="/mainPage" component={MainPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default WelcomePage;
