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
        let data = {
            username: this.state.username,
            password: this.state.password
        };
        console.log(data);
        // this.props.onLogin(data);
        if (data.username == "" || data.password == "") {
            $(".loginError").text("Please fill all fields");
        } else {
            this.authService.login(data, (serverErrorObject) => {
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

                    <div className="row">
                        <h3 className="col-6"><Link to="/loginPage">Login</Link></h3>
                        <h3 className="col-6"><Link to="/registerPage">Register</Link></h3>
                    </div>

                    <form>
                        Username<input className="col-12" type="username" name="username" onChange={this.handleChange} placeholder="Username" /><br />
                        <div className="emailError error"></div>
                        Password<input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                        <input className="btn btn-primary" type="button" onClick={this.handleLogin} value="Login" />
                        <div className="loginError error"></div>
                    </form>

                </div>
            </div>
        );
    }
}

export default LoginPage;
