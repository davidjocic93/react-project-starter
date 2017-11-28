import React from "react";
import { Link } from "react-router-dom";
import registerPage from "./registerPage";
import { authenticationService } from "../../service/authenticationService";
import { validationService } from "../../service/validationService";
import { dataService } from "../../service/dataService";
import Welcome from "./welcome";




class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            errors: {
                allFieldsError: ""
            }
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
        this.setState({
            [name]: value
        });
    }

    handleLogin(event) {
        event.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password
        };

        validationService.isLoginFormValid(data,
            (data) => {
                authenticationService.login(data,
                    (serverErrorObject) => {
                        if (serverErrorObject.response == undefined) {
                            alert("SERVER UNREACHABLE!");
                        } else if (this.state.username != "" && this.state.password != "") {
                            this.setState({
                                errors: {
                                    allFieldsError: serverErrorObject.response.data.error.message
                                }
                            });
                        }
                    });
            }, (error) => {
                this.setState({
                    errors: {
                        allFieldsError: error
                    }
                });
            });
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
                            <input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Password" /><br />
                            <button className="btn btn-primary" onClick={this.handleLogin} >Login</button>
                            <div className="text-danger">{this.state.errors.allFieldsError}</div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;
