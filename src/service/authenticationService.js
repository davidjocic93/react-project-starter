import { SESSION_ID } from "../constants";
import {communicationService} from "./communicationService";
import {redirectionService} from "./redirectionService";
import {sessionService} from "./sessionService";

export default class AuthenticationService {
    constructor() {}

    isAuthenticated() {
        const sessionId = sessionService.getItem(SESSION_ID);
        return !!sessionId;
    }

    login(userData, errorHandler) {
        communicationService.postRequest("/api/login", userData,
            (serverResponseData) => {
                if (serverResponseData.status == "200") {
                    console.log(serverResponseData);
                    sessionService.setItem(SESSION_ID, serverResponseData.data.sessionId);
                    redirectionService.goTo("/");
                }
            }, (serverErrorObject) => {
                errorHandler(serverErrorObject);
            });
    }

    logOut() {
        sessionService.removeItem(SESSION_ID);
        redirectionService.goTo("/loginPage");
    }

    register(registerData, errorHandler) {
        communicationService.postRequest("/api/register", registerData,
            (serverResponseData) => {

                console.log(serverResponseData);
                redirectionService.goTo("/loginPage");

            }, (serverErrorObject) => {
                errorHandler(serverErrorObject);

            });
    }
}
