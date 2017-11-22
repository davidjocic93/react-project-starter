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

    login(userData, errorHandler) {
        this.communicationService.postRequest("/api/login", userData,
            (serverResponseData) => {
                if (serverResponseData.status == "200") {
                    console.log(serverResponseData);
                    sessionStorage.setItem("sessionId", serverResponseData.data.sessionId);
                    this.redirectionService.goTo("/");
                }
            }, (serverErrorObject) => {
                errorHandler(serverErrorObject);
            });
    }

    logOut() {
        sessionStorage.removeItem(SESSION_ID);
        this.redirectionService.goTo("/loginPage");
    }

    register(registerData, errorHandler) {
        this.communicationService.postRequest("/api/register", registerData,
            (serverResponseData) => {

                console.log(serverResponseData);
                this.redirectionService.goTo("/loginPage");

            }, (serverErrorObject) => {
                errorHandler(serverErrorObject);

            });
    }
}
