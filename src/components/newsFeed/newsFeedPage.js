import React from "react";
import { dataService } from "../../service/dataService";
import TextPostComponent from "./textPostComponent";
import ImagePostComponent from "./imagePostComponent";
import VideoPostComponent from "./videoPostComponent";
import NewPostComponent from "./newPostComponent";
import Filter from "../common/postsFilter";
import { Link } from "react-router-dom";


class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            allPosts: []
        };

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    loadData() {
        dataService.getPosts((posts) => {
            console.log(posts);
            this.setState({
                posts: posts,
                allPosts: posts
            });
        });
    }

    componentDidMount() {
        this.loadData();
    }

    filtering(searchString) {
        const currentPosts = this.state.allPosts;

        if (searchString === "") {
            this.setState({
                posts: currentPosts
            });
        }

        const filteredPosts = currentPosts.filter((item) => {
            return item.type.includes(searchString);
        });

        this.setState({
            posts: filteredPosts
        });
    }

    deletePost(id) {
        dataService.deletePost(id, (serverResponseData) => {
            this.loadData();
        });
    }

    render() {

        const posts = this.state.posts;

        return (
            <div className="container">
                <Filter filterPosts={this.filtering} />
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2 feedContainer">
                        {posts.map(post => {
                            if (post.type == "text") {
                                return <Link to={`/feed/${post.type.slice(0, 1).toUpperCase()}${post.type.slice(1)}/${post.id}`} key={post.id}>
                                    <TextPostComponent deletePost={this.deletePost} post={post} />
                                </Link>;
                            } else if (post.type == "image") {
                                return <Link to={`/feed/${post.type.slice(0, 1).toUpperCase()}${post.type.slice(1)}/${post.id}`} key={post.id}>
                                    <ImagePostComponent post={post} key={post.id} />
                                </Link>;
                            } else if (post.type == "video") {
                                return <Link to={`/feed/${post.type.slice(0, 1).toUpperCase()}${post.type.slice(1)}/${post.id}`} key={post.id}>
                                    <VideoPostComponent post={post} key={post.id} />
                                </Link>;
                            }
                        })}
                    </div>
                </div>
                <NewPostComponent reloadFeed={this.loadData} />
            </div>
        );
    }
}

export default NewsFeedPage;