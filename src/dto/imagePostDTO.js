class ImagePostDTO {
    constructor(id, dateCreated, userId, userDisplayName, type, text, commentsNum, imageUrl) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._userId = userId;
        this._userDisplayName = userDisplayName;
        this._type = type;
        this._text = text;
        this._commentsNum = commentsNum;
        this._imageUrl = imageUrl;
    }

    get id() {
        return this._id;
    }
    get dateCreated() {
        return this._dateCreated;
    }

    get userId() {
        return this._userId;
    }

    get userDisplayName() {
        return this._userDisplayName;
    }

    get type() {
        return this._type;
    }

    get text() {
        return this._text;
    }

    get commentsNum() {
        return this._commentsNum;
    }

    get imageUrl() {
        return this._imageUrl;
    }

}

export default ImagePostDTO;