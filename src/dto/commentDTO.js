class CommentDTO {
    constructor(id, dateCreated, body, postId, authorId) {
        this._id = id;
        this._dateCreated = dateCreated;
        this._body = body;
        this._postId = postId;
        this._authorId = authorId;
    }

    get id() {
        return this._id;
    }
    get dateCreated() {
        return this._dateCreated;
    }

    get body() {
        return this._body;
    }

    get postId() {
        return this._postId;
    }

    get authorId() {
        return this._authorId;
    }

}

export default CommentDTO;