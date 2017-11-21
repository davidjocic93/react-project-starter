import React from "react";
import { Switch, Route } from "react-router-dom";

import WelcomePage from "./homePage/welcomePage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <WelcomePage />;
                <Switch>
                    <Route path="registerPage" />


                </Switch>
            </div>
        );

    }
}

export default App;
