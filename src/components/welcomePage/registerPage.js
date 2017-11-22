import React from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../service/authenticationService";
import Welcome from "./welcome";




class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService();
        this.state = {
            username: "",
            password: "",
            repeat: "",
            email: "",
            name: "",
            surname: ""
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
        } else if (!data.email.includes("@")) {
            $(".emailError").text("Email must contain @ character!");
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
            this.authService.register(data, (serverErrorObject) => {
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

            <div className="row">

                <Welcome />
                <div className="col-6 container">

                    <div className="row">
                        <h3 className="col-6"><Link to="/loginPage">Login</Link></h3>
                        <h3 className="col-6"><Link to="/registerPage">Register</Link></h3>
                    </div>

                    <form className="homePageForm">
                        Name<input className="col-12" type="text" name="name" onChange={this.handleChange} placeholder="Name" value={event.target.value} /><br />
                        Username<input className="col-12" type="text" name="username" onChange={this.handleChange} placeholder="Username" value={event.target.value} /><br />
                        <div className="usernameError error"></div>
                        Email<input className="col-12" type="email" name="email" onChange={this.handleChange} placeholder="Email" value={event.target.value} /><br />
                        <div className="emailError error"></div>
                        Password<input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                        <div className="passwordLengthError error"></div>
                        Repeat password<input className="col-12" type="password" name="repeat" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                        <div className="passwordsError error"></div>
                        <input className="btn btn-primary" type="button" onClick={this.handleRegister} value="Register" />
                        <div className="fillFormsError error"></div>
                    </form>


                </div>
            </div>
        );
    }
}

export default RegisterPage;


