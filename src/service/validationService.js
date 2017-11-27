
class ValidationService {

    isLoginFormValid(data, successCallback, failureCallback) {
        if (!this.hasAllRequiredFields(data)) {
            const error = "All fields must be filled out!";
            failureCallback(error);
        }
        successCallback(data);
    }


    isRegisterFormValid(data, successCallback, failureCallback) {

        const errors = {};

        if (!this.hasAllRequiredFields(data)) {
            const error = "All fields must be filled out!";
            errors.allFieldsError = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isNameValid(data)) {
            const error = "Name must contain first and last name!";
            errors.name = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isUsernameValid(data)) {
            const error = "Username must be longer than 3 characters!";
            errors.username = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isEmailValid(data)) {
            const error = "Email is not in valid format!";
            errors.email = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isPasswordValid(data)) {
            const error = "Password must be longer than 6 characters!";
            errors.password = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isPasswordConfirm(data)) {
            const error = "Passwords must match!";
            errors.repeat = error;
            failureCallback(errors);
            return false;
        }

        successCallback(data);

    }

    isEditFormValid(data, successCallback, failureCallback) {

        const errors = {};

        if (!this.hasAllRequiredFields(data)) {
            const error = "All fields must be filled out!";
            errors.allFieldsError = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isNameValid(data)) {
            const error = "Name must contain first and last name!";
            errors.name = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isEmailValid(data)) {
            const error = "Email is not in valid format!";
            errors.email = error;
            failureCallback(errors);
            return false;
        }

        if (!this.isLinkValid(data)) {
            const error = "Link is not in valid format!";
            errors.link = error;
            failureCallback(errors);
            return false;
        }

        successCallback(data);

    }

    hasAllRequiredFields(data) {
        for (let key in data) {
            if (data[key] === "") {
                return false;
            }
        }
        return true;
    }

    isPasswordValid(data) {
        if (data.password.length < 6) {
            console.log("Pass error!");
            return false;
        }
        return true;
    }

    isPasswordConfirm(data) {
        if (data.password != data.repeat) {
            console.log("Passwords must match");
            return false;
        }
        return true;
    }

    isUsernameValid(data) {
        if (data.username.length < 3) {
            console.log("Username error!");
            return false;
        }
        return true;
    }
    isNameValid(data) {
        const res = data.name.split(" ");
        for (const key in res) {
            if (res.length < 2 || res[key].length < 2) {
                console.log("Name error!");
                return false;
            }
        }
        return true;
    }
    isEmailValid(data) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isOK = re.test(data.email);
        return isOK;
    }

    isLinkValid(data) {
        const re = /^(ftp|http|https):\/\/[^ "]+$/;
        const isOK = re.test(data.avatarUrl);
        return isOK;
    }

}



export const validationService = new ValidationService();

