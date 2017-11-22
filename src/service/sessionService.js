export default class SessionService {

    setItem(key, value) {
        sessionStorage.setItem(key, value);
    }

    removeItem(key) {
        sessionStorage.removeItem(key);
    }

    getItem(key) {
        return sessionStorage.getItem(key);
    }

}