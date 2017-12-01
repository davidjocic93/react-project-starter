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


class NewsFeedPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            posts: [],
            allPosts: [],
            ownId: null,
            numberOfPosts: 0,
            activePage: 1,
            newTop: 5,
            hasMore: true,
            visibility: "hidden"
        };


        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.showHideBackToTopButton = this.showHideBackToTopButton.bind(this);
        this.getPostsForInfiniteScroll = this.getPostsForInfiniteScroll.bind(this);
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

    loadData() {

        dataService.getPostsForInfiniteScroll(5,
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
                        <a className="backToTopButton" href="#" style={{ visibility: this.state.visibility }}>
                            <img src="http://www.eightrock.com/images/back.png" />
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


            </div>
        );
    }
}

export default NewsFeedPage;