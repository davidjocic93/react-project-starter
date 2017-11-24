import React from "react";
import Modal from "react-modal";
import { dataService } from "../../service/dataService";
import { redirectionService } from "../../service/redirectionService";



class EditProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            about: "",
            aboutShort: "",
            avatarUrl: "",
            email: "",
            name: ""
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
        dataService.getProfile((profile) => {

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
        console.log(data);
        if (data.about == "" || data.aboutShort == "" || data.email == "" || data.name == "" || data.avatarUrl == "") {
            $(".fieldsError").text("Please fill all fields");
            $(".nameError").text("");
            $(".emailError").text("");
            $(".shortError").text("");
            $(".aboutError").text("");
            $(".avatarError").text("");
        } else if (!data.email.includes("@") || !data.email.includes(".com")) {
            $(".emailError").text("Please provide proper email!");
            $(".fieldsError").text("");
        } else if (!data.avatarUrl.includes("https://")) {
            $(".avatarError").text("Please provide proper link for avatar!");
            $(".fieldsError").text("");            
        } else {
            dataService.updateProfile(data, (serverErrorObject) => {
                this.closeModal();
                alert("Something went wrong!");
            });
            this.closeModal();
        }
    }

    render() {
        return (
            <div>
                <button type="button" className="editProfile" onClick={this.activateModal}>
                <img src="https://image.flaticon.com/icons/png/128/149/149307.png" width="50px"/>
                </button>

                <Modal
                    className="Modal__Bootstrap modal-dialog"
                    // closeTimeoutMS={150}
                    isOpen={this.state.isOpen}
                // onRequestClose={this.handleModalCloseRequest}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Profile</h4>
                        </div>
                        <div className="modal-body">
                            Name: <input className="col-12" type="text" name="name" onChange={this.handleChange} value={this.state.name} /><br />
                            <div className="nameError text-danger"></div>
                            Email: <input className="col-12" type="email" name="email" onChange={this.handleChange} value={this.state.email} /><br />
                            <div className="emailError text-danger"></div>
                            Short about: <textarea rows="2" cols="40" className="col-12" type="text" name="aboutShort" onChange={this.handleChange} value={this.state.aboutShort} /><br />
                            <div className="shortError text-danger"></div>
                            About: <textarea rows="4" cols="40" className="col-12" type="text" name="about" onChange={this.handleChange} value={this.state.about} /><br />
                            <div className="aboutError text-danger"></div>
                            AvatarURL: <textarea rows="2" cols="40" className="col-12" type="text" name="avatarUrl" onChange={this.handleChange} value={this.state.avatarUrl} /><br />
                            <div className="avatarError text-danger"></div>
                            <div className="fieldsError text-danger"></div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={this.saveChanges}>Save changes</button>
                        </div>
                    </div>
                </Modal>
            </div >
        );

    };
}


export default EditProfile;