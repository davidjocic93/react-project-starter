import React from "react";
import { BASE_URL, API_KEY } from "../constants";

class CommunicationService {
    constructor() {
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        this.getRequest = this.getRequest.bind(this);
        this.postRequest = this.postRequest.bind(this);
        this.createHeaders = this.createHeaders.bind(this);
    }


    createHeaders() {
        
        const requestHeaders = {
            "Content-type": "application/json; charset=UTF-8",
            "Key": API_KEY
        };

        const sessionId = sessionStorage.getItem(SESSION_ID);


        if(sessionId) {
            const requestHeaders = {
                "Content-type": "application/json; charset=UTF-8",
                "Key": API_KEY,
                "SessionID": sessionId
            };
            return requestHeaders;
        }

        return requestHeaders;
    }

    getRequest(url, getDataHandler, errorHandler) {

        const requestUrl = `${BASE_URL}/${url}`;


        fetch(requestUrl, {
            method: "get",
            headers: this.createHeaders()
        })
            .then(response => response.json())
            .then(response => getDataHandler(response))
            .catch((error) => errorHandler(error));
    }

    postRequest(url, postData, postDataHandler, errorHandler) {

        const requestUrl = `${BASE_URL}/${url}`;


        fetch(requestUrl, {
            method: "post",
            body: JSON.stringify(postData),
            headers: this.createHeaders()
        })
            .then(response => response.json())
            .then(response => postDataHandler(response))
            .catch((error) =>  errorHandler(error));

    }

}

export default CommunicationService;
