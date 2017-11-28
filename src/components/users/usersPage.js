import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import UsersComponent from "./usersComponent";
import { Link } from "react-router-dom";
import Search from "../common/search";

class UsersPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            allUsers: []
        };

        this.filterPeople = this.filterPeople.bind(this);
    }

    componentDidMount() {
        dataService.getPeople((users) => {
            this.setState({
                allUsers: users,
                users: users
            });
        });
    }


    filterPeople(searchString) {
        const currentUsers = this.state.allUsers;

        if (searchString === "") {
            this.setState({
                users: currentUsers
            });
        }

        const filteredUsers = currentUsers.filter((item) => {
            return item.name.toLowerCase().includes(searchString.toLowerCase());
        });

        this.setState({
            users: filteredUsers
        });

    }

    render() {

        const users = this.state.users;

        return (
            <div className="container">
                <div className="row userList">
                    <div className="col-12 col-md-10 offset-md-1 search">
                        <Search searchPeople={this.filterPeople} />
                    </div>
                    <div className="col-md-10 offset-md-1 col-12">
                        {users.map((user) => {
                            return <Link to={`/people/${user.id}`} key={user.id}> <UsersComponent user={user} key={user.id} /> </Link>;
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersPage;