import React from "react";
import {authenticationService} from "./authenticationService";
import {dataService} from "./dataService";

class ValidationService {

    validateRegistration (data) {
        let reg = /\S+@\S+\.\S+/;                
        if (data.username == "" || data.password == "" || data.email == "" || data.name == "" || data.repeat == "") {
            $(".fillFormsError").text("Please fill all fields");
            $(".emailError").text("");
            $(".passwordLengthError").text("");
            $(".passwordsError").text("");
        } else if (!reg.test(data.email)) {
            $(".emailError").text("Please provide proper email!");
            $(".fillFormsError").text("");
        } else if (data.password.length < 6) {
            $(".passwordsError").text("");
            $(".passwordLengthError").text("Password must be at least 6 characters long!");
            $(".emailError").text("");
            $(".fillFormsError").text("");
        } else if (data.password != data.repeat) {
            $(".passwordLengthError").text("");
            $(".passwordsError").text("Passwords do not match");
            $(".emailError").text("");
            $(".fillFormsError").text("");            
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

    validateLogin (data) {
        if (data.username == "" || data.password == "") {
            $(".loginError").text("Please fill all fields");
        } else {
            authenticationService.login(data, (serverErrorObject) => {
                console.log(serverErrorObject);
                $(".loginError").text("Server error. Contact your network administrator");
                if (serverErrorObject.response.status == 400) {
                    $(".loginError").text(`${serverErrorObject.response.data.error.message}`);
                    console.log(serverErrorObject.response);
                }
            });
        }
    }

    validateEditProfile (data) {
        let reg = /\S+@\S+\.\S+/;        
        if (data.about == "" || data.aboutShort == "" || data.email == "" || data.name == "" || data.avatarUrl == "") {
            $(".fieldsError").text("Please fill all fields");
            $(".nameError").text("");
            $(".emailError").text("");
            $(".shortError").text("");
            $(".aboutError").text("");
            $(".avatarError").text("");
        } else if (!reg.test(data.email)) {
            $(".emailError").text("Please provide proper email!");
            $(".fieldsError").text("");
        } else if (!data.avatarUrl.includes("https://")) {
            $(".avatarError").text("Please provide proper link for avatar!");
            $(".fieldsError").text("");
        } else {
            dataService.updateProfile(data, (serverErrorObject) => {
                this.closeModal();
                alert("Something went wrong!");
            });
            this.closeModal();
        }
    }
}

export const validationService = new ValidationService();
