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

    updateProfile(updateProfileData) {
        communicationService.putRequest("/api/Profiles", updateProfileData, (serverResponseData) => {
            console.log(serverResponseData);
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
        });
    }
}

export const dataService = new DataService();