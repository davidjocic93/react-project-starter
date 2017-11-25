import { communicationService } from "./communicationService";
import ProfileDTO from "../dto/profileDTO";
import UserDTO from "../dto/userDTO";
import PostDTO from "../dto/postDTO";

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
                const userId = serverResponseData.data.userId;

                const profile = new ProfileDTO(name, email, avatarUrl, postsCount, commentsCount, about, aboutShort, userId);


                profileHandler(profile);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    getUserProfile(id, profileHandler) {
        communicationService.getRequest(`/api/users/${id}`,
            (serverResponseData) => {
                console.table(serverResponseData.data);

                const name = serverResponseData.data.name;
                const email = serverResponseData.data.email;
                const avatarUrl = serverResponseData.data.avatarUrl;
                const postsCount = serverResponseData.data.postsCount;
                const commentsCount = serverResponseData.data.commentsCount;
                const about = serverResponseData.data.about;
                const aboutShort = serverResponseData.data.aboutShort;
                const userId = serverResponseData.data.userId;

                const profile = new ProfileDTO(name, email, avatarUrl, postsCount, commentsCount, about, aboutShort, userId);


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

    newTextPost (textPostData) {
        communicationService.postRequest ("/api/TextPosts", textPostData, (serverResponseData) => {
            console.log(serverResponseData);
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
        });
    }

    getPosts(postsHandler) {
        let posts = [];
        communicationService.getRequest("/api/Posts",
            (serverResponseData) => {

                serverResponseData.data.forEach(element => {
                    const dateCreated = element.dateCreated;
                    const id = element.id;
                    const text = element.text;
                    const type = element.type;
                    const userDisplayName = element.userDisplayName;
                    const userId = element.userId;

                    const post = new PostDTO(dateCreated, id, text, type, userDisplayName, userId);

                    posts.push(post);
                });

                postsHandler(posts);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

}

export const dataService = new DataService();