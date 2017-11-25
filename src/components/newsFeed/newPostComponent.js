import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";



class NewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            postContent: ""
        };

        this.bindEventHandlers();

    }

    bindEventHandlers() {
        this.activateModal = this.activateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.savePost = this.savePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() { }




    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        console.log(event.target.value);
    }

    activateModal() {
        this.setState({
            isOpen: true
        });
    }

    closeModal() {
        this.setState({
            isOpen: false,
            postContent: ""
        });
    }

    savePost() {
        event.preventDefault();
        let data = {
            postContent: this.state.postContent,
        };
        console.log(data);

        dataService.newTextPost(data);
        this.closeModal();
    }


    render() {
        return (
            <div>
                <button type="button" className="newPost" onClick={this.activateModal}>
                    <img src="https://www.materialui.co/materialIcons/content/add_circle_grey_192x192.png" width="50px" />
                </button>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    // closeTimeoutMS={150}
                    isOpen={this.state.isOpen}
                // onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">New Text Post</h4>
                        </div>
                        <div className="modal-body">
                            Name: <textarea cols="50" rows="5" className="col-12" type="text" name="postContent" onChange={this.handleChange} value={this.state.postContent} /><br />
                            <div className="nameError text-danger"></div>
                            <div className="fieldsError text-danger"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.savePost}>Save post</button>
                        </div>
                    </div>
                </Modal>
            </div >
        );

    };
}


export default NewPost;