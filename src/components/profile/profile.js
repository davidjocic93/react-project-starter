import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            avatarUrl: "",
            postsCount: "",
            commentsCount: "",
            about: "",
            aboutShort: ""
        };

        this.bindEventHandlers();
    }

    componentDidMount() {
        dataService.getProfile((profile) => {

            this.setState({
                name: profile.name,
                avatarUrl: profile.avatarUrl,
                postsCount: profile.postsCount,
                commentsCount: profile.commentsCount,
                about: profile.about,
                aboutShort: profile.aboutShort
            });

            if (!this.state.avatarUrl) {
                this.setState ({
                    avatarUrl: "https://via.placeholder.com/200x200"
                });
            }
        });
    }

    bindEventHandlers() {

    }

    render() {
        return (
            <div className="container profile">
                <div className="row">
                    <div className="col-12">
                        <div className="avatarContainer">
                            <img className="avatarPicture" src={this.state.avatarUrl} />
                        </div>
                    </div>
                    <div className="col-12">
                        <h1>{this.state.name}</h1>
                    </div>
                    <div className="col-12">
                        <p>Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip. Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean earthnut pea sierra leone bologi leek soko chicory celtuce parsley jícama salsify.</p>
                    </div>
                    <div className="col-12">
                        <p className="count">Post count: <span>{this.state.postsCount}</span></p>
                        <p className="count">Comment count: <span>{this.state.commentsCount}</span></p>
                    </div>
                </div>
                <input className="btn btn-outline-secondary editProfile" type="button" onClick value="Edit profile" />
            </div>
        );
    }
};

export default Profile;