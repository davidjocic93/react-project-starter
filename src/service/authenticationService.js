import CommunicationService from "./communicationService";

class AuthenticationService {
    constructor() {
        this.communicationService = new CommunicationService();
    }

    // login(userData) {
    //     this.communicationService.postRequest("/api/login", userData,
    //         (data) => {
    //             console.log(data);
    //         }, (error) => {
    //             console.log(error);
    //         });
    // }

    login(userData) {
        this.communicationService.postRequest("/api/login", userData,
            (data) => {
                console.log(data);
            }, (error) => {
                console.log(error);
            });
    }


}

export default AuthenticationService;