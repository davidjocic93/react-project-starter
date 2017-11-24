class ProfileDTO {
    constructor(name, email, avatarUrl, postsCount, commentsCount, about, aboutShort, userId ) {
        this._name = name;
        this._email = email;
        this._avatarUrl = avatarUrl;
        this._postsCount = postsCount;
        this._commentsCount = commentsCount;
        this._about = about;
        this._aboutShort = aboutShort;
        this._userId = userId;
    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }
    

    get avatarUrl(){
        return this._avatarUrl;
    }

    get postsCount(){
        return this._postsCount;
    }

    get commentsCount(){
        return this._commentsCount;
    }

    get about(){
        return this._about;
    }

    get aboutShort(){
        return this._aboutShort;
    }

    get userId(){
        return this._userId;
    }

}

export default ProfileDTO;