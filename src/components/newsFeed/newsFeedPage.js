import React from "react";
import { authenticationService } from "../../service/authenticationService";
import { dataService } from "../../service/dataService";
import { Link } from "react-router-dom";
import PostsComponent from "./postsComponent";
import NewPost from "./newPostComponent";
import Search from "../common/search";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            allPosts: []
        };

        this.bindEventHandlers();
    }


    componentDidMount() {
        dataService.getPosts((posts) => {
            console.table(posts);
            this.setState({
                posts: posts,
                allPosts: posts
            });
        });
    }

    filterPosts(searchString) {
        const currentPosts = this.state.allPosts;

        if (searchString === "") {
            this.setState({
                posts: currentPosts
            });
        }

        const filteredPosts = currentPosts.filter((post) => {
            return post.text.toLowerCase().includes(searchString.toLowerCase());
        });

        this.setState({
            posts: filteredPosts
        });

    }

    bindEventHandlers() {
        this.filterPosts = this.filterPosts.bind(this);
    }



    render() {

        const posts = this.state.posts;

        console.log(this.state.posts);
        return (
            <div>
                <div className="col-12 search">
                    <Search search={this.filterPosts} />
                </div>
                {posts.map((post) => {
                    return <PostsComponent post={post} key={post.id} />;
                })}
                <NewPost />
            </div>
        );
    }
};

export default NewsFeedPage;