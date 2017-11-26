import React from "react";
import { dataService } from "../../service/dataService";
import PropTypes from "prop-types";


class SinglePost extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            singlePost: {}
        };

        this.bindEventHandlers();
    }

    componentDidMount() {
        dataService.getSinglePost(`${this.props.match.params.type}/${this.props.match.params.singleId}`,
            (post) => {
                console.log(post.data);
                this.setState({
                    singlePost: post.data
                });
            });
    }

    bindEventHandlers() {

    }

    render() {

        console.log(this.props.match.params.type);
        console.log(this.props.match.params.singleId);
        return (
            <div className="container profile">
                <p>{this.state.singlePost.text}</p>
                <p>{this.state.singlePost.type}</p>
            </div>
        );
    }
};

export default SinglePost;

SinglePost.propTypes = {
    match: PropTypes.object,
};