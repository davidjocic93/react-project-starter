import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { validationService } from "../../service/validationService";
import { redirectionService } from "../../service/redirectionService";
import PropTypes from "prop-types";




class NewPostComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            textModalOpen: false,
            imageModalOpen: false,
            videoModalOpen: false,
            text: "",
            imageUrl: "",
            videoUrl: "",
            visibility: "hidden",
            errors: {
                allFields: "",
                link: ""
            }
        };

        this.bindEventHandlers();

    }

    bindEventHandlers() {
        this.activateTextModal = this.activateTextModal.bind(this);
        this.activateImageModal = this.activateImageModal.bind(this);
        this.activateVideoModal = this.activateVideoModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveTextPost = this.saveTextPost.bind(this);
        this.saveImagePost = this.saveImagePost.bind(this);
        this.saveVideoPost = this.saveVideoPost.bind(this);
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
            visibility: "hidden",
            errors: {}
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

    saveTextPost() {
        event.preventDefault();

        let text = {
            text: this.state.text
        };

        validationService.isTextPostValid(text,
            (text) => {
                dataService.newPost("Text", text);
                this.closeModal();
                this.setState({
                    text: "",
                    imageUrl: "",
                    videoUrl: ""
                });
                this.props.reloadFeed();
            },
            (error) => {
                this.setState({
                    errors: {
                        allFields: error
                    }
                });
            });
    }

    saveImagePost() {
        event.preventDefault();

        let imageUrl = {
            imageUrl: this.state.imageUrl
        };

        validationService.isImagePostValid(imageUrl,
            (imageUrl) => {
                dataService.newPost("Image", imageUrl);
                this.closeModal();
                this.setState({
                    text: "",
                    imageUrl: "",
                    videoUrl: ""
                });
                this.props.reloadFeed();
            },
            (errors) => {
                this.setState({
                    errors: errors
                });
            });
    }

    saveVideoPost() {
        event.preventDefault();

        let videoUrl = {
            videoUrl: this.state.videoUrl
        };

        validationService.isVideoPostValid(videoUrl,
            (videoUrl) => {
                dataService.newPost("Video", videoUrl);
                this.closeModal();
                this.setState({
                    text: "",
                    imageUrl: "",
                    videoUrl: ""
                });
                this.props.reloadFeed();
            },
            (errors) => {
                this.setState({
                    errors: errors
                });
            });
    }


    render() {

        return (
            <div>
                <button type="button" className="initialNewPost" onClick={this.hideShowButtons}>
                    New Post
                </button>
                <div style={{ visibility: this.state.visibility }}>
                    <button type="button" className="newTextPost" onClick={this.activateTextModal}>
                        New Text Post
                    </button>
                    <button type="button" className="newImagePost" onClick={this.activateImageModal}>
                        New Image Post
                    </button>
                    <button type="button" className="newVideoPost" onClick={this.activateVideoModal}>
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
                            Post content: <textarea cols="50" rows="5" className="col-12" type="text" name="text" onChange={this.handleChange} value={this.state.text} /><br />
                            <div className="fieldsError text-danger">{this.state.errors.allFields}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveTextPost}>Save post</button>
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
                            <h4 className="modal-title">New Image Post</h4>
                        </div>
                        <div className="modal-body">
                            Image URL: <textarea cols="10" rows="2" className="col-12" type="text" name="imageUrl" onChange={this.handleChange} value={this.state.imageUrl} /><br />
                            <div className="nameError text-danger">{this.state.errors.allFields}</div>
                            <div className="fieldsError text-danger">{this.state.errors.link}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveImagePost}>Save post</button>
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
                            <h4 className="modal-title">New Video Post</h4>
                        </div>
                        <div className="modal-body">
                            Youtube video URL: <textarea cols="10" rows="2" className="col-12" type="text" name="videoUrl" onChange={this.handleChange} value={this.state.videoUrl} /><br />
                            <div className="nameError text-danger">{this.state.errors.allFields}</div>
                            <div className="fieldsError text-danger">{this.state.errors.link}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveVideoPost}>Save post</button>
                        </div>
                    </div>
                </Modal>
            </div >
        );

    };
}

NewPostComponent.propTypes = {
    reloadFeed: PropTypes.function,
};

export default NewPostComponent;

