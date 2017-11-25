import React from "react";
import Header from "../common/header";
import {authenticationService} from "../../service/authenticationService";
import {dataService} from "../../service/dataService";
import {Route, Switch} from "react-router-dom";
import Profile from "../profile/profile";
import UsersPage from "../users/usersPage";
import SingleUserComponent from "../users/singleUserComponent";
import NewsFeed from "../newsFeed/newsFeedPage";
// import SinglePost from "../singlePosts/singlePostPage";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={NewsFeed}/>
                    {/* <Route exact path="/:id" component={SinglePost}/> */}
                    <Route path="/profile" component={Profile}/>
                    <Route exact path="/people" component={UsersPage}/>
                    <Route path="/people/:id" component={SingleUserComponent}/>
                </Switch>
            </div>
        );
    }
};

export default HomePage;