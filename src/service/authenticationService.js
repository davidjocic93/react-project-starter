import { SESSION_ID } from "../constants";
import CommunicationService from "./communicationService";
import RedirectionService from "./redirectionService";

export default class AuthenticationService {
    constructor() {
        this.communicationService = new CommunicationService();
        this.redirectionService = new RedirectionService();
    }

    isAuthenticated() {
        const sessionId = sessionStorage.getItem(SESSION_ID);
        return !!sessionId;
    }

    login(userData) {
        this.communicationService.postRequest("/api/login", userData,
            (serverResponseData) => {
                if (serverResponseData.status == "200") {
                    console.log(serverResponseData);
                    sessionStorage.setItem("sessionId", serverResponseData.data.sessionId);
                    this.redirectionService.goTo("/");
                }
            }, (serverErrorObject) => {
                console.log(serverErrorObject);
                $(".loginError").text("Server error. Contact your network administrator");
                if (serverErrorObject.response.status == 400) {
                    $(".loginError").text(`${serverErrorObject.response.data.error.message}`);
                    console.log(serverErrorObject.response);
                }

            });
    }

    logOut() {
        sessionStorage.removeItem(SESSION_ID);
        this.redirectionService.goTo("/loginPage");
    }

    register(registerData) {
        this.communicationService.postRequest("/api/register", registerData,
            (serverResponseData) => {

                console.log(serverResponseData);
                this.redirectionService.goTo("/loginPage");

            }, (serverErrorObject) => {
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
