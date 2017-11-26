import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import { Link } from "react-router-dom";
import PostsComponent from "./postsComponent";
import NewPost from "./newPostComponent";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.bindEventHandlers();
    }


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



    render() {

        const posts = this.state.posts;

        console.log(this.state.posts);
        return (
            <div>
                {posts.map((post) => {
                    return <PostsComponent post={post} key={post.id} />;
                })}
                <NewPost />
            </div>
        );
    }
};

export default NewsFeedPage;