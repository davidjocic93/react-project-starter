import React from "react";
import { POSTS_PER_PAGE } from "../../constants";
import { dataService } from "../../service/dataService";
import TextPostComponent from "./textPostComponent";
import ImagePostComponent from "./imagePostComponent";
import VideoPostComponent from "./videoPostComponent";
import NewPostComponent from "./newPostComponent";
import Filter from "../common/postsFilter";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";


class NewsFeedPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            posts: [],
            allPosts: [],
            ownId: null,
            numberOfPosts: 0,
            activePage: 1
        };


        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {

        let top = 5;
        let skip = ((pageNumber - 1) * POSTS_PER_PAGE);

        dataService.getPostsForPagination(top, skip,
            (posts) => {
                this.setState({
                    posts: posts,
                    allPosts: posts,
                    activePage: pageNumber
                });
            });


    }

    loadData() {

        dataService.getPostsForPagination(5, 0,
            (posts) => {
                this.setState({
                    posts: posts,
                    allPosts: posts,
                });
            });

        dataService.getProfile(
            (profile) => {
                this.setState({
                    ownId: profile.userId
                });
            });

        dataService.getPostsCount(
            (numberOfPosts) => {
                this.setState({
                    numberOfPosts: numberOfPosts.data
                });
            }
        );



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
                                    <TextPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
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

                        <div className="paginationContainer col-8 offset-2">
                            <Pagination
                                className="pagination"
                                LinkClass="link"
                                itemClass="listItem"
                                activeLinkClass="activePageLink"
                                activePage={this.state.activePage}
                                itemsCountPerPage={POSTS_PER_PAGE}
                                totalItemsCount={this.state.numberOfPosts}
                                onChange={this.handlePageChange}
                            />
                        </div>
                    </div>
                </div>
                <NewPostComponent reloadFeed={this.loadData} />


            </div>
        );
    }
}

export default NewsFeedPage;