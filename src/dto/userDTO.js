class UserDTO {
    constructor(name, avatarUrl, lastPostDate, aboutShort, id ) {
        this._name = name;
        this._aboutShort = aboutShort;
        this._lastPostDate = lastPostDate;
        this._avatarUrl = avatarUrl;
        this._id = id;
    }

    get name(){
        return this._name;
    }

    get aboutShort(){
        return this._aboutShort;
    }

    get lastPostDate(){
        return this._lastPostDate;
    }
    
    get avatarUrl(){
        return this._avatarUrl;
    }

    get id(){
        return this._id;
    }


}

export default UserDTO;