import React from "react";
import { dataService } from "../../service/dataService";
import TextPostComponent from "./textPostComponent";
import ImagePostComponent from "./imagePostComponent";
import VideoPostComponent from "./videoPostComponent";
import NewPostComponent from "./newPostComponent";
import Filter from "../common/postsFilter";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            allPosts: []
        };

        this.loadData = this.loadData.bind(this);
        this.filtering = this.filtering.bind(this);
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

    render() {

        const posts = this.state.posts;

        return (
            <div className="container">
                <Filter filterPosts={this.filtering} />
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        {posts.map(post => {
                            if (post.type == "text") {
                                return <TextPostComponent post={post} key={post.id} />;
                            } else if (post.type == "image") {
                                return <ImagePostComponent post={post} key={post.id} />;
                            } else if (post.type == "video") {
                                return <VideoPostComponent post={post} key={post.id} />;
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