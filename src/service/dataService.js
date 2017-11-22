import { communicationService } from "./communicationService";

class DataService {
    constructor() { }

    getProfile() {
        communicationService.getRequest("/api/profile",
            (serverResponseData) => {
                console.table(serverResponseData.data);

                

            }, (serverErrorObject) => {
                console.log(error);
            });
    }
}

export const dataService = new DataService();