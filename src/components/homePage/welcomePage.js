import React from "react";
import LoginForm from "./loginForm";




class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Welcome to BitBook</h1>
                <LoginForm />
            </div>
        );
    }
}

export default WelcomePage;
