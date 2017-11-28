import React from "react";
import { dataService } from "../../service/dataService";
import PostComponent from "./postComponent";
import NewPostComponent from "./newPostComponent";

class NewsFeedPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };

        this.loadData = this.loadData.bind(this);
    }

    loadData() {
        dataService.getPosts((posts) => {
            console.table(posts);
            this.setState({
                posts: posts
            });
        });
    }

    componentDidMount() {
        this.loadData();
    }

    render() {

        const posts = this.state.posts;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 offset-md-2">
                        {posts.map(post => {
                            return <PostComponent post={post} key={post.id} />;
                        })}
                    </div>
                </div>
                <NewPostComponent reloadFeed={this.loadData} />
            </div>
        );
    }
}

export default NewsFeedPage;