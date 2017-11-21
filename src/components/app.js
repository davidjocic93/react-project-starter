import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";



import WelcomePage from "./welcomePage/welcomePage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <WelcomePage />
            </div>
        );

    }
}

export default App;


