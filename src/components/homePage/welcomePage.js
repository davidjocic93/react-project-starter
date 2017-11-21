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
            <div>


                <h1>Welcome to BitBook</h1>
                <div className="loginFormDiv">

                    <ul className="nav nav-tabs">
                        <li className="active"><Link to="/loginPage">Login</Link></li>
                        <li><Link to="/registerPage">Register here</Link></li>
                    </ul>
                </div>
                <div>
                    <Switch>
                        
                        <Route path="/loginPage" component={LoginPage} />
                        <Route path="/registerPage" component={RegisterPage} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default WelcomePage;
