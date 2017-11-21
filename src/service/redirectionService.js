export default class  RedirectionService {
 
    goTo(path) {

        window.location.assign(`#${path}`);

    }
}