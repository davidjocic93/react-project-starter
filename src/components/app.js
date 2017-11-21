import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";



import WelcomePage from "./homePage/welcomePage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              
                <WelcomePage />
                <Switch>
                    <Redirect exact from="/" to="/loginPage" />
                </Switch>
            </div>
        );

    }
}

export default App;


