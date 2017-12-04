import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { validationService } from "../../service/validationService";
import { redirectionService } from "../../service/redirectionService";
import PropTypes from "prop-types";
import ReactFileReader from "react-file-reader";

class EditProfile extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            isOpen: false,
            about: "",
            aboutShort: "",
            avatarUrl: "",
            email: "",
            name: "",
            file: null,
            imagePreviewUrl: "",
            errors: {
                name: "",
                email: "",
                allFieldsError: "",
                link: ""
            }
        };

        this.bindEventHandlers();

    }


    bindEventHandlers() {

        this.activateModal = this.activateModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
    }


    componentDidMount() {

        dataService.getProfile(
            (profile) => {
                this.setState({
                    name: profile.name,
                    email: profile.email,
                    avatarUrl: profile.avatarUrl,
                    about: profile.about,
                    aboutShort: profile.aboutShort
                });

                if (!this.state.avatarUrl) {
                    this.setState({
                        avatarUrl: "https://via.placeholder.com/200x200"
                    });
                }

            });
    }


    handleChange(event) {

        const value = event.target.value;
        const name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    handleFileInputChange(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };

        reader.readAsDataURL(file);
    }




    activateModal() {

        this.setState({
            isOpen: true
        });
    }


    closeModal() {
        this.setState({
            isOpen: false,
            imagePreviewUrl: "",
            errors: {
                name: "",
                email: "",
                allFieldsError: "",
                link: ""
            }
        });
    }


    saveChanges() {

        event.preventDefault();

        const file = this.state.file;

        if (this.state.file == null) {

            let data = {
                about: this.state.about,
                aboutShort: this.state.aboutShort,
                avatarUrl: this.state.avatarUrl,
                email: this.state.email,
                name: this.state.name,
            };

            validationService.isEditFormValid(data,
                (data) => {
                    dataService.updateProfile(data,
                        (serverResponseData) => {
                            this.closeModal();
                            this.props.reloadProfile();
                        },
                        (serverErrorObject) => {
                            console.log(serverErrorObject);
                        });
                },
                (errors) => {
                    this.setState({
                        errors: errors
                    });
                });
            return;
        }

        let data = {
            about: this.state.about,
            aboutShort: this.state.aboutShort,
            email: this.state.email,
            name: this.state.name,
        };

        validationService.isEditFormValid(data,
            (data) => {

                dataService.uploadImage(file,
                    (serverResponseData) => {

                        data.avatarUrl = serverResponseData.data;
                        const onlyForPreview = serverResponseData.data;

                        dataService.updateProfile(data,
                            (serverResponseData) => {
                                this.setState({
                                    avatarUrl: onlyForPreview
                                });
                                this.closeModal();
                                this.props.reloadProfile();
                            },
                            (serverErrorObject) => {
                                console.log(serverErrorObject);
                            });
                    });
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

                <button type="button" className="editProfile" onClick={this.activateModal}>
                    <img src="https://image.flaticon.com/icons/png/128/149/149307.png" width="50px" />
                </button>

                <Modal className="Modal__Bootstrap edit-profile-modal modal-dialog" isOpen={this.state.isOpen}>

                    <div className="modal-content">

                        <div className="modal-header" id="modal-header">
                            <h4 className="modal-title">Edit Profile</h4>
                        </div>

                        <div className="modal-body">

                            Name: <input className="col-12" type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                            <div className="nameError text-danger">{this.state.errors.name}</div>
                            Email: <input className="col-12" type="email" name="email" onChange={this.handleChange} value={this.state.email} /><br />
                            <div className="emailError text-danger">{this.state.errors.email}</div>
                            Short about: <textarea rows="2" cols="40" className="col-12" type="text" name="aboutShort" onChange={this.handleChange} value={this.state.aboutShort} /><br />
                            About: <textarea rows="4" cols="40" className="col-12" type="text" name="about" onChange={this.handleChange} value={this.state.about} /><br />

                            <input className="col-12 uploadProfileImage" type="file" name="uploadImage" onChange={this.handleFileInputChange} value={this.state.uploadImage} />

                            <div className="profileImagePreviewContainer">
                                <img className="profileImagePreview" src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : this.state.avatarUrl} />
                            </div>

                            <div className="fieldsError text-danger">{this.state.errors.allFieldsError}</div>

                        </div>

                        <div className="modal-footer" id="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
                        </div>

                    </div>
                </Modal>

            </div >
        );

    };
}

EditProfile.propTypes = {
    reloadProfile: PropTypes.func,
};

export default EditProfile;