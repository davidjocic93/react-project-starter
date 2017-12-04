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
import InfiniteScroll from "react-infinite-scroll-component";
import FullScreenImageComponent from "./imageComponent";


class NewsFeedPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            posts: [],
            ownId: null,
            numberOfPosts: 0,
            activePage: 1,
            newTop: 5,
            hasMore: true,
            visibility: "hidden",
            fullScreenVisibility: "hidden",
            imageUrl: "",
            type: "",
            divHeight: ""
        };


        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.showHideBackToTopButton = this.showHideBackToTopButton.bind(this);
        this.getPostsForInfiniteScroll = this.getPostsForInfiniteScroll.bind(this);
        this.imageToFullScreen = this.imageToFullScreen.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
        // this.handlePageChange = this.handlePageChange.bind(this);
    }

    // handlePageChange(pageNumber) {

    //     let top = 5;
    //     let skip = ((pageNumber - 1) * POSTS_PER_PAGE);

    //     dataService.getPostsForPagination(top, skip,
    //         (posts) => {
    //             this.setState({
    //                 posts: posts,
    //                 allPosts: posts,
    //                 activePage: pageNumber
    //             });
    //         });
    // }

    getPostsForInfiniteScroll() {

        dataService.getPostsForInfiniteScroll(this.state.newTop + 5,
            (posts) => {
                this.setState({
                    posts: posts,
                    allPosts: posts,
                    newTop: this.state.newTop + 5
                });

                if (this.state.posts.length == this.state.numberOfPosts) {
                    this.setState({
                        hasMore: false
                    });
                }

            });
    }

    imageToFullScreen(imageUrl) {
        this.setState({
            fullScreenVisibility: "",
            imageUrl: imageUrl
        });
    }

    closeFullScreen() {
        this.setState({
            fullScreenVisibility: "hidden"
        });
    }

    loadData() {

        dataService.getPostsForInfiniteScroll(5,
            (posts) => {
                this.setState({
                    posts: posts,
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

        this.setState({
            type: searchString
        });


        // this.state.posts.forEach((post) => {
        //     console.log(post.type);
        //     if (post.type !== this.state.type && this.state.posts.length < this.state.numberOfPosts) {
        //         console.log("razlicito");
        //         this.loadData(this.state.numberOfPosts);
        //         this.setState({
        //             hasMore: false
        //         });
        //     }
        // });

        if (searchString) {
            dataService.getPosts(
                (posts) => {
                    this.setState({
                        posts: posts,
                        hasMore: false
                    });
                }
            );
        } else {
            dataService.getPostsForInfiniteScroll(5,
                (posts) => {
                    this.setState({
                        posts: posts,
                        hasMore: true
                    });
                });
        }
    }

    deletePost(id) {

        dataService.deletePost(id,
            (serverResponseData) => {
                this.loadData(5);
            });
    }

    showHideBackToTopButton() {


        this.setState({
            visibility: "hidden"
        });


        if (window.scrollY > 100) {
            this.setState({
                visibility: ""
            });
        }
    }

    render() {

        const posts = this.state.posts;

        return (

            <div className="container">

                <Filter filterPosts={this.filtering} />

                <div className="row">

                    <div className="col-12 col-md-8 offset-md-2 feedContainer">

                        {posts.map(post => {

                            if (this.state.type !== "") {


                                if (post.type == "text" && this.state.type == "text") {

                                    return (
                                        <TextPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );

                                } else if (post.type == "image" && this.state.type == "image") {

                                    return (
                                        <ImagePostComponent imageToFullScreen={this.imageToFullScreen} reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );

                                } else if (post.type == "video" && this.state.type == "video") {

                                    return (
                                        <VideoPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );
                                }
                            } else {
                                if (post.type == "text") {

                                    return (
                                        <TextPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );

                                } else if (post.type == "image") {

                                    return (
                                        <ImagePostComponent imageToFullScreen={this.imageToFullScreen} reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );

                                } else if (post.type == "video") {

                                    return (
                                        <VideoPostComponent reloadFeed={this.loadData} ownId={this.state.ownId} post={post} key={post.id} />
                                    );
                                }
                            }

                        })}
                        <a className="backToTopButton" href="#" style={{ visibility: this.state.visibility }}>
                            <img src="http://serenasu.htpwebdesign.ca/images/back-to-top-button.png" />
                        </a>

                        <div className="paginationContainer col-8 offset-2">
                            {/* <Pagination
                                className="pagination"
                                LinkClass="link"
                                itemClass="listItem"
                                activeLinkClass="activePageLink"
                                activePage={this.state.activePage}
                                itemsCountPerPage={POSTS_PER_PAGE}
                                totalItemsCount={this.state.numberOfPosts}
                                onChange={this.handlePageChange}
                            /> */}

                            <InfiniteScroll
                                refreshFunction={this.refresh}
                                next={this.getPostsForInfiniteScroll}
                                onScroll={this.showHideBackToTopButton}
                                hasMore={this.state.hasMore}
                                loader={<h4>Loading...</h4>}
                                endMessage={
                                    <p style={{ textAlign: "center" }}>
                                        <b>Yay! You have seen it all</b>
                                    </p>
                                }>
                                {/* {items} */}
                            </InfiniteScroll>

                        </div>
                    </div>
                </div>
                <NewPostComponent reloadFeed={this.loadData} />
                <div style={{ visibility: this.state.fullScreenVisibility }} onClick={this.closeFullScreen}>
                    <FullScreenImageComponent imageUrl={this.state.imageUrl} />
                </div>


            </div>
        );
    }
}

export default NewsFeedPage;