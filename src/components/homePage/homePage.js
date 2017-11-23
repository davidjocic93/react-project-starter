import React from "react";
import Header from "../common/header";
import {authenticationService} from "../../service/authenticationService";
import {dataService} from "../../service/dataService";
import {Route, Switch} from "react-router-dom";
import Profile from "../profile/profile";
import UsersPage from "../users/usersPage";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header />
                <Switch>
                    {/* <Route exact path="/" component={NewsFeed}/> */}
                    <Route path="/profile" component={Profile}/>
                    <Route path="/people" component={UsersPage}/>
                    {/* <Route path="/people/:id" component={SingleUser}/> */}
                </Switch>
            </div>
        );
    }
};

export default HomePage;