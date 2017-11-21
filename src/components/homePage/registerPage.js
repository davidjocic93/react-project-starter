import React from "react";
import { Link } from "react-router-dom";
import AuthenticationService from "../../service/authenticationService";



class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.authService = new AuthenticationService();        
        this.state = {
            username: "",
            password: "",
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
            email: this.state.email,
            name: this.state.name,
            surname: this.state.surname

        };
        console.log(data);
        // this.props.onRegister(data);
        this.authService.register(data);
        
    }


    render() {
        return (
            <div className="col-6 container">

                <div className="row">
                    <h3 className="col-6"><Link to="/loginPage">Login</Link></h3>
                    <h3 className="col-6"><Link to="/registerPage">Register</Link></h3>
                </div>

                <form className="homePageForm">
                    Username<input type="text" name="username" onChange={this.handleChange} placeholder="Username" value={event.target.value}/><br />
                    Password<input type="password" name="password" onChange={this.handleChange} placeholder="Must be minimum 6 characters" value={event.target.value}/><br />
                    Email<input type="email" name="email" onChange={this.handleChange} placeholder="Email" value={event.target.value}/><br />
                    Name<input type="text" name="name" onChange={this.handleChange} placeholder="Name" value={event.target.value}/><br />
                    Surename<input type="text" name="surname" onChange={this.handleChange} placeholder="Surename" value={event.target.value}/><br />
                    <input type="button" onClick={this.handleRegister} value="Register" />
                </form>


            </div>
        );
    }
}

export default RegisterPage;


