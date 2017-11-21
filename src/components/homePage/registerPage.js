import React from "react";
import {Link} from "react-router-dom";



class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        };
        this.handleNameRegister = this.handleNameRegister.bind(this);
        this.handleEmailRegister = this.handleEmailRegister.bind(this);
        this.handlePasswordRegister = this.handlePasswordRegister.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleNameRegister(event) {
        this.setState({ name: event.target.value });
        console.log(event.target.value);
    }

    handleEmailRegister(event) {
        this.setState({ email: event.target.value });
        console.log(event.target.value);
    }
    handlePasswordRegister(event) {
        this.setState({ password: event.target.value });
        console.log(event.target.value);
    }

    handleRegister(event) {
        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        console.log(data);
        // this.props.onRegister(data);
    }


    render() {
        return (
            <div className="loginFormDiv">
                <form className="homePageForm">
                    Name<input type="text" onChange={this.handleNameRegister}/><br/>
                    Email<input type="email" onChange={this.handleEmailRegister} /><br />
                    Password<input type="password" onChange={this.handlePasswordRegister} /><br />
                    <input type="button" onClick={this.handleRegister} value="Register" />
                    
                </form>
                

            </div>
        );
    }
}

export default RegisterPage;


