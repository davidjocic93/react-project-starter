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

    updateProfile(updateProfileData, successHandler, errorHandler) {
        communicationService.putRequest("/api/Profiles", updateProfileData, (serverResponseData) => {
            successHandler(serverResponseData);
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

    getPosts(postsHandler) {
        let posts = [];
        communicationService.getRequest("/api/Posts",
            (serverResponseData) => {
                console.table(serverResponseData.data);

                serverResponseData.data.forEach(element => {
                    const id = element.id;
                    const dateCreated = element.dateCreated;
                    const userId = element.userId;
                    const userDisplayName = element.userDisplayName;
                    const type = element.type;
                    const text = element.text;

                    const post = new PostDTO(id, dateCreated, userId, userDisplayName, type, text);

                    posts.push(post);
                });

                postsHandler(posts);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    newPost(type, postData) {
        communicationService.postRequest(`/api/${type}Posts`, postData,
            (serverResponseData) => {
                console.log(serverResponseData);
            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    getSinglePost (type, postId, successHandler) {
        communicationService.getRequest(`/api/${type}Posts/${postId}`, (serverResponseData) => {
            successHandler(serverResponseData);
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
        });
    }



}

export const dataService = new DataService();