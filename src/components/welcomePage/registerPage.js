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
        } else if (data.password.length < 6) {
            $(".passwordsError").text("");            
            $(".passwordLengthError").text("Password must be at least 6 characters long!");
        } else if (data.password != data.repeat) {
            $(".passwordLengthError").text("");
            $(".passwordsError").text("Passwords do not match");
        } else {
            this.authService.register(data);
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
                        <div className="usernameError"></div>
                        Email<input className="col-12" type="email" name="email" onChange={this.handleChange} placeholder="Email" value={event.target.value} /><br />
                        <div className="emailError"></div>
                        Password<input className="col-12" type="password" name="password" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                        <div className="passwordLengthError"></div>
                        Repeat password<input className="col-12" type="password" name="repeat" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value} /><br />
                        <div className="passwordsError"></div>
                        <input className="btn btn-primary" type="button" onClick={this.handleRegister} value="Register" />
                        <div className="fillFormsError"></div>
                    </form>


                </div>
            </div>
        );
    }
}

export default RegisterPage;


