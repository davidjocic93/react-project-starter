import React from "react";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import TextPostComponent from "../newsFeed/textPostComponent";
import ImagePostComponent from "../newsFeed/imagePostComponent";
import VideoPostComponent from "../newsFeed/videoPostComponent";
import CommentsComponent from "./commentsComponent";


class SinglePostPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            postData: null,
            comments: [],
            comment: "",
            ownId: ""
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadData = this.loadData.bind(this);
    }


    handleChange(event) {

        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }


    postComment() {

        const comment = this.state.comment;
        const postId = this.props.match.params.postId;

        dataService.newComment(comment, postId,
            (serverResponseData) => {
                this.loadData();
            });

    }


    loadData() {

        const postId = this.props.match.params.postId;

        dataService.getComments(postId,
            (comments) => {

                console.log(comments);

                this.setState({
                    comments: comments
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

        const postId = this.props.match.params.postId;
        const postType = this.props.match.params.type;

        dataService.getSinglePost(postType, postId,
            (singlePost) => {
                this.setState({
                    postData: singlePost.data
                });
            });

        this.loadData();
    }

    render() {

        if (this.state.postData == null) {
            return <p>Loading</p>;
        }

        const post = this.state.postData;
        const comments = this.state.comments;


        if (post.type == "text") {

            return (

                <div className="container feedContainer">

                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-12">
                            <TextPostComponent ownId={this.state.ownId} post={post} />
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-9 offset-md-1">
                            <input className="commentInput" type="text" placeholder="Add your comment" name="comment" onChange={this.handleChange} value={this.state.comment} />
                        </div>

                        <div className="col-1 sendComment">
                            <button onClick={this.postComment}>
                                <img src="https://cdn.pixabay.com/photo/2016/04/07/18/57/arrow-1314461_960_720.png" />
                            </button>
                        </div>

                    </div>

                    <div className="row commentContainer">

                        <div className="col-8 offset-2">

                            {comments.map((comment) => {
                                return <CommentsComponent comment={comment} key={comment.id} />;
                            })}


                        </div>
                    </div>

                </div>
            );

        } else if (post.type == "image") {

            return (

                <div className="container feedContainer">

                    <div className="row">
                        <div className="col-md-10 offset-md-1 col-12">
                            <ImagePostComponent ownId={this.state.ownId} post={post} />;
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-9 offset-md-1">
                            <input className="commentInput" type="text" placeholder="Add your comment" name="comment" onChange={this.handleChange} value={this.state.comment} />
                        </div>

                        <div className="col-1 sendComment">
                            <button onClick={this.postComment}>
                                <img src="https://cdn.pixabay.com/photo/2016/04/07/18/57/arrow-1314461_960_720.png" />
                            </button>
                        </div>

                    </div>

                    <div className="row commentContainer">

                        <div className="col-8 offset-2">

                            {comments.map((comment) => {
                                return <CommentsComponent comment={comment} key={comment.id} />;
                            })}


                        </div>
                    </div>

                </div>
            );
        }

        return (

            <div className="container feedContainer">

                <div className="row">
                    <div className="col-md-10 offset-md-1 col-12">
                        <VideoPostComponent ownId={this.state.ownId} post={post} />
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-9 offset-md-1">
                        <input className="commentInput" type="text" placeholder="Add your comment" name="comment" onChange={this.handleChange} value={this.state.comment} />
                    </div>

                    <div className="col-1 sendComment">
                        <button onClick={this.postComment}>
                            <img src="https://cdn.pixabay.com/photo/2016/04/07/18/57/arrow-1314461_960_720.png" />
                        </button>
                    </div>

                </div>

                <div className="row commentContainer">

                    <div className="col-8 offset-2">

                        {comments.map((comment) => {
                            return <CommentsComponent comment={comment} key={comment.id} />;
                        })}

                    </div>
                </div>

            </div>
        );
    }
}

SinglePostPage.propTypes = {
    match: PropTypes.object,
};

export default SinglePostPage;

