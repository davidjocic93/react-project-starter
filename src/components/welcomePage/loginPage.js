import React from "react";
import { Link } from "react-router-dom";
import registerPage from "./registerPage";
import AuthenticationService from "../../service/authenticationService";
import Welcome from "./welcome";




class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService();
        this.state = {
            email: "",
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
        let data = {
            username: this.state.email,
            password: this.state.password
        };
        console.log(data);
        // this.props.onLogin(data);
        if (data.username == "" || data.password == "") {
            $(".loginError").text("Please fill all fields");
        } else if (!data.username.includes("@")) {
            $(".emailError").text("Email must contain @ character!");
        } else {
            this.authService.login(data);
        }
    }


    render() {
        return (
            <div className="row">

                <Welcome />

                <div className="col-6 container">

                    <div className="row">
                        <h3 className="col-6"><Link to="/loginPage">Login</Link></h3>
                        <h3 className="col-6"><Link to="/registerPage">Register</Link></h3>
                    </div>

                    <form>
                        Email<input className="col-12" type="email" name="email" onChange={this.handleChange} placeholder="Email" /><br />
                        <div className="emailError"></div>
                        Password<input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                        <input className="btn btn-primary" type="button" onClick={this.handleLogin} value="Login" />
                        <div className="loginError"></div>
                    </form>

                </div>
            </div>
        );
    }
}

export default LoginPage;
