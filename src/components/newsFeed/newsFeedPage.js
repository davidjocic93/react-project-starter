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
            allPosts: [],
            ownId: null
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    loadData() {

        dataService.getPosts(
            (posts) => {
                this.setState({
                    posts: posts,
                    allPosts: posts
                });
            });

        dataService.getProfile(
            (profile) => {
                this.setState({
                    ownId: profile.userId
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

        const filteredPosts = currentPosts.filter(
            (item) => {
                return item.type.includes(searchString);
            });

        this.setState({
            posts: filteredPosts
        });
    }

    deletePost(id) {

        dataService.deletePost(id,
            (serverResponseData) => {
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

                                return (
                                    <TextPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id}/>
                                );

                            } else if (post.type == "image") {

                                return (
                                    <ImagePostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                );

                            } else if (post.type == "video") {

                                return (
                                    <VideoPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                );
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