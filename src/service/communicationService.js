import { BASE_URL, API_KEY, SESSION_ID } from "../constants";
import axios from "axios";

class CommunicationService {
    constructor() { }

    createHeaders() {

        let sessionId = sessionStorage.getItem(SESSION_ID);

        if (sessionId) {
            return {
                "Key": API_KEY,
                "SessionId": sessionId
            };
        }

        return {
            "Key": API_KEY
        };
    }

    getRequest(url, getDataHandler, errorHandler) {
        const requestUrl = `${BASE_URL}${url}`;


        axios.get(requestUrl, {
            headers: this.createHeaders()
        })
            .then(response => getDataHandler(response))
            .catch((error) => errorHandler(error));
    }

    postRequest(url, postData, postDataHandler, errorHandler) {

        const requestUrl = `${BASE_URL}${url}`;

        axios.post(requestUrl, postData, {
            headers: this.createHeaders()
        })
            .then(response => postDataHandler(response))
            .catch((error) => errorHandler(error));

    }

    putRequest(url, postData, dataHandler, errorHandler) {

        const requestUrl = `${BASE_URL}${url}`;

        axios.put(requestUrl, postData, {
            headers: this.createHeaders()
        })
            .then(response => dataHandler(response))
            .catch((error) => errorHandler(error));

    }

    deleteRequest(url, deleteHandler, errorHandler) {

        const requestUrl = `${BASE_URL}${url}`;

        axios.delete(requestUrl,  {
            headers: this.createHeaders()
        })
            .then(response => deleteHandler(response))
            .catch(error => errorHandler(error));

    }


}

export const communicationService = new CommunicationService();
