import React from "react";
import { Link } from "react-router-dom";
import registerPage from "./registerPage";
import {authenticationService} from "../../service/authenticationService";
import Welcome from "./welcome";




class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        console.log(event.target.value);
    }

    handleLogin(event) {
        event.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(data);
        // this.props.onLogin(data);
        if (data.username == "" || data.password == "") {
            $(".loginError").text("Please fill all fields");
        } else {
            authenticationService.login(data, (serverErrorObject) => {
                console.log(serverErrorObject);
                $(".loginError").text("Server error. Contact your network administrator");
                if (serverErrorObject.response.status == 400) {
                    $(".loginError").text(`${serverErrorObject.response.data.error.message}`);
                    console.log(serverErrorObject.response);
                }
            });
        }
    }


    render() {
        return (
            <div className="row">

                <Welcome />

                <div className="col-6 container">

                    <div className="row loginButtons">
                        <button className="col-6"><Link to="/loginPage">Login</Link></button>
                        <button className="col-6"><Link to="/registerPage">Register</Link></button>
                    </div>


                    <form className="loginForm">
                        Username<input className="col-12" type="username" name="username" onChange={this.handleChange} placeholder="Username" /><br />
                        <div className="emailError error"></div>
                        Password<input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                        <button className="btn btn-primary" onClick={this.handleLogin} >Login</button>
                        <div className="loginError error"></div>
                    </form>

                </div>
            </div>
        );
    }
}

export default LoginPage;
