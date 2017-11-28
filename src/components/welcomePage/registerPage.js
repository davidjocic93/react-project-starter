import React from "react";
import { Link } from "react-router-dom";
import { authenticationService } from "../../service/authenticationService";
import Welcome from "./welcome";
import { validationService } from "../../service/validationService";




class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            repeat: "",
            email: "",
            name: "",
            errors: {
                name: "",
                username: "",
                password: "",
                repeat: "",
                email: "",
                allFieldsError: ""
            }
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }


    handleRegister(event) {
        event.preventDefault();
        let data = {
            name: this.state.name,
            username: this.state.email,
            password: this.state.password,
            repeat: this.state.repeat,
            email: this.state.email,
        };

        validationService.isRegisterFormValid(data,
            (data) => {
                authenticationService.register(data, (serverErrorObject) => {
                    if (this.state.email != "") {
                        this.setState({
                            errors: {
                                email: serverErrorObject.response.data.error.message
                            }
                        });
                    }
                });
            }, (errors) => {
                this.setState({
                    errors: errors
                });
            });
    }


    render() {
        return (

            <div className="container welcome">
                <div className="row">

                    <Welcome />
                    <div className="col-sm-12 col-md-6 col-lg-6">

                        <div className="row loginButtons">
                            <div className="col-md-6 form-group">
                                <button className="btn btn-primary"><Link to="/loginPage">Login</Link></button>
                            </div>
                            <div className="col-md-6 form-group">
                                <button className="btn btn-primary"><Link to="/registerPage">Register</Link></button>
                            </div>
                        </div>

                        <form className="homePageForm loginForm">
                            <input className="col-12" type="text" name="name" onChange={this.handleChange} placeholder="Name" value={this.state.name} /><br />
                            <div className="nameError text-danger">{this.state.errors.name}</div>
                            <input className="col-12" type="text" name="username" onChange={this.handleChange} placeholder="Username" value={this.state.username} /><br />
                            <div className="usernameError text-danger">{this.state.errors.username}</div>
                            <input className="col-12" type="email" name="email" onChange={this.handleChange} placeholder="Email" value={this.state.email} /><br />
                            <div className="emailError text-danger">{this.state.errors.email}</div>
                            <input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={this.state.password} /><br />
                            <div className="passwordLengthError text-danger">{this.state.errors.password}</div>
                            <input className="col-12" type="password" name="repeat" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={this.state.repeat} /><br />
                            <div className="passwordsError text-danger">{this.state.errors.repeat}</div>
                            <button className="btn btn-primary register" onClick={this.handleRegister}>Register</button>
                            <div className="fillFormsError text-danger">{this.state.errors.allFieldsError}</div>
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;


