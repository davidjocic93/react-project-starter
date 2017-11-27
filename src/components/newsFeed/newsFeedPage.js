import React from "react";
import { dataService } from "../../service/dataService";
import PostComponent from "./postComponent";

class NewsFeedPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        dataService.getPosts((posts) => {
            console.table(posts);
            this.setState({
                posts: posts
            });
        });   
    }

    render() {

        const posts = this.state.posts;

        return(
            <div className="container">
                {posts.map(post => {
                    return <PostComponent post = {post} key={post.id} />;
                })}
            </div>
        );
    }
}

export default NewsFeedPage;