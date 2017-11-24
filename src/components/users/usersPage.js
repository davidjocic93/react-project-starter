import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import UsersComponent from "./usersComponent";
import {Link} from "react-router-dom";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        dataService.getPeople((users) => {
            this.setState({
                users: users
            });
        });

        // console.log(this.state.users);

    }



    render() {

        const users = this.state.users;

        return (
            <div>
                {users.map((user) => {
                    return <Link to={`/people/${user.id}`} key={user.id}> <UsersComponent user={user} key={user.id} /> </Link>;
                })}
            </div>
        );
    }
}

export default UsersPage;