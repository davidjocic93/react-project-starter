import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import { Link } from "react-router-dom";
import PostsComponent from "./postsComponent";
import NewPost from "./newPostComponent";

class NewsFeed extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // dateCreated: "",
            // id: "",
            // text: "",
            // type: "",
            // userDisplayName: "",
            // userId: ""
            posts: []
        };

        this.bindEventHandlers();
    }

    // componentDidMount() {
    //     dataService.getPosts((posts) => {
    //         console.table(posts);
    //         this.setState ({
    //             dateCreated: posts.dateCreated,
    //             id: posts.id,
    //             text: posts.text,
    //             type: posts.type,
    //             userDisplayName: posts.userDisplayName,
    //             userId: posts.userId
    //         });
    //     });
    // }

    componentDidMount() {
        dataService.getPosts((posts) => {
            console.table(posts);
            this.setState({
                posts: posts
            });
        });
    }

    bindEventHandlers() {

    }

    // render() {
    //     return (

    //     );
    // }

    render() {

        const posts = this.state.posts;

        console.log(this.state.posts);
        return (
            <div>
                {posts.map((post) => {
                    return <Link to={`/${post.id}`} key={post.id}> <PostsComponent post={post} key={post.id} /> </Link>;
                })}
                <NewPost />
            </div>
        );
    }
};

export default NewsFeed;