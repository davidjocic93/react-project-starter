import React from "react";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";
import TextPostComponent from "../newsFeed/textPostComponent";
import ImagePostComponent from "../newsFeed/imagePostComponent";
import VideoPostComponent from "../newsFeed/videoPostComponent";
import CommentsComponent from "./commentsComponent";
import { validationService } from "../../service/validationService";
import FullScreenImageComponent from "../newsFeed/imageComponent";


class SinglePostPage extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            postData: null,
            comments: [],
            comment: "",
            ownId: "",
            commentRequiredError: "",
            fullScreenVisibility: "hidden",
            imageUrl: ""
        };

        this.bindEventHandlers();
    }

    bindEventHandlers() {

        this.postComment = this.postComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadData = this.loadData.bind(this);
        this.imageToFullScreen = this.imageToFullScreen.bind(this);
        this.closeFullScreen = this.closeFullScreen.bind(this);
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


    handleChange(event) {

        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }


    postComment() {

        const comment = this.state.comment;
        const postId = this.props.match.params.postId;


        validationService.isCommentValid(comment,
            (comment) => {
                dataService.newComment(comment, postId,
                    (serverResponseData) => {
                        this.setState({
                            comment: ""
                        });
                        this.loadData();
                    });
            }, (error) => {

                this.setState({
                    commentRequiredError: error
                });
            });


    }


    loadData() {

        const postId = this.props.match.params.postId;

        dataService.getComments(postId,
            (comments) => {

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
                            <p className="commentRequiredError text-danger">{this.state.commentRequiredError}</p>
                        </div>

                        <div className="col-1 sendComment">
                            <button type="button" onClick={this.postComment}>
                                <img src="https://image.flaticon.com/icons/png/512/60/60525.png" />
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

                <div>

                    <div className="container feedContainer">

                        <div className="row">
                            <div className="col-md-10 offset-md-1 col-12">
                                <ImagePostComponent imageToFullScreen={this.imageToFullScreen} ownId={this.state.ownId} post={post} />
                            </div>
                        </div>

                        <div className="row">

                            <div className="col-md-9 offset-md-1">
                                <input className="commentInput" type="text" placeholder="Add your comment" name="comment" onChange={this.handleChange} value={this.state.comment} />
                                <p className="commentRequiredError text-danger">{this.state.commentRequiredError}</p>
                            </div>

                            <div className="col-1 sendComment">
                                <button type="button" onClick={this.postComment}>
                                    <img src="https://image.flaticon.com/icons/png/512/60/60525.png" />
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
                    <div style={{ visibility: this.state.fullScreenVisibility }} onClick={this.closeFullScreen}>
                        <FullScreenImageComponent imageUrl={this.state.imageUrl} />
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
                        <p className="commentRequiredError text-danger">{this.state.commentRequiredError}</p>
                    </div>

                    <div className="col-1 sendComment">
                        <button type="button" onClick={this.postComment}>
                            <img src="https://image.flaticon.com/icons/png/512/60/60525.png" />
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

