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
                    this.redirectionService.goTo("/mainPage");
                }
            }, (error) => {
                console.log(error);
            });
    }

    logOut() {
        sessionStorage.removeItem(SESSION_ID);
        this.redirectionService.goTo("/loginPage");
    }

    register(registerData) {
        this.communicationService.postRequest("/api/register", registerData,
            (serverResponseData) => {
                if (serverResponseData.status == "202") {
                    console.log(serverResponseData);
                    this.redirectionService.goTo("/");
                }
            }, (error) => {
                console.log(error);
            });
    }
}
