import { communicationService } from "./communicationService";
import ProfileDTO from "../dto/profileDTO";
import UserDTO from "../dto/userDTO";
import TextPostDTO from "../dto/textPostDTO";
import ImagePostDTO from "../dto/imagePostDTO";
import VideoPostDTO from "../dto/videoPostDTO";
import CommentDTO from "../dto/commentDTO";

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
                console.table(serverResponseData);

                serverResponseData.data.forEach(element => {
                    
                    if (element.type == "text") {
                        const id = element.id;
                        const dateCreated = element.dateCreated;
                        const userId = element.userId;
                        const userDisplayName = element.userDisplayName;
                        const type = element.type;
                        const text = element.text;
                        const commentsNum = element.commentsNum;


                        const textPost = new TextPostDTO(id, dateCreated, userId, userDisplayName, type, text, commentsNum);

                        posts.push(textPost);

                    } else if (element.type == "image") {

                        const id = element.id;
                        const dateCreated = element.dateCreated;
                        const userId = element.userId;
                        const userDisplayName = element.userDisplayName;
                        const type = element.type;
                        const text = element.text;
                        const commentsNum = element.commentsNum;
                        const imageUrl = element.imageUrl;

                        const imagePost = new ImagePostDTO(id, dateCreated, userId, userDisplayName, type, text, commentsNum, imageUrl);

                        posts.push(imagePost);

                    } else if (element.type == "video") {

                        const id = element.id;
                        const dateCreated = element.dateCreated;
                        const userId = element.userId;
                        const userDisplayName = element.userDisplayName;
                        const type = element.type;
                        const text = element.text;
                        const commentsNum = element.commentsNum;
                        const videoUrl = element.videoUrl;

                        const videoPost = new VideoPostDTO(id, dateCreated, userId, userDisplayName, type, text, commentsNum, videoUrl);

                        posts.push(videoPost);
                    }
                });

                postsHandler(posts);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    newPost(type, postData, successHandler) {
        communicationService.postRequest(`/api/${type}Posts`, postData,
            (serverResponseData) => {
                successHandler(serverResponseData);
            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    getSinglePost(type, postId, successHandler) {
        communicationService.getRequest(`/api/${type}Posts/${postId}`, (serverResponseData) => {
            successHandler(serverResponseData);
        }, (serverErrorObject) => {
            console.log(serverErrorObject);
        });
    }

    getComments(commentsHandler) {
        const comments = [];
        communicationService.getRequest("/api/Comments",
            (serverResponseData) => {

                serverResponseData.data.forEach(element => {
                    const id = element.id;
                    const dateCreated = element.dateCreated;
                    const text = element.text;
                    const postId = element.postId;
                    const authorId = element.authorId;

                    const comment = new CommentDTO(id, dateCreated, text, postId, authorId);

                    comments.push(comment);
                });

                commentsHandler(serverResponseData);

            }, (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }

    newComment(data, successHandler) {
        communicationService.postRequest("/api/Comments", data,
            (serverResponseData) => {
                successHandler(serverResponseData);
            },
            (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }



}

export const dataService = new DataService();