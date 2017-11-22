import { SESSION_ID } from "../constants";
import CommunicationService from "./communicationService";
import RedirectionService from "./redirectionService";
import SessionService from "./sessionService";

export default class AuthenticationService {
    constructor() {
        this.communicationService = new CommunicationService();
        this.redirectionService = new RedirectionService();
        this.sessionService = new SessionService();
    }

    isAuthenticated() {
        const sessionId = this.sessionService.getItem(SESSION_ID);
        return !!sessionId;
    }

    login(userData, errorHandler) {
        this.communicationService.postRequest("/api/login", userData,
            (serverResponseData) => {
                if (serverResponseData.status == "200") {
                    console.log(serverResponseData);
                    this.sessionService.setItem(SESSION_ID, serverResponseData.data.sessionId);
                    this.redirectionService.goTo("/");
                }
            }, (serverErrorObject) => {
                errorHandler(serverErrorObject);
            });
    }

    logOut() {
        this.sessionService.removeItem(SESSION_ID);
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
