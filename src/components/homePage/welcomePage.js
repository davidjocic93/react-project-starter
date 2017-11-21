import React from "react";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import RegisterPage from "./registerPage";
import LoginPage from "./loginPage";


class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                    </Switch>
                </div>
            </div>
        );
    }
}

export default WelcomePage;
