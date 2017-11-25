import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";



class NewPost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textModalOpen: false,
            imageModalOpen: false,
            videoModalOpen: false,
            textPostContent: "",
            imagePostContent: "",
            videoPostContent: "",
            visibility: "hidden"
        };

        this.bindEventHandlers();

    }

    bindEventHandlers() {
        this.activateTextModal = this.activateTextModal.bind(this);
        this.activateImageModal = this.activateImageModal.bind(this);
        this.activateVideoModal = this.activateVideoModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.savePost = this.savePost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.hideShowButtons = this.hideShowButtons.bind(this);
    }

    componentDidMount() { }




    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
        console.log(event.target.value);
    }

    activateTextModal() {
        this.setState({
            textModalOpen: true
        });
    }

    activateImageModal() {
        this.setState({
            imageModalOpen: true
        });
    }

    activateVideoModal() {
        this.setState({
            videoModalOpen: true
        });
    }

    closeModal() {
        this.setState({
            textModalOpen: false,
            imageModalOpen: false,
            videoModalOpen: false,
            visibility: "hidden"
        });
    }

    hideShowButtons() {
        this.setState({
            visibility: ""
        });
        if (this.state.visibility == "") {
            this.setState({
                visibility: "hidden"
            });
        }
    }

    savePost() {
        event.preventDefault();
        let textPostData = {
            textPostContent: this.state.textPostContent,
        };
        console.log(textPostData);

        let imagePostData = {
            imagePostContent: this.state.imagePostContent,
        };
        console.log(imagePostData);

        let videoPostData = {
            videoPostContent: this.state.videoPostContent,
        };
        console.log(videoPostData);

        if (this.state.textPostContent) {
            dataService.newPost("Text", textPostData);
            this.closeModal();
            this.setState({
                textPostContent: "",
                imagePostContent: "",
                videoPostContent: ""
            });
        } else if (this.state.imagePostContent) {
            dataService.newPost("Image", imagePostData);
            this.closeModal();
            this.setState({
                textPostContent: "",
                imagePostContent: "",
                videoPostContent: ""
            });
        } else if (this.state.videoPostContent) {
            dataService.newPost("Video", videoPostData);
            this.closeModal();
            this.setState({
                textPostContent: "",
                imagePostContent: "",
                videoPostContent: ""
            });
        }
    }


    render() {
        return (
            <div>
                <button type="button" className="newPost" onClick={this.hideShowButtons}>
                    New Post
                </button>
                <div style={{visibility: this.state.visibility}}>
                    <button type="button" className="newPost" onClick={this.activateTextModal}>
                        New Text Post
                    </button>
                    <button type="button" className="newPost" onClick={this.activateImageModal}>
                        New Image Post
                    </button>
                    <button type="button" className="newPost" onClick={this.activateVideoModal}>
                        New Video Post
                    </button>
                </div>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    // closeTimeoutMS={150}
                    isOpen={this.state.textModalOpen}
                // onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">New Text Post</h4>
                        </div>
                        <div className="modal-body">
                            Post content: <textarea cols="50" rows="5" className="col-12" type="text" name="textPostContent" onChange={this.handleChange} value={this.state.textPostContent} /><br />
                            <div className="nameError text-danger"></div>
                            <div className="fieldsError text-danger"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.savePost}>Save post</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    // closeTimeoutMS={150}
                    isOpen={this.state.imageModalOpen}
                // onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">New Text Post</h4>
                        </div>
                        <div className="modal-body">
                            Image URL: <textarea cols="10" rows="2" className="col-12" type="text" name="imagePostContent" onChange={this.handleChange} value={this.state.imagePostContent} /><br />
                            <div className="nameError text-danger"></div>
                            <div className="fieldsError text-danger"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.savePost}>Save post</button>
                        </div>
                    </div>
                </Modal>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    // closeTimeoutMS={150}
                    isOpen={this.state.videoModalOpen}
                // onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">New Text Post</h4>
                        </div>
                        <div className="modal-body">
                            Youtube video URL: <textarea cols="10" rows="2" className="col-12" type="text" name="videoPostContent" onChange={this.handleChange} value={this.state.videoPostContent} /><br />
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