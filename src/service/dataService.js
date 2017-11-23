import { communicationService } from "./communicationService";
import ProfileDTO from "../dto/profileDTO";

class DataService {
    constructor() { }

    getProfile(profileHandler) {
        communicationService.getRequest("/api/profile",
            (serverResponseData) => {
                console.table(serverResponseData.data);

                const name = serverResponseData.data.name;
                const avatarUrl = serverResponseData.data.avatarUrl;
                const postsCount = serverResponseData.data.postsCount;
                const commentsCount = serverResponseData.data.commentsCount;
                const about = serverResponseData.data.about;
                const aboutShort = serverResponseData.data.aboutShort;

                const profile = new ProfileDTO(name, avatarUrl, postsCount, commentsCount, about, aboutShort);
                

                profileHandler(profile);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    updateProfile(updateProfileData, errorHandler) {
        communicationService.putRequest("/api/Profiles", updateProfileData, (serverResponseData) => {
            if (serverResponseData.status >= 200 && serverResponseData.status < 300) {
                window.location.reload();
            }
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
            errorHandler(serverErrorObject);
        });
    }
}

export const dataService = new DataService();