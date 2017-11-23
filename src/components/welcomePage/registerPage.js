import React from "react";
import { Link } from "react-router-dom";
import {authenticationService} from "../../service/authenticationService";
import Welcome from "./welcome";




class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            repeat: "",
            email: "",
            name: ""
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
        console.log(event.target.value);
    }


    handleRegister(event) {
        event.preventDefault();
        let data = {
            username: this.state.username,
            password: this.state.password,
            repeat: this.state.repeat,
            email: this.state.email,
            name: this.state.name,
        };
        console.log(data);
        // this.props.onRegister(data);
        if (data.username == "" || data.password == "" || data.email == "" || data.name == "" || data.repeat == "") {
            $(".fillFormsError").text("Please fill all fields");
        } else if (!data.email.includes("@") || !data.email.includes(".com")) {
            $(".emailError").text("Please provide proper email!");
            $(".fillFormsError").text("");
        } else if (data.password.length < 6) {
            $(".passwordsError").text("");
            $(".passwordLengthError").text("Password must be at least 6 characters long!");
            $(".emailError").text("");
        } else if (data.password != data.repeat) {
            $(".passwordLengthError").text("");
            $(".passwordsError").text("Passwords do not match");
            $(".emailError").text("");
        } else {
            authenticationService.register(data, (serverErrorObject) => {
                $(".passwordsError").text("");
                $(".fillFormsError").text("Server error. Contact your network administrator");
                if (serverErrorObject.response.status == 400) {
                    $(".fillFormsError").text("");
                    $(".usernameError").text(`${serverErrorObject.response.data.error.message}`);
                    console.log(serverErrorObject.response.data.error.message);
                }
            });
        }

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
                            <input className="col-12" type="text" name="name" onChange={this.handleChange} placeholder="Name" value={event.target.value} /><br />
                            <input className="col-12" type="text" name="username" onChange={this.handleChange} placeholder="Username" value={event.target.value} /><br />
                            <div className="usernameError text-danger"></div>
                            <input className="col-12" type="email" name="email" onChange={this.handleChange} placeholder="Email" value={event.target.value} /><br />
                            <div className="emailError text-danger"></div>
                            <input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                            <div className="passwordLengthError text-danger"></div>
                            <input className="col-12" type="password" name="repeat" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                            <div className="passwordsError text-danger"></div>
                            <button className="btn btn-primary register" onClick={this.handleRegister}>Register</button>
                            <button className="btn btn-primary" type="reset" value="Reset">Reset</button>
                            <div className="fillFormsError text-danger"></div>
                        </form>


                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPage;


