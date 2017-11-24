import { communicationService } from "./communicationService";
import ProfileDTO from "../dto/profileDTO";
import UserDTO from "../dto/userDTO";

class DataService {
    constructor() { }

    getProfile(profileHandler) {
        communicationService.getRequest("/api/profile",
            (serverResponseData) => {
                console.table(serverResponseData.data);

                const name = serverResponseData.data.name;
                const email = serverResponseData.data.email;
                const avatarUrl = serverResponseData.data.avatarUrl;
                const postsCount = serverResponseData.data.postsCount;
                const commentsCount = serverResponseData.data.commentsCount;
                const about = serverResponseData.data.about;
                const aboutShort = serverResponseData.data.aboutShort;

                const profile = new ProfileDTO(name, email, avatarUrl, postsCount, commentsCount, about, aboutShort);


                profileHandler(profile);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    getUserProfile(id, profileHandler) {
        communicationService.getRequest(`/api/users/${id}` ,
            (serverResponseData) => {
                console.table(serverResponseData.data);

                const name = serverResponseData.data.name;
                const email = serverResponseData.data.email;
                const avatarUrl = serverResponseData.data.avatarUrl;
                const postsCount = serverResponseData.data.postsCount;
                const commentsCount = serverResponseData.data.commentsCount;
                const about = serverResponseData.data.about;
                const aboutShort = serverResponseData.data.aboutShort;

                const profile = new ProfileDTO(name, email, avatarUrl, postsCount, commentsCount, about, aboutShort);


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

    getPeople(peopleHandler) {
        let users = [];
        communicationService.getRequest("/api/users",
            (serverResponseData) => {
                console.table(serverResponseData.data);

                serverResponseData.data.forEach(element => {
                    const id = element.id;
                    const name = element.name;
                    const aboutShort = element.aboutShort;
                    const avatarUrl = element.avatarUrl;
                    const lastPostDate = element.lastPostDate;

                    const user = new UserDTO(id, name, aboutShort, avatarUrl, lastPostDate);

                    users.push(user);
                });

                peopleHandler(users);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

}

export const dataService = new DataService();