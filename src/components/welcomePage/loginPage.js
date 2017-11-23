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
            <div className="container welcome">
                <div className="row">

                    <Welcome />

                    <div className="col-sm-12 col-md-6 col-lg-6 container">

                        <div className="row loginButtons">
                            <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                <button className="btn btn-primary"><Link to="/loginPage">Login</Link></button>
                            </div>
                            <div className="col-sm-6 col-md-6 col-lg-6 form-group">
                                <button className="btn btn-primary"><Link to="/registerPage">Register</Link></button>
                            </div>
                        </div>


                        <form className="loginForm">
                            <input className="col-12" type="username" name="username" onChange={this.handleChange} placeholder="Username" /><br />
                            <div className="emailError text-danger"></div>
                            <input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                            <button className="btn btn-primary" onClick={this.handleLogin} >Login</button>
                            <div className="loginError text-danger"></div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
