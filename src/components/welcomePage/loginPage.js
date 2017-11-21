import React from "react";
import { Link } from "react-router-dom";
import registerPage from "./registerPage";
import AuthenticationService from "../../service/authenticationService";




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
        this.authService.login(data);
    }

    render() {
        return (
            <div className="col-6 container">

                <div className="row">
                    <h3 className="col-6"><Link to="/loginPage">Login</Link></h3>
                    <h3 className="col-6"><Link to="/registerPage">Register</Link></h3>
                </div>

                <form>
                    Email<input type="email" name="email" onChange={this.handleChange} placeholder="Email" /><br />
                    Password<input type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                    <input type="button" onClick={this.handleLogin} value="Login" />
                </form>

            </div>
        );
    }
}

export default LoginPage;
