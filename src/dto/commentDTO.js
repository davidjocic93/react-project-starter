class CommentDTO {
    constructor(id, dateCreated, text, postId, authorId) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._text = text;
        this._postId = postId;
        this._authorId = authorId;
    }

    get id() {
        return this._id;
    }
    get dateCreated() {
        return this._dateCreated;
    }

    get text() {
        return this._text;
    }

    get postId() {
        return this._postId;
    }

    get authorId() {
        return this._authorId;
    }

}

export default CommentDTO;