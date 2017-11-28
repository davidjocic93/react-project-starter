import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { validationService } from "../../service/validationService";
import { redirectionService } from "../../service/redirectionService";
import PropTypes from "prop-types";

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


    activateModal() {

        this.setState({
            isOpen: true
        });
    }


    closeModal() {
        this.setState({
            isOpen: false
        });
    }


    saveChanges() {

        event.preventDefault();

        let data = {
            about: this.state.about,
            aboutShort: this.state.aboutShort,
            avatarUrl: this.state.avatarUrl,
            email: this.state.email,
            name: this.state.name
        };

        validationService.isEditFormValid(data,
            (data) => {
                this.makeRequest(data);
            },
            (errors) => {
                this.setState({
                    errors: errors
                });
            });
    }


    makeRequest(data) {

        dataService.updateProfile(data,
            (serverResponseData) => {
                this.closeModal();
                this.props.reloadProfile();
            },
            (serverErrorObject) => {
                console.log(serverErrorObject);
            });
    }


    render() {

        return (

            <div>

                <button type="button" className="editProfile" onClick={this.activateModal}>
                    <img src="https://image.flaticon.com/icons/png/128/149/149307.png" width="50px" />
                </button>

                <Modal className="Modal__Bootstrap modal-dialog" isOpen={this.state.isOpen}>

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Edit Profile</h4>
                        </div>

                        <div className="modal-body">

                            Name: <input className="col-12" type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                            <div className="nameError text-danger">{this.state.errors.name}</div>

                            Email: <input className="col-12" type="email" name="email" onChange={this.handleChange} value={this.state.email} /><br />
                            <div className="emailError text-danger">{this.state.errors.email}</div>

                            Short about: <textarea rows="2" cols="40" className="col-12" type="text" name="aboutShort" onChange={this.handleChange} value={this.state.aboutShort} /><br />

                            About: <textarea rows="4" cols="40" className="col-12" type="text" name="about" onChange={this.handleChange} value={this.state.about} /><br />

                            AvatarURL: <textarea rows="2" cols="40" className="col-12" type="text" name="avatarUrl" onChange={this.handleChange} value={this.state.avatarUrl} /><br />
                            <div className="avatarError text-danger">{this.state.errors.link}</div>

                            <div className="fieldsError text-danger">{this.state.errors.allFieldsError}</div>

                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
                        </div>

                    </div>
                </Modal>;

            </div >
        );

    };
}

EditProfile.propTypes = {
    reloadProfile: PropTypes.function,
};

export default EditProfile;