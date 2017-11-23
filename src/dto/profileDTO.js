class ProfileDTO {
    constructor(name, avatarUrl, postsCount, commentsCount, about, aboutShort ) {
        this._name = name;
        this._avatarUrl = avatarUrl;
        this._postsCount = postsCount;
        this._commentsCount = commentsCount;
        this._about = about;
        this._aboutShort = aboutShort;
    }

    get name(){
        return this._name;
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

}

export default ProfileDTO;