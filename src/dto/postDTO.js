class PostDTO {
    constructor(dateCreated, id, text, type, userDisplayName, userId) {
        this._dateCreated = dateCreated;
        this._id = id;
        this._text = text;
        this._type = type;
        this._userDisplayName = userDisplayName;
        this._userId = userId;
    }

    get dateCreated() {
        return this._dateCreated;
    }
    get id() {
        return this._id;
    }

    get text() {
        return this._text;
    }

    get type() {
        return this._type;
    }

    get userDisplayName() {
        return this._userDisplayName;
    }

    get userId() {
        return this._userId;
    }

}

export default PostDTO;